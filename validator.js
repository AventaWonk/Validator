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
}

function SimpleValidator(rules) {
  this.rules = rules;

  this.validate = form => {
    let errorFlag = false;
    let fields = form.target.elements;

    for (let i = 0; i < fields.length; i++) {
      if (!fields[i].tagName == "INPUT") {
        continue
      };

      if (!fields[i].dataset.vl && !fields[i].dataset.rp) {
        continue
      };

      this.removeError(fields[i]);
      let fieldRule = this.rules[fields[i].dataset.vl];
      if (fieldRule && !(fields[i].value.match(fieldRule.mask) && this.checkDigitsCount(fields[i].value, fieldRule.minDigitsCount, fieldRule.maxDigitsCount))) {
        this.showError(fields[i], fieldRule.message);
        errorFlag = true;
      }

      let repeatFieldName = fields[i].dataset.rp;
      if (repeatFieldName && (fields[i].value != fields[repeatFieldName].value)) {
        this.showError(fields[i], repeatFieldName + "s must match");
        errorFlag = true;
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
