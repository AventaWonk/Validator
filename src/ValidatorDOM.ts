import {IDataField} from './Types/Fields';
import {IUserRules} from './Types/Rules';
import IValidationService from './Interfaces/IValidationService';
import IMessageService from './Interfaces/IMessageService';
import Validator from './Validator';
import FormParser from './FormParser';

export default class ValidatorDOM {
  private validator: Validator;
  private messageService: IMessageService;
  private form: HTMLFormElement;
  private rules: IUserRules;

  constructor(validationService: IValidationService, MessageService: IMessageService) {
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

    // let vResult = this.validator.validateAll(formData, this.rules);
    // if (!vResult.isValid) {
    //   e.preventDefault();
    // }
  }

  private validateFieldCallback(e: Event): void {
    let formData: IDataField[] = FormParser.getFormData(this.form, e.target as HTMLInputElement);

    let result = this.validator.validateOne(formData, this.rules);
    if (result && !result.isValid) {
      this.messageService.deleteMessages(e.target as HTMLInputElement);
      this.messageService.showMessages(e.target as HTMLInputElement, result.messages);
    } else {
      this.messageService.deleteMessages(e.target as HTMLInputElement);
    }
  }

  private setFieldValidation(form: HTMLFormElement) {
    form.addEventListener("input", this.validateFieldCallback);
  }

  public setValidatorOnForm(form: HTMLFormElement, rules: IUserRules, onFormIsValid?: Function, onFormIsNotValid?: Function): void {
    this.form = form;
    this.rules = rules;
    this.setFieldValidation(form);
    form.addEventListener("submit", this.validateFormCallback);
  }

  public removeValidatorFromForm(form: HTMLFormElement): void {
    form.removeEventListener("submit", this.validateFormCallback);
  }
}
