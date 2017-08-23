let rules = {
  username: {
    mask: /^[0-9a-zA-Z-_]{3,}$/,
    message: "Username should be longer than 3 characters and must consists of latin letters, numbers, underscores and dashes"
  },
  email:  {
    mask: /^[0-9a-z-_.]+@\w{2,}\.[a-z\.]{2,6}$/,
    message: "Enter a valid email address"
  },
  phone:  {
    mask: /(^\+\d+\(\d+\)[\d-]+$)|(^\+[\d-]+$)/,
    message: "Enter a valid phone number. Example: +7(999)999-99-99",
    minDigitsCount: 5,
    maxDigitsCount: 12
  },
  password:  {
    mask: /([ -~]*([A-Z]+[ -~]*[0-9]+|[0-9]+[ -~]*[A-Z]+)[ -~]*)/,
    message: "Password must consists of more then 6 ASCII characters and contains at least 1 capitalized and 1 digit",
    minLength: 3,
  }
};

let form = document.querySelector("form");
let validator = new SimpleValidator(rules);
validator.setValidationOnForm(form);
