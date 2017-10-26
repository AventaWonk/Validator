import {IDataField, IValidatedDataField} from './Types/Fields';
import {IUserRules, IUserRule, IFieldRule} from './Types/Rules';
import {lexSpace} from './Settings';
import IValidationService from './Interfaces/IValidationService'

export default class Validator {
  private validationService: IValidationService;
  private userRules: IUserRules;

  constructor(validationService: IValidationService, userRules: IUserRules) {
    this.validationService = validationService;
    this.userRules = userRules;
  }

  private getUserRule(fieldRule: IFieldRule): IUserRule {
    return this.userRules[fieldRule.name];
  }


  public validateOne(currentField: IDataField, allFields: IDataField[]): IValidatedDataField {
    if (!currentField.fieldRules) {
      return;
    }

    let unimplementedRules: any[] = [];
    try {
      for (let i = 0; i < currentField.fieldRules.length; i++) {
          let usedRule: IUserRule = this.getUserRule(currentField.fieldRules[i]);
          let ruleValidity: boolean = this.validationService.checkRuleValidity(usedRule, currentField, allFields);
          unimplementedRules.push(usedRule);
      }
    } catch (e) {
      console.error(e.message);
      throw new Error("Validation failed");
    }
  }

  public validateAll(data: IDataField[], rules: IUserRules): IValidatedDataField[] {
    let validatedData: IValidatedDataField[] = [];

    try {
      for (let i = 0; i < data.length; i++) {
        validatedData.push(
          this.validateOne(data[i], data)
        );
      }
    } catch (e) {
      console.error(e.message);
      throw new Error("Validation failed");
    }

    return validatedData;
  }

  public static getValidatorPrefixes(): string[] {
    let prefixes: string[] = [];

    for (let prefix in lexSpace) {
      prefixes.push(prefix);
    }

    return prefixes;
  }
}
