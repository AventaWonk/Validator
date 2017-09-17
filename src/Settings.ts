import {ILexSpace} from './Types/Lexems';

export const lexSpace: ILexSpace = {
  "vl": [
    {
      name: "Rule",
      target: "self",
      hasRules: true,
    },
    {
      name: "Repeat",
      target: "all",
      hasRules: false
    }
  ],
  "vlm": [
    {
      name: "Rule",
      target: "all",
      hasRules: true,
    },
  ],
};
