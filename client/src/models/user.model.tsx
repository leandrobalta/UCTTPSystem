import { BaseModel } from "./base.model";

export interface UserModel extends BaseModel {
    name: string;
    email: string;
    password: string | null;
    institutionFk: string;
    userLevel: UserLevel;
}

export enum UserLevel {
    ADMIN = "ADMIN",
    USER = "USER",
}
