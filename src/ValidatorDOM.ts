import {IDataField, IValidatedDataField} from './Types/Fields';
import {IUserRules} from './Types/Rules';
import IValidationService from './Interfaces/IValidationService';
import IMessageService from './Interfaces/IMessageService';
import IValidatorParams from './Interfaces/IValidatorParams';
import Validator from './Validator';
import FormParser from './FormParser';
import VirtualForm from './VirtualForm';

interface InvolvedForm {
  formLink: HTMLFormElement,
  virtualForm: VirtualForm,
  userRules: IUserRules,
  callbacks: IValidatorParams,
}

export default class ValidatorDOM {
  private validator: Validator;
  private messageService: IMessageService;
  private forms: { [key: string]: InvolvedForm } = {};
  private static count: number = 0;
  private f: Function;

  constructor(validationService: IValidationService, MessageService?: IMessageService) {
    this.validator = new Validator(validationService);
    this.messageService = MessageService;
    this.onInputCallback = this.onInputCallback.bind(this);
    this.onSubmitCallback = this.onSubmitCallback.bind(this);
  }

  private onInputCallback(e: Event): void {
    if ((e.target as HTMLElement).tagName != "INPUT") {
      return;
    }

    let id = (e.currentTarget as HTMLFormElement).dataset.id;
    let currentForm: InvolvedForm = this.forms[id];
    let fieldData: IDataField = currentForm.virtualForm.getVirtualFieldData(e.target as HTMLInputElement);
    let formData: IDataField[] = currentForm.virtualForm.getVirtualFormData();

    if (!fieldData.fieldRules) {
      return;
    }

    try {
      let result: IValidatedDataField = this.validator.validateOne(fieldData, formData, currentForm.userRules);
      let previousValidity: boolean = currentForm.virtualForm.getVirtualFieldValidity(e.target as HTMLInputElement);

      if (result.isValid == previousValidity ) {
        return;
      }
      currentForm.virtualForm.updateVirtualFieldValidity(e.target as HTMLInputElement, result.isValid);
      if (this.messageService) {
        // this.messageService.updateMessages(e.target as HTMLInputElement, result.messages);

      }

      if (!currentForm.callbacks) {
        return;
      }
      if (result.isValid && currentForm.callbacks.onFieldIsValid) {
        currentForm.callbacks.onFieldIsValid(e.target, e.currentTarget);
      } else if (!result.isValid && currentForm.callbacks.onFieldIsNotValid) {
        currentForm.callbacks.onFieldIsNotValid(e.target, e.currentTarget);
      }
    } catch (e) {
      console.error(e.message);
    }
  }

  private onSubmitCallback(e: Event): void {
    let id = (e.currentTarget as HTMLFormElement).dataset.id;

    if (!this.forms[id].virtualForm.isValid) {
      e.preventDefault();
    }
  }

  public setValidatorOnForm(form: HTMLFormElement, userRules: IUserRules, callbacks?: IValidatorParams): void {
    form.dataset.id = ValidatorDOM.count.toString();

    this.forms[form.dataset.id] = {
      formLink: form,
      virtualForm: new VirtualForm(FormParser.getFormInputs(form)),
      userRules: userRules,
      callbacks: callbacks,
    };
    ValidatorDOM.count++;

    form.addEventListener("input", this.onInputCallback);
    form.addEventListener("submit", this.onSubmitCallback);
  }

  public removeValidatorFromForm(form: HTMLFormElement): void {
    form.removeEventListener("input", this.onInputCallback);
    form.removeEventListener("submit", this.onSubmitCallback);
    delete this.forms[form.data.id];
  }
}
