export type LoginState = {
    isLoggedIn: boolean,
    login: SessionData | null,
};

export enum Roles {
    ROLE_USER = 'ROLE_USER',
    ROLE_ADMIN = 'ROLE_ADMIN',
}

export interface SessionData {
    firstName: string;
    lastName: string;
    emailId: string;
    user: string;
    responseStatus: number;
    phoneNumber:string;
    role:Roles;
    userId:number;
    // serverTime: Date;
    // photo: string;
    // signature: string;
    // providerUuid: string;
    // name: string,
    // uuid: string,
}

export interface LoginFormValues {
    username: string,
    password: string,
}
