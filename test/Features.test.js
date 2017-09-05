import Features from '../lib/Features.js';

describe("Features test", () => {
  let data;
  let result;

  it("checkLength invalid test", () => {
    data = ["Username", {
      min: 3,
      max: 5,
    }];

    result = Features.checkLength.apply(this, data);
    expect(result).toBeFalsy();
  });

  it("checkLength valid test", () => {
    data = ["Username", {
      min: 8,
      max: 8,
    }];

    result = Features.checkLength.apply(this, data);
    expect(result).toBeTruthy();
  });



  it("checkDigits invalid test", () => {
    data = ["123rrt3", {
      min: 9,
      max: 10,
    }];

    result = Features.checkDigits.apply(this, data);
    expect(result).toBeFalsy();
  });

  it("checkDigits valid test", () => {
    data = ["123rrt3", {
      min: 3,
      max: 5,
    }];

    result = Features.checkDigits.apply(this, data);
    expect(result).toBeTruthy();
  });



  it("checkMask invalid test", () => {
    data = ["qwyuiop.com", {
      reg: /^[0-9a-z-_.]+@\w{2,}\.[a-z\.]{2,6}$/,
    }];

    result = Features.checkMask.apply(this, data);
    expect(result).toBeFalsy();
  });

  it("checkMask valid test", () => {
    data = ["qwerty@yuiop.com", {
      reg: /^[0-9a-z-_.]+@\w{2,}\.[a-z\.]{2,6}$/,
    }];

    result = Features.checkMask.apply(this, data);
    expect(result).toBeTruthy();
  });

});
