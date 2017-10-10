import {IDataField} from './Types/Fields';
import {IRules} from './Types/Rules';

export default class FormParser {
  private form: HTMLFormElement;
  private virtualForm: any;
  private onInput: Function;
  private static counter: number = 0;

  constructor (form: HTMLFormElement, onInput: Function) {
    this.form = form;
    this.onInput = onInput;
    this.initializeVirtualForm(form);
    this.onInputCallback = this.onInputCallback.bind(this);
    this.form.addEventListener("input", this.onInputCallback);
  }

  public getFormData(): IDataField[] {
    let formData: IDataField[] = [];

    for (let id in this.virtualForm) {
      formData.push(this.virtualForm[id]);
    }

    return this.virtualForm;
  }

  private initializeVirtualForm(form: HTMLFormElement): void {
    let inputs: any[] = FormParser.getFormInputs(form);
    this.virtualForm = {};

    for (let i = 0; i < inputs.length; i++) {
      let id: string = this.setElementId(inputs[i].input);
      this.virtualForm[id] = {
        name:  inputs[i].input.name,
        value: inputs[i].input.value,
        rules: inputs[i].rules
      }
    }
  }

  private updateVirtualForm(input: HTMLInputElement): any {
    let inputId: string = this.getElementId(input);

    if (!inputId) {
      inputId = this.setElementId(input);
      let rules: IRules = {};
      for (let rule in input.dataset) {
          rules[rule] = input.dataset[rule];
      }
      this.virtualForm[inputId] = {
        name:  input.name,
        value: input.value,
        rules: rules
      }
    } else {
      this.virtualForm[inputId].value = input.value;
    }

    return this.virtualForm[inputId];
  }

  private onInputCallback(e: Event): void {
    let inputData: IDataField = this.updateVirtualForm(e.target as HTMLInputElement);
    this.onInput(inputData, this.getFormData(), e);
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

  // public remove() {
  //   this.form.removeEventListener("input", this.onInputCallback);
  // }

  // private static getFormInputsHavingRules(form: HTMLFormElement): any {
  //   let formData: any[] = [];
  //
  //   for(let i = 0; i < form.elements.length; i++) {
  //     if (form.elements[i].tagName != "INPUT") {
  //       continue;
  //     }
  //
  //     let input: HTMLInputElement = form.elements[i] as HTMLInputElement;
  //     let rules: IRules = {};
  //     let rulesCount: number = 0;
  //     for (let rule in input.dataset) {
  //         rules[rule] = input.dataset[rule];
  //         rulesCount++;
  //     }
  //     if (rulesCount == 0) {
  //       continue;
  //     }
  //     let data: any = {
  //       input: input,
  //       rules: rules
  //     };
  //     formData.push(data);
  //   }
  //
  //   return formData;
  // }
  //
  // public static getFormData(form: HTMLFormElement, currentInput?: HTMLInputElement): IDataField[] {
  //   let formData: IDataField[] = [];
  //
  //   for(let i = 0; i < form.elements.length; i++) {
  //     if (form.elements[i].tagName != "INPUT") {
  //       continue;
  //     }
  //
  //     let input: HTMLInputElement = form.elements[i] as HTMLInputElement;
  //     let rules: IRules = {};
  //     for (let rule in input.dataset) {
  //         rules[rule] = input.dataset[rule];
  //     }
  //     let data: IDataField = {
  //       name:  input.name,
  //       value: input.value,
  //       rules: rules,
  //       isCurrent: form.elements[i] == currentInput,
  //     };
  //     formData.push(data);
  //   }
  //
  //   return formData;
  // }
  //
  // public static getFieldData(input: HTMLInputElement): IDataField {
  //   let rules: IRules = {};
  //
  //   for (let rule in input.dataset) {
  //       rules[rule] = input.dataset[rule];
  //   }
  //
  //   return {
  //     name:  input.name,
  //     value: input.value,
  //     rules: rules
  //   };
  // }
}
