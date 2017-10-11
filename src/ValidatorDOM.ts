import {IDataField, IValidatedDataField} from './Types/Fields';
import {IUserRules} from './Types/Rules';
import IValidationService from './Interfaces/IValidationService';
import IMessageService from './Interfaces/IMessageService';
import IValidatorParams from './Interfaces/IValidatorParams';
import ValidationResult from './ValidationResult';
import Validator from './Validator';
import FormParser from './FormParser';

interface InvolvedForm {
  formLink: HTMLFormElement,
  formParserLink: FormParser,
  rules: IUserRules,
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
    let formParser: FormParser = currentForm.formParserLink;

    formParser.updateFormData(e.target as HTMLInputElement);
    let fieldData: IDataField = formParser.getLastUpdatedFieldData()
    let formData: IDataField[] = formParser.getFormData();

    if (!fieldData.rules) {
      return;
    }

    try {
      let result: IValidatedDataField = this.validator.validateOne(fieldData, formData, currentForm.rules);

      if (this.messageService) {
        this.messageService.updateMessages(e.target as HTMLInputElement, result.messages)
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
    let currentForm: InvolvedForm = this.forms[id];
    let formParser: FormParser = currentForm.formParserLink;

    try {
      let results: IValidatedDataField[] = this.validator.validateAll(formParser.getFormData(), currentForm.rules);
      let formIsValid: boolean = true;

      for (let i = 0; i < results.length; i++) {
        // this.messageService.updateMessages(results[i].input, results[i].messages);

        if (!results[i].isValid) {
          formIsValid = false;
        }
      }

      if (formIsValid) {
        if (currentForm.callbacks && currentForm.callbacks.onFormIsValid) {
          currentForm.callbacks.onFormIsValid();
        }
      } else {
        if (currentForm.callbacks && currentForm.callbacks.onFormIsNotValid) {
          currentForm.callbacks.onFormIsNotValid();
        }

        e.preventDefault();
      }
    } catch (e2) {
      e.preventDefault();
      console.error(e2.message);
    }
  }

  public setValidatorOnForm(form: HTMLFormElement, rules: IUserRules, callbacks?: IValidatorParams): void {
    form.dataset.id = ValidatorDOM.count.toString();

    this.forms[form.dataset.id] = {
      formLink: form,
      formParserLink: new FormParser(form),
      rules: rules,
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
