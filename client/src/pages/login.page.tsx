import React, { useEffect } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAlert, useSnackbar } from "../hooks/use-alert-utils";
import { UserService } from "../services/user.service";
import china_tur_title from "../assets/chinatur-title-cropped.png";
import { ClientService } from "../services/discipline.service";

export default function Login() {
    const navigate = useNavigate();
    const { snackbar } = useSnackbar();
    const { simpleAlert } = useAlert();

    const [loading, setLoading] = React.useState<boolean>(false);
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");

    const handleLogin = async () => {
        setLoading(true);
        try {
            if (email === "") {
                snackbar({
                    message: "Email Incorreto. Não pode ser nulo.",
                    severity: "error",
                    delay: 5000,
                });
                return;
            }

            if (password === "") {
                snackbar({
                    message: "Senha Incorreta. Não pode ser nulo.",
                    severity: "error",
                    delay: 5000,
                });
                return;
            }

            const response = await UserService.login(navigate, email, password);

            snackbar({
                message: response.message,
                severity: response.success ? "success" : "error",
                delay: 5000,
            });

            if (response.data?.token === null) {
                snackbar({
                    message: "Token de autorização não encontrado.",
                    severity: "error",
                    delay: 5000,
                });
                return;
            }

            sessionStorage.setItem("token", response.data!.token!);
            sessionStorage.setItem("name", response.data!.name!);

            if (response.data?.isAdmin) {
                // aXNBZG1pbg== is "isAdmin" to base64
                sessionStorage.setItem("aXNBZG1pbg==", response.data!.isAdmin!);
            }

            const birthdaysResp = await ClientService.getBirthdays(navigate);

            if (birthdaysResp.data?.length !== undefined && birthdaysResp.data?.length > 0) {
                simpleAlert({
                    title: "ANIVERSARIANTES DO DIA (POR FAVOR LEIA)",
                    description: birthdaysResp.data
                        .map(
                            (b) =>
                                `${b.clientName} - ${b.phoneNumber} - ${
                                    new Date(b.dateOfBirth).toLocaleString("pt-BR").split(",")[0]
                                }`
                        )
                        .join("\n"),
                });
            }

            navigate("/");
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (evt: React.KeyboardEvent<any>) => {
        if (evt.key === "Enter") {
            handleLogin();
        }
    };

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            sessionStorage.removeItem("token");
        }

        if (sessionStorage.getItem("aXNBZG1pbg==")) {
            sessionStorage.removeItem("aXNBZG1pbg==");
        }
    }, []);

    return (
        <div className="flex justify-start items-center flex-col gap-4 bg h-full" onKeyDown={handleKeyDown}>
            {/* <img className="max-h-60 max-w-sm" src={easylogo} alt="" /> */}
            <img src={china_tur_title} className="h-40 my-8" />
            <div className="flex flex-col gap-4 max-md:w-11/12">
                <TextField
                    autoFocus
                    disabled={loading}
                    label="Email"
                    //error={email === "" || !email.includes("@ezaccess.com.br")}
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    disabled={loading}
                    label="Senha"
                    type="password"
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" onClick={(_evt) => handleLogin()} disabled={loading} sx={{ gap: "1rem" }}>
                    {loading ? <CircularProgress size={20} /> : "Entrar"}
                </Button>
            </div>
            <div className="flex flex-row justify-between w-full mt-auto px-4">
                <b>v1.9</b>
                <b>
                    Developed by{" "}
                    <a
                        href="https://github.com/leandrobalta"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                        leandrobalta
                    </a>
                </b>
            </div>
        </div>
    );
}
