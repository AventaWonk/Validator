import Features from './Features';
import {lexSpace} from './Settings';
import ValidationResult from './ValidationResult';
import IValidator from './Interfaces/IValidator';
import {ILexem} from './Types/Lexems';
import {IDataField, IValidatedField} from './Types/Fields';
import {IRules, IUserRule, IUserRules, INormalizedRule, INormalizedRules} from './Types/Rules';

export default class Validator implements IValidator{
  private getParams(data: IDataField[], index: number, lexem: ILexem) {
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

  private getConditions(currentRule: INormalizedRule, userRule: IUserRule, data: IDataField): IUserRules {
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

  private getRules(data: IDataField): INormalizedRules {
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

  private checkCondition(data: IDataField[], name: string, conditions: IUserRule): boolean {
    let conditionMethodName = "check" + name.charAt(0).toUpperCase() + name.slice(1);

     return (Features as any)[conditionMethodName](data[0].value, conditions);
  }

  public validate(data: IDataField[], userRules: IUserRules): ValidationResult {
    let validatedData: IValidatedField[] = [];

    for (let i = 0; i < data.length; i++) {
      let normalizedRules: INormalizedRules = this.getRules(data[i]);

      for (let ruleName in normalizedRules) {
        let rule: INormalizedRule = normalizedRules[ruleName];
        let userRule: IUserRule = userRules[rule.value];
        if (!data[i].rules) {
          continue;
        }
        if (rule.lexem.hasRules && !userRule) {
          console.error("Forgot set " + rule.lexem.name + "?");
          continue;
        }

        let params: IDataField[] = this.getParams(data, i, rule.lexem);
        let conditions = this.getConditions(rule, userRule, data[i]);

        for (let condition in conditions) {
          let validatedField: IValidatedField = (Object as any).assign(data[i], {
            isValid: this.checkCondition(params, condition, conditions[condition])
          });
          validatedData.push(validatedField);
        }
      }
    }

    return new ValidationResult(validatedData);
  }

  public validateField(currentField: IDataField, data: IDataField[], userRules: IUserRules): ValidationResult {
    let validatedField: IValidatedField[] = [];
    let normalizedRules: INormalizedRules = this.getRules(currentField);

    for (let ruleName in normalizedRules) {
      let rule: INormalizedRule = normalizedRules[ruleName];
      let userRule: IUserRule = userRules[rule.value];
      if (Object.keys(currentField.rules).length == 0) {
        continue;
      }
      if (rule.lexem.hasRules && !userRule) {
        console.error("Forgot set " + rule.lexem.name + "?");
        continue;
      }

      let params: IDataField[] = [];
      params.push(currentField);
      // let params: IDataField[] = this.getParams(data, i, rule.lexem); // [....]

      let conditions = this.getConditions(rule, userRule, currentField);  
      let messages: string[] = [];
      let validationFlag: boolean = true;
      for (let condition in conditions) {
        if (!this.checkCondition(params, condition, conditions[condition])) {
          validationFlag = false;
          if (conditions[condition].message) {
            messages.push(conditions[condition].message);
          }
        }
      }

      validatedField.push((Object as any).assign(currentField, {
        isValid: validationFlag,
        messages: messages,
      }));
    }

    return new ValidationResult(validatedField);
  }
}
