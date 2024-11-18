import { BaseModel } from "./base.model";

export interface ProfessorModel extends BaseModel {
    registrationNumber: string;
    name: string;
    email: string;
    phone: string;
    title: "Specialist" | "Master" | "Doctor";
    institutionFk: string;
}
