const features = require('../Features.js');

describe("Features test", () => {
  let data;
  let result;

  it("checkLength test", () => {
    data = ["Username", {
      min: 3,
      max: 5,
    }];

    result = features.checkLength.apply(this, data);
    expect(result).toBe(true);
  });

  it("checkDigits test", () => {
    data = ["123rrt3", {
      min: 3,
      max: 5,
    }];

    result = features.checkLength.apply(this, data);
    expect(result).toBe(true);
  });

  it("checkMask test", () => {
    data = ["qwerty@yuiop.com", {
      reg: /^[0-9a-z-_.]+@\w{2,}\.[a-z\.]{2,6}$/,
    }];

    result = features.checkLength.apply(this, data);
    expect(result).toBe(true);
  });

});
