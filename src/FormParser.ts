import {IFieldRules} from './Types/Rules';
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

  public static getInputRules(input: HTMLInputElement): IFieldRules {
    let rules: IFieldRules = {};
    let rulesCount: number = 0;
    let rulesPrefixes = Validator.getValidatorPrefixes();


    for (let rule in input.dataset) {
      let isRule :boolean = rulesPrefixes.some((value: string) => {
        return rule.substr(0, value.length) == value;
      });

      if (isRule) {
        rules[rule] = input.dataset[rule];
        rulesCount++;
      }
    }

    if (rulesCount == 0) {
      return null;
    }

    return rules;
  }
}
