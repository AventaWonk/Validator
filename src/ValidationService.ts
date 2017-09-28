import Features from './Features';
import {lexSpace} from './Settings';
import IValidationService from './Interfaces/IValidationService';
import {ILexem} from './Types/Lexems';
import {IDataField, IValidatedField} from './Types/Fields';
import {IUserRule, IUserRules, INormalizedRule, INormalizedRules} from './Types/Rules';

export default class Validator implements IValidationService{
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

  private static getUserRules(rule: INormalizedRule, userRules: IUserRules, normalizedRules: IUserRule, ruleName: string, currentField: IDataField): IUserRules {
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
      if (data.rules[lexem]) {
       normalizedRules[lexSpace[base][i].name] = {
         lexem: lexSpace[base][i],
         value: data.rules[lexem],
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

  public validateField(currentField: IDataField, allFields: IDataField[], userRules: IUserRules): IValidatedField {
    if (Object.keys(currentField.rules).length == 0) {
      return null;
    }

    let validatedField: IValidatedField;
    let normalizedRules: INormalizedRules = Validator.getRules(currentField);

    for (let ruleName in normalizedRules) {
      let rule: INormalizedRule = normalizedRules[ruleName];
      let userRule: IUserRule = Validator.getUserRules(rule, userRules, normalizedRules, ruleName, currentField);

      if (!userRule) {
        console.error("Forgot set " + rule.lexem.name + "?");
        return null;
      }

      let params: IDataField[] = Validator.getParams(currentField, allFields, rule.lexem);
      let messages: string[] = [];
      let validationFlag: boolean = true;
      for (let condition in userRule) {
        if (!Validator.checkCondition(params, condition, userRule[condition])) {
          validationFlag = false;
          if (userRule[condition].message) {
            messages.push(userRule[condition].message);
          }
        }
      }

      validatedField = (Object as any).assign(currentField, {
        isValid: validationFlag,
        messages: messages,
      });
    }

    return validatedField;
  }
}
