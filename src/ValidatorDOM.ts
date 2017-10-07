import {IDataField} from './Types/Fields';
import {IUserRules} from './Types/Rules';
import IValidationService from './Interfaces/IValidationService';
import IMessageService from './Interfaces/IMessageService';
import IValidatorParams from './Interfaces/IValidatorParams';
import ValidationResult from './ValidationResult';
import Validator from './Validator';
import FormParser from './FormParser';

interface InvolvedForm {
  formLink: HTMLFormElement,
  rules: IUserRules,
  callbacks: IValidatorParams,
}

export default class ValidatorDOM {
  private validator: Validator;
  private messageService: IMessageService;
  private forms: { [key: string]: InvolvedForm } = {};
  private static count: number = 0;

  constructor(validationService: IValidationService, MessageService?: IMessageService) {
    this.validator = new Validator(validationService);
    this.messageService = MessageService;
    this.validateFormCallback = this.validateFormCallback.bind(this);
    this.validateFieldCallback = this.validateFieldCallback.bind(this);
  }

  // private changeFormValidity(): void {
  //   if (this.validateFormCallback && this.isValid) {
  //     this.validateFormCallback();
  //   } else if (this.validateFormCallback && !this.isValid) {
  //     this.validateFormCallback();
  //   }
  // }

  private validateFormCallback(e: Event): void {
    let formData: IDataField[] = FormParser.getFormData(e.target as HTMLFormElement);

    // let validationResult = new ValidationResult(this.validator.validateAll(formData, this.rules));
    // if (!validationResult.isValid) {
    //   e.preventDefault();
    // }
  }

  private validateFieldCallback(e: Event, id: string): void {
    let currentForm: InvolvedForm = this.forms[id];
    let formData: IDataField[] = FormParser.getFormData(currentForm.formLink, e.target as HTMLInputElement);
    let result = this.validator.validateOne(formData, currentForm.rules);

    if (!this.messageService) {
      return;
    }

    if (result && !result.isValid) {
      this.messageService.deleteMessages(e.target as HTMLInputElement);
      this.messageService.showMessages(e.target as HTMLInputElement, result.messages);
      if (currentForm.callbacks && currentForm.callbacks.onFieldIsNotValid) {
        currentForm.callbacks.onFieldIsNotValid(e.target);
      }
    } else {
      this.messageService.deleteMessages(e.target as HTMLInputElement);
      if (currentForm.callbacks && currentForm.callbacks.onFieldIsValid) {
        currentForm.callbacks.onFieldIsValid(e.target);
      }
    }
  }

  public setValidatorOnForm(form: HTMLFormElement, rules: IUserRules, callbacks?: IValidatorParams): void {
    form.dataset.id = ValidatorDOM.count.toString();
    this.forms[form.dataset.id] = {
      formLink: form,
      rules: rules,
      callbacks: callbacks,
    };
    ValidatorDOM.count++;

    form.addEventListener("input", (e) => this.validateFieldCallback(e, form.dataset.id));
    form.addEventListener("submit", this.validateFormCallback);
  }

  public removeValidatorFromForm(form: HTMLFormElement): void {
    form.removeEventListener("submit", this.validateFormCallback);
    delete this.forms[form.data.id];
  }
}
