import {IDataField} from './Types/Fields';
import {IUserRules} from './Types/Rules';
import IValidator from './Interfaces/IValidator';
import FormParser from './FormParser';

export class ValidatorDOM {
  private validator: IValidator;

  constructor(validator: IValidator) {
    this.validator = validator;
  }

  private validateFormCallback(e: Event, rules?: IUserRules): boolean | undefined {
    let formData: IDataField[] = FormParser.getData(e.target as HTMLFormElement);
    if (!this.validator.validate(formData, rules).isValid) {
      return false;
    }
  }

  public setValidatorOnForm(form: HTMLFormElement, rules: IUserRules): void {
    form.addEventListener("submit", e => this.validateFormCallback(e, rules));
  }

  public removeValidatorFromForm(form: HTMLFormElement): void {
    form.removeEventListener("submit", this.validateFormCallback);
  }
}
