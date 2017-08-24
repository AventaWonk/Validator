const Conditions = {
  checkLength: (value, minLength, maxLength) => {
    /*
    * @TODO
    */
  },

  checkDigitsCount: (value, minCount, maxCount) => {
    let number;
    let count = 0;

    for (var i = 0; i < value.length; i++) {
      if (parseInt(value[i], 10)) {
        count++;
      }
    }

    if (minCount && count < minCount) {
      return false;
    }

    if (maxCount && count > maxCount) {
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

  checkConditions: (fields, conditions) => {
    for (let condition in conditions) {
      console.log(condition);
    }
  },

  getConditions: (dataset, lexemes, baseName) => {
    let conditions = {};
    for (let i = 0; i < lexemes.length; i++) {
      let lexemName = baseName + lexemes[i];
      if (dataset[lexemName]) {
        conditions[lexemName] = dataset[lexemName];
      }
    }

    return conditions;
  },
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
    let errorFlag = false;
    let fields = form.target.elements;

    for (let i = 0; i < fields.length; i++) {
      if (!fields[i].tagName == "INPUT") {
        continue
      };

      let avalibleConditions = this.getConditions(fields[i].dataset, this.lexemes, this.baseName);
      if (!avalibleConditions) {
        continue;
      }

      this.removeError(fields[i]);
      if (!this.checkConditions(fields, avalibleConditions)) {
        // this.showError(fields[i], fieldRule.message);
      }

      // if (!fields[i].value.match(fieldRule.mask)) {
      //
      // }
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
