export interface IRules {
    [key: string]: string;
}

export interface IUserRules {
    [key: string]: IUserRule;
}

export interface IUserRule {
    [key: string]: any;
}
