import {IRules} from './Rules';

export interface IDataField {
  name: string,
  value: string,
  rules: IRules | null,
  isCurrent: boolean;
}

export interface IValidatedField extends IDataField {
  isValid: boolean,
  messages: string[],
}

export interface IValidatedDataField {
  isValid: boolean,
  messages: string[],
}

// export interface IFormFields {
//   current: IDataField,
//   other: IDataField[]
// }
