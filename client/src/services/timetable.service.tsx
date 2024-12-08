import { NavigateFunction } from "react-router-dom";
import { ApiService } from "./api.service";
import { HttpMethod } from "../enums/http-method";
import { isHttps, prodPort } from "../utils/endpoint";
import { TimeTableModel } from "../models/timetable.model";

const getTimetable = async (navFunction: NavigateFunction, file: string) => {
    const response = await ApiService.call<any>({
        action: `stp/timetable`,
        method: HttpMethod.POST,
        navFunction,
        port: prodPort,
        https: isHttps,
        body: { content: file },
    });

    return response;
};

export const TimetableService = {
    getTimetable,
};
