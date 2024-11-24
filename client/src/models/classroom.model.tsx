import { BaseModel } from "./base.model";

export interface ClassroomModel extends BaseModel {
    name: string;
    institutionFk: string;
}
