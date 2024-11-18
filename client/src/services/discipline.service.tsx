import { NavigateFunction } from "react-router-dom";
import { ApiService } from "./api.service";
import { HttpMethod } from "../enums/http-method";
import { DisciplineModel } from "../models/discipline.model";
import { isHttps, prodPort } from "../utils/endpoint";

interface DisciplineDTO {
    Id?: number;
    Code: string;
    Name: string;
    Workload: number;
    Period: number;
    Description: string;
    CourseCode: string;
    InstitutionFk: string;
}

const getDisciplineById = async (navFunction: NavigateFunction, code: string) => {
    const response = await ApiService.call<DisciplineModel>({
        action: `stp/discipline/${code}`,
        method: HttpMethod.GET,
        navFunction,
        port: prodPort,
        https: isHttps,
    });

    return response;
};

const getAllDisciplines = async (navFunction: NavigateFunction) => {
    const response = await ApiService.call<DisciplineModel[]>({
        action: "stp/disciplines",
        method: HttpMethod.GET,
        navFunction,
        port: prodPort,
        https: isHttps,
    });

    return response;
};

const addDiscipline = async (navFunction: NavigateFunction, discipline: DisciplineModel) => {

    const response = await ApiService.call<any>({
        action: "stp/discipline",
        method: HttpMethod.POST,
        navFunction,
        port: prodPort,
        body: discipline,
        https: isHttps,
    });

    return response;
};

const updateDiscipline = async (navFunction: NavigateFunction, discipline: DisciplineModel, id: string) => {

    const response = await ApiService.call<any>({
        action: "stp/discipline/" + id,
        method: HttpMethod.PUT,
        navFunction,
        port: prodPort,
        body: discipline,
        https: isHttps,
    });

    return response;
};

const deleteDiscipline = async (navFunction: NavigateFunction, discipline: DisciplineModel) => {
    const response = await ApiService.call<any>({
        action: `stp/discipline/${discipline.code}`,
        method: HttpMethod.DELETE,
        navFunction,
        port: prodPort,
        https: isHttps,
    });

    return response;
};

// const addManyDisciplines = async (navFunction: NavigateFunction, disciplines: DisciplineModel[]) => {
//     const customBody: DisciplineDTO[] = disciplines.map((discipline) => ({
//         Code: discipline.code,
//         Name: discipline.name,
//         Workload: discipline.workload,
//         Period: discipline.period,
//         Description: discipline.description,
//         CourseCode: discipline.courseCode,
//         InstitutionFk: discipline.institutionFk,
//     }));

//     const response = await ApiService.call<any>({
//         action: "stp/discipline",
//         method: HttpMethod.POST,
//         navFunction,
//         port: prodPort,
//         body: customBody,
//         https: isHttps,
//     });

//     return response;
// };

export const DisciplineService = {
    getDisciplineById,
    getAllDisciplines,
    addDiscipline,
    updateDiscipline,
    deleteDiscipline,
    //addManyDisciplines,
};
