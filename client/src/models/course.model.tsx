import { BaseModel } from "./base.model";

export interface CourseModel extends BaseModel {
    code: string;
    name: string;
    duration: number;
    description: string;
    institutionFk: string;
}
