import { Navigate } from "react-router-dom";
import { useSnackbar } from "../hooks/use-alert-utils";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { snackbar } = useSnackbar();
    
    const token = sessionStorage.getItem("token");

    if (!token || token !== "ZmxhZ3tuMWMzX2J1dF90aDR0X20zNG5zX24wdGgxbmdfczBycnl9") {
        snackbar({
            message: "Você precisa estar logado para acessar essa página. Essa tentativa sera registrada.",
            severity: "error",
            delay: 10000,
        })
        return <Navigate to="/login" />;
    }

    return children;
}