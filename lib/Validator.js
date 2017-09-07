import Features from './Features';
import {baseName, lexemes} from './Settings';

export default class Validator {

  getRuleClasses(data) {
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

  validateData(data, rules) {
    let validatedData = [...data];

    for (let i = 0; i < validatedData.length; i++) {
      let ruleClasses = this.getRuleClasses(data[i]);

      for (let rule in ruleClasses) {
        let conditions = rules[ruleClasses[rule]];

        for (let condition in conditions) {
          if (!this.checkCondition(validatedData[i].value, condition, conditions[condition])) {
            validatedData[i].invalid = true;
          }
        }
      }
    }

    return validatedData;
  }

  getValidData(data, rules) {
    let validatedData = this.validateData(data, rules);

    for (let i = 0; i < validatedData.length; i++) {
      if (validatedData[i].invalid) {
        validatedData.splice(i, 1);
        i--;
      }
    }

    return validatedData;
  }


}
