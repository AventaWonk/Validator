import {IDataField} from './Types/Fields';
import {IRules} from './Types/Rules';

export default class FormParser{
  public static getData(form: HTMLFormElement): IDataField[]{
    let formData: IDataField[];

    for(let i = 0; i < form.elements.length; i++) {
      if (form.elements[i].tagName != "INPUT") {
        continue;
      }

      let input: HTMLInputElement = form.elements[i] as HTMLInputElement;
      let rules: IRules = {};
      for (let rule in input.dataset) {
          rules[rule] = input.dataset[rule];
      }
      let data: IDataField = {
        name:  input.name,
        value: input.value,
        rules: rules,
      };
      formData.push(data);
    }

    return formData;
  }
}
