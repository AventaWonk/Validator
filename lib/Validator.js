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

  getValidData(data, rules) {
    let validData = [];

    for (let i = 0; i < data.length; i++) {
      let ruleClasses = this.getRuleClasses(data[i]);

      for (let rule in ruleClasses) {
        let conditions = rules[ruleClasses[rule]];

        for (let condition in conditions) {
          if (this.checkCondition(data[i].value, condition, conditions[condition])) {
            validData.push(Object.assign({}, data[i]));
          }
        }
      }
    }

    return validData;
  }

  validateData(data, rules) {
    // let data = [
    //   {
    //     value: "Test",
    //     vlRule: "Username",
    //   },
    // ];
    //
    // let error = [
    //   {
    //     value: "Test",
    //     vlRule: "Username",
    //     message: "Must have 3 characters",
    //   }
    // ];

    // for (let i = 0; i < data.length; i++) {
    //   let ruleClasses = this.getRuleClasses(data[i]);
    //
    //   for (let rule in ruleClasses) {
    //     let ruleError = false;
    //     let conditions = rules[ruleClasses[rule]];
    //
    //     for (let condition in conditions) {
    //       if (condition == "message") {
    //         continue;
    //       }
    //
    //       if (!this.checkCondition(fields[i].value, condition, conditions[condition])) {
    //         if (conditions[condition].message) {
    //           this.showError(fields[i], conditions[condition].message);
    //         }
    //       }
    //     }
    //
    //     if (ruleError && conditions && conditions.message) {
    //       this.showError(fields[i], conditions.message);
    //     }
    //   }
    // }

  }
}
