import Features from './Features';
import {baseName, lexemes} from './Settings';

export default class Validator {

  getValues(data, index, lexem) {
    let params;

    switch (lexem.target) {
      case "self":
        params = data[index].value;
        break;
      case "all":
        params = data;
        break;
      default:
        params = data;
        break;
    }

    return params;
  }

  getConditions(validationRules, rule, userRules) {
    let conditions = {};

    if (validationRules[rule].rules) {
      conditions = userRules[key];
    } else {
      conditions[rule] = rule;
    }

    return conditions;
  }

  getRules(data) {
    let ruleClasses = {};

   for (let i = 0; i < lexemes.length; i++) {
     let lexemName = baseName + lexemes[i];
     if (data[lexemName]) {
       ruleClasses[lexemName] = data[lexemName];
     }
   }

   return ruleClasses;
  }

  checkCondition(value, name, conditions) {
    let conditionMethodName = "check" + name.charAt(0).toUpperCase() + name.slice(1);

    return Features[conditionMethodName](value, conditions);
  }

  validateData(data, userRules) {
    let validatedData = [...data];

    for (let i = 0; i < data.length; i++) {
      let validationRules = this.getRules(data[i]);

      for (let validationRule in validationRules) {
        let params = this.getValues(data, i, validationRule);
        let conditions = this.getConditions(validationRules, validationRule, userRules);

        for (let condition in conditions) {
          validatedData[i].valid = this.checkCondition(params, condition, conditions[condition]);
        }

      }
    }

    return validatedData;
  }

  getValidData(data, rules) {
    let validatedData = this.validateData(data, rules);

    for (let i = 0; i < validatedData.length; i++) {
      if (!validatedData[i].valid) {
        validatedData.splice(i, 1);
        i--;
      }
    }

    return validatedData;
  }


}
