import { BaseModel } from "./base.model";

export interface DisciplineModel extends BaseModel {
    code: string;
    name: string;
    workload: number;
    period: number;
    description: string;
    courseCode: string;
    institutionFk: string;

}
