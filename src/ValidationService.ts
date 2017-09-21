import Features from './Features';
import {lexSpace} from './Settings';
import IValidationService from './Interfaces/IValidationService';
import {ILexem} from './Types/Lexems';
import {IDataField, IValidatedField} from './Types/Fields';
import {IUserRule, IUserRules, INormalizedRule, INormalizedRules} from './Types/Rules';

export default class Validator implements IValidationService{
  private static getParams(data: IDataField[], index: number, lexem: ILexem) {
    switch (lexem.target) {
      case "self":
        let params: IDataField[] = [];
        params.push(data[index]);
        return params;
      case "all":
        return data;
      default:
        return data;
    }
  }

  private static getConditions(currentRule: INormalizedRule, userRule: IUserRule, data: IDataField): IUserRules {
    if (currentRule.lexem.hasRules) {
      return userRule;
    }
    // } else {
    //   let conditions: IUserRules = {};
    //   let featureName = currentRule.lexem.name.charAt(0).toLowerCase() + currentRule.lexem.name.slice(1);
    //   conditions[featureName] = {
    //     ruleParam: data.,
    //     value: data.value,
    //   };
    //  return conditions;
    // }
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
    let conditionMethodName = "check" + name.charAt(0).toUpperCase() + name.slice(1);

     return (Features as any)[conditionMethodName](data[0].value, conditions);
  }

  public validateField(currentField: IDataField, allFields: IDataField[], userRules: IUserRules): IValidatedField {
    let validatedField: IValidatedField;
    let normalizedRules: INormalizedRules = Validator.getRules(currentField);

    for (let ruleName in normalizedRules) {
      let rule: INormalizedRule = normalizedRules[ruleName];
      let userRule: IUserRule = userRules[rule.value];
      if (Object.keys(currentField.rules).length == 0) {
        return null;
      }
      if (rule.lexem.hasRules && !userRule) {
        console.error("Forgot set " + rule.lexem.name + "?");
        return null;
      }

      let params: IDataField[] = [];
      params.push(currentField);
      // let params: IDataField[] = this.getParams(data, i, rule.lexem); // [....]

      let conditions = Validator.getConditions(rule, userRule, currentField);
      let messages: string[] = [];
      let validationFlag: boolean = true;
      for (let condition in conditions) {
        if (!Validator.checkCondition(params, condition, conditions[condition])) {
          validationFlag = false;
          if (conditions[condition].message) {
            messages.push(conditions[condition].message);
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
