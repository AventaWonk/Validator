const Conditions = {
  checkMask: (value, mask) => {
    /*
    * @TODO
    */
  },

  checkLength: (value, args) => {
    /*
    * @TODO
    */
  },

  checkDigits: (value, args) => {
    let number;
    let count = 0;

    for (var i = 0; i < value.length; i++) {
      if (parseInt(value[i], 10)) {
        count++;
      }
    }

    if (args.minCount && count < args.minCount) {
      return false;
    }

    if (args.maxCount && count > args.maxCount) {
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

  checkCondition: (value, condition) => {
    /*
    * @TODO
    */
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
    let errorFlag = false;
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
        for (let condition in rules[ruleClasses[rule]]) {
          if (!this.checkCondition(fields[i].value, condition)) {
            this.showError(fields[i], rule.message);
          }
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
