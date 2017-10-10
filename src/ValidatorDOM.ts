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
    this.onFormChangeCallback = this.onFormChangeCallback.bind(this);
    this.onFormSubmitCallback = this.onFormSubmitCallback.bind(this);
  }

  private onFormChangeCallback(id: string, fieldData: IDataField, formData: IDataField[], e: Event): void {
    let currentForm: InvolvedForm = this.forms[id];

    try {
      let result = this.validator.validateOne(fieldData, formData, currentForm.rules);

      // if (result.isValid) {
      //   if (this.messageService) {
      //     this.messageService.deleteMessages(e.target as HTMLInputElement);
      //   }
      //   if (currentForm.callbacks && currentForm.callbacks.onFieldIsValid) {
      //     currentForm.callbacks.onFieldIsValid(e.target);
      //   }
      // } else {
      //   if (this.messageService) {
      //     this.messageService.deleteMessages(e.target as HTMLInputElement);
      //     this.messageService.showMessages(e.target as HTMLInputElement, result.messages);
      //   }
      //   if (currentForm.callbacks && currentForm.callbacks.onFieldIsNotValid) {
      //     currentForm.callbacks.onFieldIsNotValid(e.target);
      //   }
      // }
    } catch (e) {
      console.error(e.message);
    }
  }

  private onFormSubmitCallback(id: string, formData: IDataField[], e: Event): void {
    // let validationResult = new ValidationResult(this.validator.validateAll(formData, this.rules));
    // if (!validationResult.isValid) {
    //   e.preventDefault();
    // }
  }

  public setValidatorOnForm(form: HTMLFormElement, rules: IUserRules, callbacks?: IValidatorParams): void {
    form.dataset.id = ValidatorDOM.count.toString();
    let formParser = new FormParser(form, (fieldData: IDataField, formData: IDataField[], e: Event) => this.onFormChangeCallback(form.dataset.id, fieldData, formData, e));
    form.addEventListener("submit", (e: Event) => this.onFormSubmitCallback(form.dataset.id, formParser.getFormData(), e));

    this.forms[form.dataset.id] = {
      formLink: form,
      rules: rules,
      callbacks: callbacks,
    };
    ValidatorDOM.count++;
  }

  // public removeValidatorFromForm(form: HTMLFormElement): void {
  //   form.removeEventListener("submit", this.onFormSubmitCallback);
  //   delete this.forms[form.data.id];
  // }
}
