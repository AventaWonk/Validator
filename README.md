# Flexible data validator

## Code Example

```html
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <form id="test">
      <p><input type="text" data-vl-rule="name" name="name"><label for=""> Name</label></p>
      <p><input type="text" data-vl-rule="email" name="email"><label for=""> Email</label></p>
      <p><input type="text" name="phone"><label for=""> Phone</label></p>
      <p><input type="password" name="password"><label for=""> Password</label></p>
      <p><input type="password" data-vl-repeat="password" name="passwordr"><label for=""> Repeat password</label></p>
      <p><button type="submit" name="button">Add</button></p>
    </form>
    <script type="text/javascript" src="../built/dist/validator.test.js">

    </script>
  </body>
</html>
```

```ts
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
```
