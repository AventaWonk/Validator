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

  describe("vl-Rule test", () => {
    let validator = new Validator();

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

      result = validator.getValidData(data, rules);
      expect(result).toEqual(expected);
    });
  });


  describe("vl-Repeat test", () => {
    let validator = new Validator();

    it("checkRepeat valid test", () => {
      data = [
        {
          value: "Qwd",
          vlRule: "Username",
        },
        {
          value: "Qwd",
          vlRepeat: "Username",
        }
      ];

      expected = [
        {
          value: "Qwd",
          vlRule: "Username",
        },
        {
          value: "Qwd",
          vlRepeat: "Username",
        }
      ];

      result = validator.getValidData(data, rules);
      expect(result).toEqual(expected);
    });

    it("checkRepeat invalid test", () => {
      data = [
        {
          value: "Qwd",
          vlRule: "Username",
        },
        {
          value: "1Qwd",
          vlRepeat: "Username",
        },
      ];

      expected = [
        {
          value: "Qwd",
          vlRule: "Username",
        }
      ];

      result = validator.getValidData(data, rules);
      expect(result).toEqual(expected);
    });

  });
});
