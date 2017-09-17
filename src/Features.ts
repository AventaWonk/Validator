export default class Features {
<<<<<<< HEAD:lib/Features.js
  static checkRepeat(data, args) {
    return data.some(field => {
      return field.vlRule == args.ruleParam && field.value == args.value;
    });
  }

  static checkMask(value, args) {
=======
  // static checkRepeat(data: any, args: any) {
  //   return data.some(field => {
  //     return field.vlRule == args.ruleParam && field.value == args.value;
  //   });
  // }

  static checkMask(value: string, args: any): boolean {
>>>>>>> develop:src/Features.ts
    return value.match(args.reg) ? true : false;
  }

  static checkLength(value: string, args: any): boolean  {
    if (args.min && value.length < args.min) {
      return false;
    }

    if (args.max && value.length > args.max) {
      return false;
    }

    return true;
  }

  static checkDigits(value: string, args: any): boolean  {
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
