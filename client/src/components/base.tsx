import * as React from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { Button, Drawer } from "@mui/material";
import { useConfirm } from "../hooks/use-alert-utils";
import { UserService } from "../services/user.service";
import { useSnackbar } from "../hooks/use-alert-utils";
import { useLoading } from "../hooks/use-loading";
import LogoutIcon from "@mui/icons-material/Logout";

// check if is mobile to set drawnerWidth
const drawerWidth = window.innerWidth > 768 ? 180 : 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: 0,
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
    width: `calc(100% - ${drawerWidth}px)`,
    height: "100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "105% 110%",
    backgroundAttachment: "fixed",
    backgroundSize: "20rem 20rem",

    // set background brightness to 0.5 without use filter
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
}));

export default function BasePage({ children }: any) {
    const navigate = useNavigate();
    const { confirm } = useConfirm();
    const { snackbar } = useSnackbar();
    const { setLoading } = useLoading();

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

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

    let pages = [{ name: "Professores", icon: <PersonIcon />, path: "/professors" }];
    pages.push({ name: "Disciplinas", icon: <PersonIcon />, path: "/disciplines" });
    pages.push({ name: "Cursos", icon: <PersonIcon />, path: "/courses" });
    pages.push({ name: "Usuários", icon: <PersonIcon />, path: "/users" });

    // POG for admin pages
    // if (sessionStorage.getItem("aXNBZG1pbg==") === "ZmxhZ3tuMF92dWxuM3I0YjFsaXRpM3NfaDNyM30=") {
    //     // append users, buses and control trips to the sidebar
    //     pages.push({ name: "Ônibus", icon: <DirectionsBusIcon />, path: "/bus" });
    //     pages.push({ name: "Usuários", icon: <PersonIcon />, path: "/users" });
    // }

    return (
        <Box sx={{ display: "flex", width: "100%" }}>
            <CssBaseline />
            <AppBar position="absolute" open={window.innerWidth > 600 ? open : undefined}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: "none" }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {/* <img src={china_tur_white_title} className="h-10" /> */}
                        UCTTPSystem
                    </Typography>
                    {/** add logout buttom at the right of the page */}
                    <div style={{ marginLeft: "auto" }}>
                        <Button variant="outlined" color="inherit" onClick={handleLogout} disabled>
                            LOGOUT
                            <LogoutIcon className="ml-4" />
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
            {window.innerWidth < 768 && <Drawer variant="persistent" sx={{ width: drawerWidth }} />}
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
                variant={window.innerWidth > 768 ? "persistent" : "temporary"}
                anchor="left"
                open={open}
                onClose={handleDrawerClose}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {pages.map((page) => (
                        <>
                            <ListItem key={page.name} disablePadding>
                                <ListItemButton onClick={() => navigate(page.path)}>
                                    <ListItemIcon className="justify-center">{page.icon}</ListItemIcon>
                                    <ListItemText primary={page.name} />
                                </ListItemButton>
                            </ListItem>
                        </>
                    ))}
                </List>
            </Drawer>
            <Main open={window.innerWidth > 600 ? open : undefined}>
                <DrawerHeader />
                {children}
            </Main>
        </Box>
    );
}
