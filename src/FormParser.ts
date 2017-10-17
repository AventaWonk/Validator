import {IFieldRules} from './Types/Rules';

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
