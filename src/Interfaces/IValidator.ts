import {IDataField} from '../Types/Fields';
import {IUserRules} from '../Types/Rules';
import IValidationResult from './IValidationResult';

export default interface IValidator {
  validate(data: IDataField[], rules: IUserRules): IValidationResult;
  validateField(currentField: IDataField, data: IDataField[], rules: IUserRules): IValidationResult;
}
