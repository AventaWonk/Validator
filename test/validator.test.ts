import ValidatorDOM from '../src/ValidatorDOM';
import MessageService from '../src/MessageService';
import ValidationService from '../src/ValidationService';

let rules = {
  name: {
    mask: {
      reg: /^[0-9a-zA-Z-_]{3,}$/,
      message: "Username should be longer than 3 characters and must consists of latin letters, numbers, underscores and dashes"
    }
  },
  email:  {
    mask: {
      reg: /^[0-9a-z-_.]+@\w{2,}\.[a-z\.]{2,6}$/,
      message: "Enter a valid email address"
  }
  },
  phone:  {
    mask: {
      reg: /(^\+\d+\(\d+\)[\d-]+$)|(^\+[\d-]+$)/,
      message: "Enter a valid phone number. Example: +7(999)999-99-99"
    },
  },
  password:  {
    mask: {
      reg: /([ -~]*([A-Z]+[ -~]*[0-9]+|[0-9]+[ -~]*[A-Z]+)[ -~]*)/,
      message: "Password must consists of more then 6 ASCII characters and contains at least 1 capitalized and 1 digit"
    }
  },
};

let validationService = new ValidationService();
let messageService = new MessageService();
let vl = new ValidatorDOM(validationService, messageService);

let callbacks = {
  onFieldIsNotValid: (input: HTMLInputElement) => {
    input.setAttribute('style', "border: 1px solid red;");
  },
  onFieldIsValid: (input: HTMLInputElement) => {
    input.setAttribute('style', "border: 1px solid green;");
  }
}

let form = document.getElementById("test") as HTMLFormElement;
vl.setValidatorOnForm(form, rules, callbacks);
