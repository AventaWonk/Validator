import {IValidatedField} from '../Types/Fields';

export default interface IValidationResult {
  isValid: boolean;
  getAll(): IValidatedField[];
  // getValid(): IValidatedField;
  // getNotValid(): IValidatedField;
}
