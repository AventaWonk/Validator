
import {IFieldRule} from './Types/Rules';
import Validator from './Validator';

export default class FormParser {
  public static getFormInputs(form: HTMLFormElement): HTMLInputElement[] {
    let inputs: HTMLInputElement[] = [];

    for(let i = 0; i < form.elements.length; i++) {
      if (form.elements[i].tagName != "INPUT") {
        continue;
      }

      inputs.push(form.elements[i] as HTMLInputElement);
    }

    return inputs;
  }

  public static getInputRules(input: HTMLInputElement): IFieldRule[] {
    let rules: IFieldRule[] = [];
    let rulesPrefixes = Validator.getValidatorPrefixes();


    for (let ruleName in input.dataset) {
      let prefix: string = null;


      rulesPrefixes.forEach(value => {
        if (ruleName.substr(0, value.length) == value) {
          prefix = value;
          // return;
        }
      })

      if (prefix) {
        rules.push({
          name: ruleName,
          value: input.dataset[ruleName],
          prefix: prefix,
        });
      }
    }

    if (rules.length == 0) {
      return null;
    }

    return rules;
  }
}
