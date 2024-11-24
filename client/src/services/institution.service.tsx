import { NavigateFunction } from "react-router-dom";
import { ApiService } from "./api.service";
import { HttpMethod } from "../enums/http-method";
import { InstitutionModel } from "../models/institution.model";
import { isHttps, prodPort } from "../utils/endpoint";

interface InstitutionDTO {
    Sigla: string;
    Name: string;
    Id?: number;
}

const getInstitutionById = async (navFunction: NavigateFunction, id: string) => {
    const response = await ApiService.call<InstitutionModel>({
        action: `stp/institution/${id}`,
        method: HttpMethod.GET,
        navFunction,
        port: prodPort,
        https: isHttps,
    });

    return response;
};

const getAllInstitutions = async (navFunction: NavigateFunction) => {
    const response = await ApiService.call<InstitutionModel[]>({
        action: "stp/institutions",
        method: HttpMethod.GET,
        navFunction,
        port: prodPort,
        https: isHttps,
    });

    return response;
};

const addInstitution = async (navFunction: NavigateFunction, institution: InstitutionModel) => {
    const response = await ApiService.call<any>({
        action: "stp/institution",
        method: HttpMethod.POST,
        navFunction,
        port: prodPort,
        body: institution,
        https: isHttps,
    });

    return response;
};

const updateInstitution = async (navFunction: NavigateFunction, institution: InstitutionModel, id: string) => {
    const response = await ApiService.call<any>({
        action: `stp/institution/${id}`,
        method: HttpMethod.PUT,
        navFunction,
        port: prodPort,
        body: institution,
        https: isHttps,
    });

    return response;
};

const deleteInstitution = async (navFunction: NavigateFunction, institution: InstitutionModel) => {
    const response = await ApiService.call<any>({
        action: `stp/institution/${institution.sigla}`,
        method: HttpMethod.DELETE,
        navFunction,
        port: prodPort,
        https: isHttps,
    });

    return response;
};

export const InstitutionService = {
    getInstitutionById,
    getAllInstitutions,
    addInstitution,
    updateInstitution,
    deleteInstitution,
};
