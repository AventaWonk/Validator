import {IDataField} from './Types/Fields';
import {IUserRules} from './Types/Rules';
import IValidator from './Interfaces/IValidator';
import IMessageService from './Interfaces/IMessageService';
import FormParser from './FormParser';

export default class ValidatorDOM {
  private validator: IValidator;
  private messageService: IMessageService;
  private rules: IUserRules;

  constructor(validator: IValidator, MessageService: IMessageService) {
    this.validator = validator;
    this.validateFormCallback = this.validateFormCallback.bind(this);
    this.validateFieldCallback = this.validateFieldCallback.bind(this);
    this.messageService = MessageService;
  }

  private validateFormCallback(e: Event): void {
    let formData: IDataField[] = FormParser.getData(e.target as HTMLFormElement);
    let vResult = this.validator.validate(formData, this.rules);

    if (!vResult.isValid) {
      e.preventDefault();
    }
  }

  private validateFieldCallback(e: Event): void {
    let fieldData: IDataField = FormParser.getFieldData(e.target as HTMLInputElement);
    // let formData: IDataField[] = FormParser.getData(e.target as HTMLFormElement);
    let vResult = this.validator.validateField(fieldData, {} as IDataField[], this.rules);

    if (vResult.getAll().length > 0 && vResult.getAll()[0].messages) {
      this.messageService.showMessages(e.target as HTMLInputElement, vResult.getAll()[0].messages);
    }
  }

  private setFieldValidation(form: HTMLFormElement) {
    form.addEventListener("keypress", this.validateFieldCallback);
  }

  public setValidatorOnForm(form: HTMLFormElement, rules: IUserRules): void {
    this.rules = rules;
    this.setFieldValidation(form);
    form.addEventListener("submit", this.validateFormCallback);
  }

  public removeValidatorFromForm(form: HTMLFormElement): void {
    form.removeEventListener("submit", this.validateFormCallback);
  }
}
