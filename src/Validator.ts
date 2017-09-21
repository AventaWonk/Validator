import {IDataField, IValidatedField} from './Types/Fields';
import {IUserRules} from './Types/Rules';
import IValidationService from './Interfaces/IValidationService'

export default class Validator {
  private validationService: IValidationService;

  constructor(validationService: IValidationService) {
    this.validationService = validationService;
  }

  private static getCurrentField(fieldsArray: IDataField[]): IDataField {
    for (let i = 0; i < fieldsArray.length; i++) {
      if (fieldsArray[i].isCurrent) {
        return fieldsArray[i];
      }
    }
  }

  public validateOne(data: IDataField[], rules: IUserRules): IValidatedField {
    return this.validationService.validateField(Validator.getCurrentField(data), data, rules);
  }

  public validateAll(data: IDataField[], rules: IUserRules): IValidatedField[] {
    let validatedData: IValidatedField[] = [];

    for (let i = 0; i < data.length; i++) {
      validatedData.push(
        this.validationService.validateField(Validator.getCurrentField(data), data, rules)
      );
    }

    return validatedData;
  }

}
