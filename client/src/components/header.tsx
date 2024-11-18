import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useConfirm } from "../hooks/use-alert-utils";
import LogoutIcon from "@mui/icons-material/Logout";
import { UserService } from "../services/user.service";
import { useSnackbar } from "../hooks/use-alert-utils";
import { useLoading } from "../hooks/use-loading";

export default function Header() {
    const navigate = useNavigate();
    const { confirm } = useConfirm();
    const { snackbar } = useSnackbar();
    const { setLoading } = useLoading();

    const handleLogout = (_evt: any) => {
        confirm({
            title: "Logout",
            description: "Você realmente deseja sair?",
            handleConfirm: async () => {
                setLoading(true);
                const response = await UserService.logout(navigate);

                snackbar({
                    message: response.message,
                    severity: response.success ? "success" : "error",
                    delay: 5000,
                });

                navigate("/login");
                setLoading(false);
            },
        });
    };

    return (
        <header className="bg-[#90EE90] text-white flex justify-center">
            <div className="flex items-center justify-between flex-row h-full w-[98%]">
                <div className="flex flex-row items-center gap-4">
                    <Typography variant="h5" noWrap component="div" sx={{ margin: "0" }} onClick={() => navigate("/")}>
                        China Tur
                    </Typography>
                    {/* <Box sx={{ display: { xs: "none", sm: "block" } }}>
                        {pages.map((item) => (
                            <Button key={item} sx={{ color: "#fff" }} onClick={handleChangePage}>
                                {item}
                            </Button>
                        ))}
                    </Box> */}
                </div>
                <div className="flex flex-row items-center gap-4">
                    <Button variant="outlined" color="inherit" onClick={handleLogout}>
                        LOGOUT
                        <LogoutIcon className="ml-4" />
                    </Button>
                </div>
            </div>
        </header>
    );
}
