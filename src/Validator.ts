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

  private getGeneralRule(fieldRule: IFieldRule): IUserRule {
    // let userRule: IUserRule = {};
    // let normalizedRuleName = ruleName.charAt(0).toLowerCase() + ruleName.slice(1);
    // userRule[normalizedRuleName] = {
    //   currentField: currentField,
    //   value: normalizedRules[ruleName].value,
    // };
    // return userRule;

    let emulatedUserRule: IUserRule = {};
    let conditionName: string = fieldRule.name;
    let conditionParam: string = fieldRule.value;

    emulatedUserRule[conditionName] = conditionParam;

    return emulatedUserRule;
  }

  private getUsedRule(fieldRule: IFieldRule): IUserRules {
    let lexem: any = lexSpace[fieldRule.prefix];

    if (!lexem) {
      throw new Error("Bad prefix!");
    }

    switch (lexem.hasRules) {
      case true:
        return this.getUserRule(fieldRule);
      case false:
        return this.getGeneralRule(fieldRule);
    }
  }

  public validateOne(currentField: IDataField, allFields: IDataField[]): IValidatedDataField {
    if (!currentField.fieldRules) {
      return;
    }

    let unimplementedRules: any[] = [];
    try {
      for (let i = 0; i < currentField.fieldRules.length; i++) {
        let usedRule: IUserRule = this.getUsedRule(currentField.fieldRules[i]);

        if (!usedRule) {
          throw new Error("Forgot set rule?");
        }

        let isRuleValid: boolean = this.validationService.checkRuleValidity(usedRule, currentField, allFields); /* @TODO ADD TARGET PARAM */
        if (!isRuleValid) {
          unimplementedRules.push(usedRule);
        }
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
