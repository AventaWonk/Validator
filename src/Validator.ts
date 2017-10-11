import {IDataField, IValidatedDataField, IValidatedField} from './Types/Fields';
import {IUserRules} from './Types/Rules';
import IValidationService from './Interfaces/IValidationService'

export default class Validator {
  private validationService: IValidationService;

  constructor(validationService: IValidationService) {
    this.validationService = validationService;
  }

  public validateOne(currentField: IDataField, data: IDataField[], rules: IUserRules): IValidatedDataField {
    try {
      return this.validationService.validateField(currentField, data, rules);
    } catch (e) {
      console.error(e.message);
      throw new Error("Validation failed");
    }
  }

  public validateAll(data: IDataField[], rules: IUserRules): IValidatedDataField[] {
    let validatedData: IValidatedDataField[] = [];

    try {
      for (let i = 0; i < data.length; i++) {
        if (!data[i].rules) {
          continue;
        }

        validatedData.push(
          this.validationService.validateField(data[i], data, rules)
        );
      }
    } catch (e) {
      console.error(e.message);
      throw new Error("Validation failed");
    }

    return validatedData;
  }
}
