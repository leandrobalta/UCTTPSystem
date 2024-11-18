import { NavigateFunction } from "react-router-dom";
import { ApiService } from "./api.service";
import { HttpMethod } from "../enums/http-method";
import { CourseModel } from "../models/course.model";
import { isHttps, prodPort } from "../utils/endpoint";

interface CourseDTO {
    Id?: number;
    Code: string;
    Name: string;
    Duration: number;
    Description: string;
    InstitutionFk: string;
}

const getCourseById = async (navFunction: NavigateFunction, code: string) => {
    const response = await ApiService.call<CourseModel>({
        action: `stp/course/${code}`,
        method: HttpMethod.GET,
        navFunction,
        port: prodPort,
        https: isHttps,
    });

    return response;
};

const getAllCourses = async (navFunction: NavigateFunction) => {
    const response = await ApiService.call<CourseModel[]>({
        action: "stp/courses",
        method: HttpMethod.GET,
        navFunction,
        port: prodPort,
        https: isHttps,
    });

    return response;
};

const addCourse = async (navFunction: NavigateFunction, course: CourseModel) => {
    const response = await ApiService.call<any>({
        action: "stp/course",
        method: HttpMethod.POST,
        navFunction,
        port: prodPort,
        body: course,
        https: isHttps,
    });

    return response;
};

const updateCourse = async (navFunction: NavigateFunction, course: CourseModel, id: string) => {
    const response = await ApiService.call<any>({
        action: "stp/course/" + id,
        method: HttpMethod.PUT,
        navFunction,
        port: prodPort,
        body: course,
        https: isHttps,
    });

    return response;
};

const deleteCourse = async (navFunction: NavigateFunction, course: CourseModel) => {
    const response = await ApiService.call<any>({
        action: `stp/course/${course.code}`,
        method: HttpMethod.DELETE,
        navFunction,
        port: prodPort,
        https: isHttps,
    });

    return response;
};

export const CourseService = {
    getCourseById,
    getAllCourses,
    addCourse,
    updateCourse,
    deleteCourse,
};
