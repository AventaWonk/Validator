import Validator from '../lib/Validator.js';

describe("Validator test", () => {
  let data;
  let result;
  let expected;

  let rules = {
    Username: {
      length: {
        min: 3,
        max: 5,
      },
    },
    Password: {
      digits: {
        min: 1,
        max: 2,
      },
    },
    Email: {
      mask: {
        reg: /^[0-9a-z-_.]+@\w{2,}\.[a-z\.]{2,6}$/,
      },
    },
  }

  it("checkLength test", () => {
    data = [
      {
        value: "Qwerty",
        vlRule: "Username",
      },
      {
        value: "Qwd",
        vlRule: "Username",
      },
    ];

    expected = [
      {
        value: "Qwd",
        vlRule: "Username",
      }
    ];

    let validator = new Validator();
    result = validator.getValidData(data, rules);
    expect(result).toEqual(expected);
  });
  

  it("vl-Repeat test", () => {
    data = [
      {
        value: "Qwerty",
        vlRepeat: "Username",
      },
      {
        value: "Qwd",
        vlRule: "Username",
      },
    ];

    expected = [
      {
        value: "Qwerty",
        vlRepeat: "Username",
        valid: false,
      },
      {
        value: "Qwd",
        vlRule: "Username",
        valid: true
      },
    ];

    let validator = new Validator();
    result = validator.validateData(data, rules);
    expect(result).toEqual(expected);
  });

});
