import {IDataField} from './Types/Fields';
import {IRules} from './Types/Rules';

export default class FormParser {
  private static getFormInputs(form: HTMLFormElement): any {
    let inputs: HTMLInputElement[] = [];

    for(let i = 0; i < form.elements.length; i++) {
      if (form.elements[i].tagName != "INPUT") {
        continue;
      }

      inputs.push(form.elements[i] as HTMLInputElement);
    }

    return inputs;
  }

  private static getInputRules(input: HTMLInputElement): any {
    let rules: IRules = {};
    let rulesCount: number = 0;

    for (let rule in input.dataset) {
        rules[rule] = input.dataset[rule];
        rulesCount++;
    }

    if (rulesCount == 0) {
      return null;
    }

    return rules;
  }
}
