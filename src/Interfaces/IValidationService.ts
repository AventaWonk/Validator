import {IDataField, IValidatedDataField} from '../Types/Fields';
import {IUserRules} from '../Types/Rules';

export default interface IValidator {
  validateField(currentField: IDataField, allFields: IDataField[], rules: IUserRules): IValidatedDataField;
}
