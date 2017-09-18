import {IRules} from './Rules';

export interface IDataField {
  name: string,
  value: string,
  rules: IRules | null,
}

export interface IValidatedField extends IDataField {
  isValid: boolean,
  messages: string[],
}
