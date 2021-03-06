import Features from './Features';
import {lexSpace} from './Settings';
import IValidationService from './Interfaces/IValidationService';
import {ILexem} from './Types/Lexems';
import {IDataField, IValidatedDataField} from './Types/Fields';
import {IFieldRules, IUserRule, IUserRules, INormalizedRule, INormalizedRules, IValidatedRules} from './Types/Rules';

export default class ValidationService implements IValidationService {
  private static getParams(current: IDataField, data: IDataField[], lexem: ILexem): IDataField[] {
    switch (lexem.target) {
      case "self":
        let params: IDataField[] = [];
        params.push(current);
        return params;
      case "all":
        return data;
      default:
        return data;
    }
  }

  private static getUsedRules(rule: INormalizedRule, userRules: IUserRules, normalizedRules: IUserRule, ruleName: string, currentField: IDataField): IUserRules {
    switch (rule.lexem.hasRules) {
      case true:
        return userRules[rule.value];
      case false:
        let userRule: IUserRule = {};
        let normalizedRuleName = ruleName.charAt(0).toLowerCase() + ruleName.slice(1);
        userRule[normalizedRuleName] = {
          currentField: currentField,
          value: normalizedRules[ruleName].value,
        };
        return userRule;
    }
  }

  private static getRules(data: IDataField): INormalizedRules {
    let normalizedRules: INormalizedRules = {};
    let base: string = "vl";

    for (let i = 0; i < lexSpace[base].length; i++) {
      let lexem: string = base + lexSpace[base][i].name.charAt(0).toUpperCase() + lexSpace[base][i].name.slice(1);
      if (data.fieldRules[lexem]) {
       normalizedRules[lexSpace[base][i].name] = {
         lexem: lexSpace[base][i],
         value: data.fieldRules[lexem],
       };
      }
    }

   return normalizedRules;
  }

  private static checkCondition(data: IDataField[], name: string, conditions: IUserRule): boolean {
    try {
      let conditionMethodName: string = "check" + name.charAt(0).toUpperCase() + name.slice(1);
      let func: Function  = (Features as any)[conditionMethodName];
      if (data.length == 1) {
        return func(data[0].value, conditions);
      }

      return func(data, conditions);
    } catch (e) {
      console.error(e.message);
    }
  }

  public validateField(currentField: IDataField, allFields: IDataField[], userRules: IUserRules): IValidatedDataField {
    let normalizedRules: INormalizedRules = ValidationService.getRules(currentField);
    let validationFlag: boolean = true;
    let validatedRules: IValidatedRules = {};

    for (let ruleName in normalizedRules) {
      let rule: INormalizedRule = normalizedRules[ruleName];
      let userRule: IUserRule = ValidationService.getUsedRules(rule, userRules, normalizedRules, ruleName, currentField);

      if (!userRule) {
        throw new Error("Forgot set " + rule.lexem.name + "?");
      }

      let params: IDataField[] = ValidationService.getParams(currentField, allFields, rule.lexem);
      let conditions: any = {};

      for (let condition in userRule) {
        let validationResult = ValidationService.checkCondition(params, condition, userRule[condition]);
        if (! validationResult) {
          validationFlag = false;
        }

        conditions[condition] = validationResult;
      }
      validatedRules["vl" + ruleName] = conditions;
    }

    if (validationFlag) {
      validatedRules = null;
    }

    return {
      name: currentField.name,
      value: currentField.value,
      validatedRules: validatedRules,
      isValid: validationFlag
    }
  }
}
