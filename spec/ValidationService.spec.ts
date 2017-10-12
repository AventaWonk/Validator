import {IDataField, IValidatedField, IValidatedDataField} from '../src/Types/Fields';
import ValidationService from '../src/ValidationService';

describe("Validation service test", () => {
  let vs = new ValidationService();
  let userRules = {
    name: {
      mask: {
        reg: /^[0-9a-zA-Z-_]{3,}$/,
        message: "Username should be longer than 3 characters and must consists of latin letters, numbers, underscores and dashes"
      }
    },
    email:  {
      digits: {
        min: 2,
        max: 2,
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
      value: "",
      rules: {
        vlRule: "name",
      }
    },
    {
      name: "email",
      value: "",
      rules: {
        vlRule: "email",
      }
    },
    {
      name: "phone",
      value: "",
      rules: {
        vlRule: "phone",
      }
    },
    {
      name: "password",
      value: "",
      rules: {
        vlRule: "password",
      }
    }
  ];

  it("validates field with invalid (length = 0) value without errors", () => {
    let result = vs.validateField(data[0], data, userRules)
    let expected: IValidatedDataField = {
      isValid: false,
      rules: {
        vlRule: {
          mask: false
        }
      },
    }

    expect(result).toEqual(expected);
  });

  it("validates field with invalid value", () => {
    data[0].value = "--";
    let result = vs.validateField(data[0], data, userRules)
    let expected: IValidatedDataField = {
      isValid: false,
      rules: {
        vlRule: {
          mask: false
        }
      },
    }

    expect(result).toEqual(expected);
  });

  it("validates field with valid value", () => {
    data[0].value = "123";
    let result = vs.validateField(data[0], data, userRules)
    let expected: IValidatedDataField = {
      isValid: true,
      rules: null,
    }

    expect(result).toEqual(expected);
  });



  it("validates field with another condition and invalid (length = 0) value without errors", () => {
    let result = vs.validateField(data[1], data, userRules)
    let expected: IValidatedDataField = {
      isValid: false,
      rules: {
        vlRule: {
          mask: false
        }
      },
    }

    expect(result).toEqual(expected);
  });

  it("validates field with another condition and  valid value", () => {
    data[1].value = "12";
    let result = vs.validateField(data[1], data, userRules)
    let expected: IValidatedDataField = {
      isValid: true,
      rules: null,
    }

    expect(result).toEqual(expected);
  });

  it("validates field with another condition and  invalid value", () => {
    data[1].value = "1";
    let result = vs.validateField(data[1], data, userRules)
    let expected: IValidatedDataField = {
      isValid: false,
      rules: {
        vlRule: {
          mask: false
        }
      },
    }

    expect(result).toEqual(expected);
  });
});
