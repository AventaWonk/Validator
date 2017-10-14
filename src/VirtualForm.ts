import {IDataField} from './Types/Fields';
import {IRules} from './Types/Rules';
import FormParser from './FormParser';

interface virtualField {
  inputLink: HTMLInputElement;
  dataRules?: IRules;
  isValid?: boolean;
}

export default class VirtualForm {
  private fields: { [key: string]: virtualField } = {};
  private lastUpdatedField: virtualField;
  private static counter: number = 0;

  constructor(inputs: HTMLInputElement[]) {
    for (let i = 0; i < inputs.length; i++) {
      let id: string = this.setElementId(inputs[i]);
      let currentInput = inputs[i];

      this.fields[id] = {
        inputLink: currentInput,
        dataRules: FormParser.getInputRules(currentInput),
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

  private updateVirtualForm(input: HTMLInputElement): string {
    let id: string = this.setElementId(input);

    this.fields[id] = {
      inputLink: input,
      isValid: false,
      dataRules: FormParser.getInputRules(input),
    }

    return id;
  }

  public getVirtualFormData(): IDataField[] {
    let formData: IDataField[] = [];

    for (let id in this.fields) {
      formData.push({
        name: this.fields[id].inputLink.name,
        value: this.fields[id].inputLink.value,
        rules: this.fields[id].dataRules,
      });
    }

    return formData;
  }

  public updateVirtualFieldValidity(input: HTMLInputElement, validity: boolean) {
    let id: string = this.getElementId(input);

    this.fields[id].isValid = validity;
  }

  public getVirtualFieldValidity(input: HTMLInputElement): boolean {
    let id: string = this.getElementId(input);

    if (!id) {
      id = this.updateVirtualForm(input);
    }

    return this.fields[id].isValid;
  }

  public getVirtualFieldData(input: HTMLInputElement): IDataField {
    let id: string = this.getElementId(input);

    if (!id) {
      id = this.updateVirtualForm(input);
    }

    return {
      name: this.fields[id].inputLink.name,
      value: this.fields[id].inputLink.value,
      rules: this.fields[id].dataRules,
    };
  }

  public get isValid(): boolean {
    for (let id in this.fields) {
      if (!this.fields[id].isValid) {
        return false;
      }
    }

    return true;
  }
}
