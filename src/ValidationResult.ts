import {IValidatedField, IDataField} from "./Types/Fields";
import IValidationResult from "./Interfaces/IValidationResult";

export default class ValidationResult implements IValidationResult{
  private data: IValidatedField[];

  constructor(data: IValidatedField[]) {
    this.data = data;
  }

  public get isValid(): boolean {
    return this.fastCheck();
  }

  public getValidsCount(): number {
    return this.data.filter(item => item.isValid).length;
  }

  public getNotValidsCount(): number {
    return this.data.filter(item => !item.isValid).length;
  }

  public getValid(): IDataField[] {
    let validData: IDataField[] = [];
    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].isValid) {
        validData.push(this.data[i]);
        // delete validData[validData.length - 1].isValid;
      }
    }
    return validData;
  }

  public getNotValid(): IDataField[] {
    let notValidData = [];
    for (var i = 0; i < this.data.length; i++) {
      if (!this.data[i].isValid) {
        notValidData.push(this.data[i]);
        delete notValidData[notValidData.length - 1].isValid;
      }
    }
    return notValidData;
  }

  public getAll(): IValidatedField[] {
    return this.data;
  }

  private fastCheck(): boolean {
    for (let i = 0; i < this.data.length; i++) {
      if (!this.data[i].isValid) {
        return false;
      }
    }
    return true;
  }
}
