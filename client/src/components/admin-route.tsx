import { Navigate } from "react-router-dom";
import { useSnackbar } from "../hooks/use-alert-utils";

export default function AdminRoute({ children }: { children: React.ReactNode }) {
    const { snackbar } = useSnackbar();
    
    const isAdmin = sessionStorage.getItem("aXNBZG1pbg==");

    if (!isAdmin || isAdmin !== "ZmxhZ3tuMF92dWxuM3I0YjFsaXRpM3NfaDNyM30=") {
        snackbar({
            message: "Você não tem permissão para acessar essa página. Essa tentativa sera registrada.",
            severity: "error",
            delay: 10000,
        })
        return <Navigate to="/login" />;
    }

    return children;
}