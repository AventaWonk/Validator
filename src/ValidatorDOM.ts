import {IDataField} from './Types/Fields';
import {IUserRules} from './Types/Rules';
import IValidator from './Interfaces/IValidator';
import FormParser from './FormParser';

export default class ValidatorDOM {
  private validator: IValidator;
  private rules: IUserRules;

  constructor(validator: IValidator) {
    this.validator = validator;
    this.validateFormCallback = this.validateFormCallback.bind(this);
  }

  private validateFormCallback(e: Event): void {
    let formData: IDataField[] = FormParser.getData(e.target as HTMLFormElement);
    if (!this.validator.validate(formData, this.rules).isValid) {
      e.preventDefault();
    }
  }

  public setValidatorOnForm(form: HTMLFormElement, rules: IUserRules): void {
    this.rules = rules;
    form.addEventListener("submit", this.validateFormCallback);
  }

  public removeValidatorFromForm(form: HTMLFormElement): void {
    form.removeEventListener("submit", this.validateFormCallback);
  }
}
