import {IDataField} from './Types/Fields';
import {IRules} from './Types/Rules';

interface virtualField {
  inputLink: HTMLInputElement;
  value: string;
  isValid: boolean;
  // rules: IRules;
}

export default class VirtualForm {
  // private formLink: HTMLFormElement;
  private fields: { [key: string]: virtualField } = {};
  private lastUpdatedField: virtualField;
  private static counter: number = 0;

  constructor(inputs: HTMLInputElement[]) {
    // this.formLink = form;

    for (let i = 0; i < inputs.length; i++) {
      let id: string = this.setElementId(inputs[i]);
      let currentInput = inputs[i];

      this.fields[id] = {
        inputLink: currentInput,
        value: currentInput.value,
        isValid: false,
        // rules: currentInput.dataset.rules;
      }
    }
  }

  private getElementId(element: HTMLElement): string {
    return element.dataset.id;
  }

  private setElementId(element: HTMLElement): string {
    let id: string = VirtualForm.counter.toString();
    element.dataset.id = id;
    VirtualForm.counter++;
    return id;
  }

  public updateField(input: HTMLInputElement) {
    let inputId: string = this.getElementId(input);

    if (!inputId) {
      inputId = this.setElementId(input);

      this.fields[inputId] = {
        inputLink: input,
        value: input.value,
        isValid: false,
      }
    } else {
      this.fields[inputId].value = input.value;
    }

    return this.fields[inputId];
  }

  public updateAllFields(inputs: HTMLInputElement[]) {

  }

  public getLastUpdatedField(): virtualField {
    return this.lastUpdatedField;
  }

  public getFormData(): IDataField[] {
    let formData: IDataField[] = [];

    for (let id in this.fields) {
      formData.push({
        name: this.fields[id].inputLink.name,
        value: this.fields[id].value,
        rules: null,
      });
    }

    return formData;
  }
}
