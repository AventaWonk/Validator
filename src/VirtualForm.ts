import {IDataField} from './Types/Fields';
import {IFieldRules} from './Types/Rules';
import FormParser from './FormParser';

interface virtualField {
  inputLink: HTMLInputElement;
  fieldRules?: IFieldRules;
  isValid?: boolean;
}

export default class VirtualForm {
  private fields: { [key: string]: virtualField } = {};
  private static counter: number = 0;

  constructor(inputs: HTMLInputElement[]) {
    for (let i = 0; i < inputs.length; i++) {
      let id: string = VirtualForm.setElementId(inputs[i]);
      let currentInput = inputs[i];

      this.fields[id] = {
        inputLink: currentInput,
        fieldRules: FormParser.getInputRules(currentInput),
      }
    }
  }

  private static getElementId(element: HTMLElement): string {
    return element.dataset.id;
  }

  private static setElementId(element: HTMLElement): string {
    let id: string = VirtualForm.counter.toString();
    element.dataset.id = id;
    VirtualForm.counter++;
    return id;
  }

  private updateVirtualForm(input: HTMLInputElement): string {
    let id: string = VirtualForm.setElementId(input);

    this.fields[id] = {
      inputLink: input,
      isValid: false,
      fieldRules: FormParser.getInputRules(input),
    };

    return id;
  }

  public getVirtualFormData(): IDataField[] {
    let formData: IDataField[] = [];

    for (let id in this.fields) {
      formData.push({
        name: this.fields[id].inputLink.name,
        value: this.fields[id].inputLink.value,
        fieldRules: this.fields[id].fieldRules,
      });
    }

    return formData;
  }

  public updateVirtualFieldValidity(input: HTMLInputElement, validity: boolean) {
    let id: string = VirtualForm.getElementId(input);

    this.fields[id].isValid = validity;
  }

  public getVirtualFieldValidity(input: HTMLInputElement): boolean {
    let id: string = VirtualForm.getElementId(input);

    if (!id) {
      id = this.updateVirtualForm(input);
    }

    return this.fields[id].isValid;
  }

  public getVirtualFieldData(input: HTMLInputElement): IDataField {
    let id: string = VirtualForm.getElementId(input);

    if (!id) {
      id = this.updateVirtualForm(input);
    }

    return {
      name: this.fields[id].inputLink.name,
      value: this.fields[id].inputLink.value,
      fieldRules: this.fields[id].fieldRules,
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
