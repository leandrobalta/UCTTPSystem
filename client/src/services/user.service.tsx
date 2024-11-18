import { NavigateFunction } from "react-router-dom";
import { ApiService } from "./api.service";
import { HttpMethod } from "../enums/http-method";
import { UserModel } from "../models/user.model";
import { isHttps, prodPort } from "../utils/endpoint";

interface LoginResponse {
    isAdmin?: string;
    token: string;
    name: string
}

interface UserDTO {
    Id?: number;
    Username?: string;
    Email: string;
    Password: string | null;
    IsAdmin?: boolean;
    Name?: string;
}

const login = async (navFunction: NavigateFunction, email: string, password: string) => {

    const response = await ApiService.call<LoginResponse>(
        {
            action: "api/User/Login",
            method: HttpMethod.POST,
            navFunction,
            port: prodPort,
            body: { Email: email, Password: password},
            noAuth: true,
            https: isHttps,
        }
    )
    
    return response;

}

const logout = async (navFunction: NavigateFunction) => {
    const response = await ApiService.call<undefined>(
        {
            action: "api/User/Logout",
            method: HttpMethod.GET,
            navFunction,
            port: prodPort,
            noAuth: true,
            https: isHttps,
        }
    )
    
    return response;
}

const getAllUsers = async (navFunction: NavigateFunction) => {
    const response = await ApiService.call<UserModel[]>(
        {
            action: "api/User",
            method: HttpMethod.GET,
            navFunction,
            port: prodPort,
            https: isHttps,
        }
    )

    return response;
}

const addUser = async (navFunction: NavigateFunction, user: UserModel) => {
    const customBody: UserDTO = {
        Email: user.email,
        Password: user.password !== null ? user.password : null,
        IsAdmin: user.isAdmin,
        Username: user.userName,
    }

    if (sessionStorage.getItem("name") !== null) {
        customBody.Name = sessionStorage.getItem("name")!;
    }
    
    const response = await ApiService.call<any>(
        {
            action: "api/User/Add",
            method: HttpMethod.POST,
            navFunction,
            port: prodPort,
            body: customBody,
            https: isHttps,
        }
    )

    return response;
}

const updateUser = async (navFunction: NavigateFunction, user: UserModel) => {

    const customBody: UserDTO = {
        Id: user.id,
        Email: user.email,
        Password: user.password !== null ? user.password : null,
        IsAdmin: user.isAdmin,
        Username: user.userName,
    }

    if (sessionStorage.getItem("name") !== null) {
        customBody.Name = sessionStorage.getItem("name")!;
    }
    
    const response = await ApiService.call<any>(
        {
            action: "api/User/Update",
            method: HttpMethod.PUT,
            navFunction,
            port: prodPort,
            body: customBody,
            https: isHttps,
        }
    )

    return response;
}

const deleteUser = async (navFunction: NavigateFunction, user: UserModel) => {
    
    const response = await ApiService.call<any>(
        {
            action: "api/User/Delete/" + user.id,
            method: HttpMethod.DELETE,
            navFunction,
            port: prodPort,
            https: isHttps,
        }
    )

    return response;
}

export const UserService = {
    login,
    logout,
    getAllUsers,
    addUser,
    updateUser,
    deleteUser,
};