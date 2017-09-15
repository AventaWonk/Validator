import Features from './Features';
import {baseName, lexemes} from './Settings';
import ValidationResult from './ValidationResult';

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

  getConditions(currentRule, userRules, data) {
    let conditions = {};

    if (currentRule.lexem.rules) {
      conditions = userRules[currentRule.value];
    } else {
      let featureName = currentRule.lexem.name.charAt(0).toLowerCase() + currentRule.lexem.name.slice(1);
      conditions[featureName] = {
        ruleParam: data[baseName + currentRule.lexem.name],
        value: data.value,
      };
    }

    return conditions;
  }

  getRules(data) {
    let ruleClasses = {};

   for (let i = 0; i < lexemes.length; i++) {
     let lexemName = baseName + lexemes[i].name;
     if (data[lexemName]) {
       ruleClasses[lexemName] = {
         value: data[lexemName],
         lexem: lexemes[i]
       };
     }
   }

   return ruleClasses;
  }

  checkCondition(value, name, conditions) {
    let conditionMethodName = "check" + name.charAt(0).toUpperCase() + name.slice(1);

    return Features[conditionMethodName](value, conditions);
  }

  validate(data, userRules) {
    let validatedData = [...data];

    for (let i = 0; i < data.length; i++) {
      let validationRules = this.getRules(data[i]);

      for (let validationRule in validationRules) {
        let currentRule = validationRules[validationRule];
        let params = this.getValues(data, i, currentRule.lexem);
        let conditions = this.getConditions(currentRule, userRules, data[i]);

        for (let condition in conditions) {
          validatedData[i].isValid = this.checkCondition(params, condition, conditions[condition]);
        }
      }
    }

    return new ValidationResult(validatedData);
  }
}
