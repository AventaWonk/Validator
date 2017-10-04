import {IDataField, IValidatedField} from '../src/Types/Fields';
import ValidationService from '../src/ValidationService';

describe("Validation service test", () => {
  let userRules = {
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

  let data: IDataField[] = [
    {
      name: "name",
      value: "1",
      rules: {
        vlRule: "name",
      },
      isCurrent: true,
    }
  ];

  it("validates field with invalid value", () => {
    let vs = new ValidationService();
    let result = vs.validateField(data[0], data, userRules)
    let expected: IValidatedField = {
      name: "name",
      value: "1",
      rules: {
        vlRule: "name",
      },
      isCurrent: true,
      isValid: false,
      messages: [
        "Username should be longer than 3 characters and must consists of latin letters, numbers, underscores and dashes"
      ]
    }

    expect(result).toEqual(expected);
  });
});
