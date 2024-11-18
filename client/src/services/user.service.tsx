import { NavigateFunction } from "react-router-dom";
import { ApiService } from "./api.service";
import { HttpMethod } from "../enums/http-method";
import { UserModel } from "../models/user.model";
import { isHttps, prodPort } from "../utils/endpoint";

const login = async (navFunction: NavigateFunction, email: string, password: string) => {
    const response = await ApiService.call<any>({
        action: "api/User/Login",
        method: HttpMethod.POST,
        navFunction,
        port: prodPort,
        body: { Email: email, Password: password },
        https: isHttps,
    });

    return response;
};

const logout = async (navFunction: NavigateFunction) => {
    const response = await ApiService.call<undefined>({
        action: "api/User/Logout",
        method: HttpMethod.GET,
        navFunction,
        port: prodPort,
        https: isHttps,
    });

    return response;
};

const getUserById = async (navFunction: NavigateFunction, email: string) => {
    const response = await ApiService.call<UserModel>({
        action: `stp/user/${email}`,
        method: HttpMethod.GET,
        navFunction,
        port: prodPort,
        https: isHttps,
    });
    return response;
};

const getAllUsers = async (navFunction: NavigateFunction) => {
    const response = await ApiService.call<UserModel[]>({
        action: "stp/users",
        method: HttpMethod.GET,
        navFunction,
        port: prodPort,
        https: isHttps,
    });
    return response;
};

const addUser = async (navFunction: NavigateFunction, user: UserModel) => {
    const response = await ApiService.call<any>({
        action: "stp/user",
        method: HttpMethod.POST,
        navFunction,
        body: user,
        port: prodPort,
        https: isHttps,
    });
    return response;
};

const updateUser = async (navFunction: NavigateFunction, user: UserModel, email: string) => {
    const response = await ApiService.call<any>({
        action: "stp/user/" + email,
        method: HttpMethod.PUT,
        navFunction,
        body: user,
        port: prodPort,
        https: isHttps,
    });
    return response;
};

const deleteUser = async (navFunction: NavigateFunction, user: UserModel) => {
    const response = await ApiService.call<any>({
        action: `stp/user/${user.email}`,
        method: HttpMethod.DELETE,
        navFunction,
        port: prodPort,
        https: isHttps,
    });
    return response;
};

export const UserService = {
    login,
    logout,
    getUserById,
    getAllUsers,
    addUser,
    updateUser,
    deleteUser,
};
