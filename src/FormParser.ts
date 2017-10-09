import {IDataField} from './Types/Fields';
import {IRules} from './Types/Rules';

export default class FormParser {
  private form: HTMLFormElement;
  private virtualForm: any;
  private onInput: Function;
  private static counter: number = 0;

  constructor (form: HTMLFormElement, onInput: Function) {
    this.form = form;
    this.virtualForm = this.initializeVirtualForm(form);
    this.onInput = onInput;
    this.form.addEventListener("input", this.onInputCallback);
  }

  public getInputData(input: HTMLInputElement): IDataField {
    let rules: IRules = {};
    let inputData: IDataField;

    let inputId: string = this.getElementId(input);
    if (!inputId) {
      inputId = this.setElementId(input)
    }

    if (this.virtualForm[inputId]) {
      for (let rule in input.dataset) {
          rules[rule] = input.dataset[rule];
      }
      inputData = {
        name:  input.name,
        value: input.value,
        rules: rules
      };
      this.virtualForm[inputId] = inputData
    } else {
      this.virtualForm[inputId].value = input.value;
      inputData = this.virtualForm[inputId];
    }

    return inputData;
  }

  public getFormData(): IDataField[] {
    let formData: IDataField[] = [];

    for (let id in this.virtualForm) {
      formData.push(this.virtualForm[id]);
    }

    return this.virtualForm;
  }

  private onInputCallback(e: Event): void {
    let inputData: IDataField = this.getInputData(e.target as HTMLInputElement);
    //updateVirtualForm(e.target as HTMLInputElement);
    this.onInput(inputData, e);
  }

  private getElementId(element: HTMLElement): string {
    return element.dataset.id;
  }

  private setElementId(element: HTMLElement): string {
    let id: string = FormParser.counter.toString();
    element.dataset.id = id;
    FormParser.counter++;
    return id;
  }

  private initializeVirtualForm(form: HTMLFormElement): any {
    let inputs: any[] = FormParser.getFormInputs(form);
    let virtualForm: any = {};

    for (let i = 0; i < inputs.length; i++) {
      let id: string = this.setElementId(inputs[i]);
      virtualForm[id] = {
        name:  inputs[i].input.name,
        value: inputs[i].input.value,
        rules: inputs[i].rules
      }
    }

    return virtualForm;
  }

  private updateVirtualForm(virtualForm: any, input: HTMLInputElement, ): any {
    let inputData: IDataField;
    let newVirtualForm = (Object as any).assign({}, virtualForm);

    let inputId: string = this.getElementId(input);
    if (!inputId) {
      inputId = this.setElementId(input);
      let rules: IRules = {};
      for (let rule in input.dataset) {
          rules[rule] = input.dataset[rule];
      }
      newVirtualForm[inputId] = {
        name:  input.name,
        value: input.value,
        rules: rules
      }
    } else {
      newVirtualForm[inputId].value = input.value;
    }

    return newVirtualForm;
  }

  // public remove() {
  //   this.form.removeEventListener("input", this.onInputCallback);
  // }

  private static getFormInputs(form: HTMLFormElement): any {
    let formData: any[] = [];

    for(let i = 0; i < form.elements.length; i++) {
      if (form.elements[i].tagName != "INPUT") {
        continue;
      }

      let input: HTMLInputElement = form.elements[i] as HTMLInputElement;
      let rules: IRules = {};
      for (let rule in input.dataset) {
          rules[rule] = input.dataset[rule];
      }
      let data: any = {
        input: input,
        rules: rules
      };
      formData.push(data);
    }

    return formData;
  }

  private static getFormInputsHavingRules(form: HTMLFormElement): any {
    let formData: any[] = [];

    for(let i = 0; i < form.elements.length; i++) {
      if (form.elements[i].tagName != "INPUT") {
        continue;
      }

      let input: HTMLInputElement = form.elements[i] as HTMLInputElement;
      let rules: IRules = {};
      let rulesCount: number = 0;
      for (let rule in input.dataset) {
          rules[rule] = input.dataset[rule];
          rulesCount++;
      }
      if (rulesCount == 0) {
        continue;
      }
      let data: any = {
        input: input,
        rules: rules
      };
      formData.push(data);
    }

    return formData;
  }

  public static getFormData(form: HTMLFormElement, currentInput?: HTMLInputElement): IDataField[] {
    let formData: IDataField[] = [];

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
        isCurrent: form.elements[i] == currentInput,
      };
      formData.push(data);
    }

    return formData;
  }

  public static getFieldData(input: HTMLInputElement): IDataField {
    let rules: IRules = {};

    for (let rule in input.dataset) {
        rules[rule] = input.dataset[rule];
    }

    return {
      name:  input.name,
      value: input.value,
      rules: rules
    };
  }
}
