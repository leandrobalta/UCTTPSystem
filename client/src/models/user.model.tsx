import { BaseModel } from "./base.model";

export interface UserModel extends BaseModel {
    userName: string;
    email: string;
    password: string | null;
    isAdmin: boolean;
}