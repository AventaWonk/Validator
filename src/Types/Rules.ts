import {ILexem} from './Lexems';

export interface IFieldRules {
  [key: string]: string;
}

export interface IUserRules {
  [key: string]: IUserRule;
}

export interface IUserRule {
  [key: string]: any;
}

export interface INormalizedRule {
  lexem: ILexem;
  value: string;
}

export interface INormalizedRules {
  [key: string]: INormalizedRule;
}
