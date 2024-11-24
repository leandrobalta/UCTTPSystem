import { NavigateFunction } from "react-router-dom";
import { ApiService } from "./api.service";
import { HttpMethod } from "../enums/http-method";
import { ClassroomModel } from "../models/classroom.model";
import { isHttps, prodPort } from "../utils/endpoint";

interface ClassroomDTO {
    Id?: number;
    Name: string;
    InstitutionFk: string;
}

const getClassroomById = async (navFunction: NavigateFunction, id: number) => {
    const response = await ApiService.call<ClassroomModel>({
        action: `stp/classroom/${id}`,
        method: HttpMethod.GET,
        navFunction,
        port: prodPort,
        https: isHttps,
    });

    return response;
};

const getAllClassrooms = async (navFunction: NavigateFunction) => {
    const response = await ApiService.call<ClassroomModel[]>({
        action: "stp/classrooms",
        method: HttpMethod.GET,
        navFunction,
        port: prodPort,
        https: isHttps,
    });

    return response;
};

const addClassroom = async (navFunction: NavigateFunction, classroom: ClassroomModel) => {
    const response = await ApiService.call<any>({
        action: "stp/classroom",
        method: HttpMethod.POST,
        navFunction,
        port: prodPort,
        body: classroom,
        https: isHttps,
    });

    return response;
};

const updateClassroom = async (
    navFunction: NavigateFunction,
    classroom: ClassroomModel,
    id: number
) => {
    const response = await ApiService.call<any>({
        action: `stp/classroom/${id}`,
        method: HttpMethod.PUT,
        navFunction,
        port: prodPort,
        body: classroom,
        https: isHttps,
    });

    return response;
};

const deleteClassroom = async (navFunction: NavigateFunction, classroom: ClassroomModel) => {
    const response = await ApiService.call<any>({
        action: `stp/classroom/${classroom.id}`,
        method: HttpMethod.DELETE,
        navFunction,
        port: prodPort,
        https: isHttps,
    });

    return response;
};

export const ClassroomService = {
    getClassroomById,
    getAllClassrooms,
    addClassroom,
    updateClassroom,
    deleteClassroom,
};
