const Conditions = {
  checkMask: (value, args) => {
    /*
    * @TODO
    */
    return false;
  },

  checkLength: (value, args) => {
    /*
    * @TODO
    */
    return false;
  },

  checkDigits: (value, args) => {
    let count = 0;

    for (var i = 0; i < value.length; i++) {
      if (parseInt(value[i], 10)) {
        count++;
      }
    }

    if (args.min && count < args.min) {
      return false;
    }

    if (args.max && count > args.max) {
      return false;
    }

    return true;
  },
};

const Validator = {
  showError: (node, msg) => {
    let error = document.createElement('p');
    error.name = "error";
    error.innerHTML = msg;
    node.parentNode.appendChild(error);
  },

  removeError: node => {
    if (node.parentNode.lastChild.name == "error") {
      node.parentNode.removeChild(node.parentNode.lastChild);
    }
  },

  getRuleClasses: (dataset, lexemes, baseName) => {
    let conditions = {};
    for (let i = 0; i < lexemes.length; i++) {
      let lexemName = baseName + lexemes[i];
      if (dataset[lexemName]) {
        conditions[lexemName] = dataset[lexemName];
      }
    }

    return conditions;
  },

  checkCondition: (value, name, conditions) => {
    let conditionMethodName = "check" + name.charAt(0).toUpperCase() + name.slice(1);
    return Conditions[conditionMethodName](value, conditions);
  }
}

function SimpleValidator(rules) {
  this.rules = rules;
  this.baseName = "vl";
  this.lexemes = [
    "Rule",
    "Repeat"
  ];

  this.validate = form => {
    form.preventDefault();
    let errorFlag = true;
    let fields = form.target.elements;

    for (let i = 0; i < fields.length; i++) {
      if (!fields[i].tagName == "INPUT") {
        continue
      };

      let ruleClasses = this.getRuleClasses(fields[i].dataset, this.lexemes, this.baseName);
      if (!ruleClasses) {
        continue;
      }

      this.removeError(fields[i]);
      for (let rule in ruleClasses) {
        let ruleError = false;
        let conditions = rules[ruleClasses[rule]];

        for (let condition in conditions) {
          if (condition == "message") {
            continue;
          }

          if (!this.checkCondition(fields[i].value, condition, conditions[condition])) {
            errorFlag = ruleError = true;
            if (conditions[condition].message) {
              this.showError(fields[i], conditions[condition].message);
            }
          }
        }

        if (ruleError && conditions && conditions.message) {
          this.showError(fields[i], conditions.message);
        }
      }
    }

    if (errorFlag) {
      return false
    };
  };

  this.setValidationOnForm = form => {
    form.onsubmit = this.validate;
  };
}

SimpleValidator.prototype = Validator;
