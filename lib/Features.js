export default class Features {
  checkMask(value, args) => {
    return value.match(args.reg) ? true : false;
  }

  checkLength(value, args) => {
    if (args.min && value.length < args.min) {
      return false;
    }

    if (args.max && value.length > args.max) {
      return false;
    }

    return true;
  }

  checkDigits(value, args) => {
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
