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
    this.validateFieldCallback = this.validateFieldCallback.bind(this);
  }

  private showMessages(input: HTMLInputElement, messages: string[]): void {
    for (let i = 0; i < messages.length; i++) {
      if (true) {
        let p: HTMLParagraphElement = document.createElement('p');
        // p.dataset.msgInfo = "1";
        let span: HTMLSpanElement = document.createElement('span');
        span.innerHTML = messages[i];
        p.appendChild(span);
        input.parentNode.appendChild(p);
      }
    }
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
    this.showMessages(e.target as HTMLInputElement, vResult.getAll()[0].messages);
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
