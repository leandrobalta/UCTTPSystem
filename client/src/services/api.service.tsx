import { NavigateFunction } from "react-router-dom";
import { endpoint } from "../utils/endpoint";
import { Envelope } from "../models/envelope.model";

interface CallProps extends RequestInit {
    action: string;
    navFunction: NavigateFunction;
    port?: string;
    body?: any;
    noAuth?: boolean;
    customEndpoint?: string;
    https?: boolean;
    customAuthorization?: boolean;
}

async function call<T>(props: CallProps): Promise<Envelope<T>> {
    try {
        const url = `${props.https ? "https" : "http"}://${props.customEndpoint ? props.customEndpoint : endpoint}${
            props.port ? ":" + props.port : ""
        }/${props.action}`;

        let headers: HeadersInit | undefined = undefined;

        headers = { ...props.headers, "Content-Type": "application/json" };

        const response = await fetch(url, {
            method: props.method,
            headers,
            body: JSON.stringify(props.body),
        });


        if (response.status === 401) {
            props.navFunction("/login");
            //await UserService.logout(props.navFunction);
            return { success: false, message: "Não autorizado. Por favor faça login novamente" , data: null } as Envelope<T>;
        }

        return (await response.json()) as Envelope<T>;

    } catch (error : any) {
        return { success: false, message: "Erro desconhecido. Se o problema persistir faça Logout e Login novamente. " + error, data: null} as Envelope<T>;
    }
}

export const ApiService = {
    call,
};
