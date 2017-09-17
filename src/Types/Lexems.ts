export interface ILexem {
  name: string;
  target: string;
  hasRules: boolean;
}

export interface ILexSpace{
  [key: string]: ILexem[];
}
