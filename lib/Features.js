export default class Features {
  static checkRepeat(data, args) {
    return data.some(field => {
      return field.vlRule == args.ruleParam && field.value == args.value;
    });
  }

  static checkMask(value, args) {
    return value.match(args.reg) ? true : false;
  }

  static checkLength(value, args) {
    if (args.min && value.length < args.min) {
      return false;
    }

    if (args.max && value.length > args.max) {
      return false;
    }

    return true;
  }

  static checkDigits(value, args) {
    let count = 0;

    for (var i = 0; i < value.length; i++) {
      if (parseInt(value[i], 10)) {
        count++;
      }
    }

    if (args.min && count < args.min) {
      return false;
    }

    if (args.max && count > args.max) {
      return false;
    }

    return true;
  }
}
