import {IFieldRules} from './Rules';

export interface IDataField {
  name: string,
  value: string,
  fieldRules: IFieldRules,
}

export interface IValidatedDataField {
  name: string,
  value: string,
  validatedRules: any,
  isValid: boolean
}
