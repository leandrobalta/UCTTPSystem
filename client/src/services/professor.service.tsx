import { NavigateFunction } from "react-router-dom";
import { ApiService } from "./api.service";
import { HttpMethod } from "../enums/http-method";
import { ProfessorModel } from "../models/professor.model";
import { isHttps, prodPort } from "../utils/endpoint";

interface ProfessorDTO {
    Id?: number;
    RegistrationNumber: string;
    Name: string;
    Email: string;
    Phone: string;
    Title: string;
    InstitutionFk: string;
}

const getProfessorById = async (navFunction: NavigateFunction, registrationNumber: string) => {
    const response = await ApiService.call<ProfessorModel>({
        action: `stp/professor/${registrationNumber}`,
        method: HttpMethod.GET,
        navFunction,
        port: prodPort,
        https: isHttps,
    });

    return response;
};

const getAllProfessors = async (navFunction: NavigateFunction) => {
    const response = await ApiService.call<ProfessorModel[]>({
        action: "stp/professors",
        method: HttpMethod.GET,
        navFunction,
        port: prodPort,
        https: isHttps,
    });

    return response;
};

const addProfessor = async (navFunction: NavigateFunction, professor: ProfessorModel) => {

    const response = await ApiService.call<any>({
        action: "stp/professor",
        method: HttpMethod.POST,
        navFunction,
        port: prodPort,
        body: professor,
        https: isHttps,
    });

    return response;
};

const updateProfessor = async (navFunction: NavigateFunction, professor: ProfessorModel, id: string) => {

    const response = await ApiService.call<any>({
        action: "stp/professor/" + id,
        method: HttpMethod.PUT,
        navFunction,
        port: prodPort,
        body: professor,
        https: isHttps,
    });

    return response;
};

const deleteProfessor = async (navFunction: NavigateFunction, professor: ProfessorModel) => {
    const response = await ApiService.call<any>({
        action: `stp/professor/${professor.registrationNumber}`,
        method: HttpMethod.DELETE,
        navFunction,
        port: prodPort,
        https: isHttps,
    });

    return response;
};

export const ProfessorService = {
    getProfessorById,
    getAllProfessors,
    addProfessor,
    updateProfessor,
    deleteProfessor,
};
