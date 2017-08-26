let rules = {
  username: {
    length: {
      min: 2,
      max: 3,
      message: "2 - 3 characters",
    },
    digits: {
      min: 5,
      max: 12,
      message: "5 - 12 digits",
    },
  },
  email:  {
    mask: {
      reg: /^[0-9a-z-_.]+@\w{2,}\.[a-z\.]{2,6}$/,
      message: "Enter a valid email address",
    },
  },
  phone:  {
    mask: {
      reg: /(^\+\d+\(\d+\)[\d-]+$)|(^\+[\d-]+$)/,
    },
    length: {
      min: 2,
      max: 3,
    },
    digits: {
      min: 5,
      max: 12,
    },
    message: "Enter a valid phone number. Example: +7(999)999-99-99",
  },
  password:  {
    mask: {
      reg: /([ -~]*([A-Z]+[ -~]*[0-9]+|[0-9]+[ -~]*[A-Z]+)[ -~]*)/
    },
    message: "Password must consists of more then 6 ASCII characters and contains at least 1 capitalized and 1 digit",
    length: {
      min: 3,
    },
  }
};

let form = document.querySelector("form");
let validator = new SimpleValidator(rules);
validator.setValidationOnForm(form);
