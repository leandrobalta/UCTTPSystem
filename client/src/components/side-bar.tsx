import {
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from "@mui/material";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import MovingIcon from "@mui/icons-material/Moving";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface Page {
    name: string;
    icon: JSX.Element;
    path: string;
}
interface CustomSideBarProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    pages: Page[];
    navigate: NavigateFunction;
}

function DesktopSideBar(props: CustomSideBarProps) {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 150,
                [`& .MuiDrawer-paper`]: { width: 150, boxSizing: "border-box" },
            }}
            open={props.open}
        >
            <Toolbar />
            <Box sx={{ overflow: "auto" }}>
                <List>
                    {props.pages.map((page) => (
                        <>
                            <ListItem key={page.name} disablePadding>
                                <ListItemButton onClick={() => props.navigate(page.path)}>
                                    <ListItemIcon>{page.icon}</ListItemIcon>
                                    <ListItemText primary={page.name} />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                        </>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
}

export default function SideBar() {
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(true);

    const pages = [{ name: "Viagens", icon: <DirectionsBusIcon />, path: "/travels" }];

    return (
        <>
            <DesktopSideBar open={open} pages={pages} setOpen={setOpen} navigate={navigate} />
        </>
    );
}

export function CustomSideBar() {
    let pages = [{ name: "Reservas", icon: <EventSeatIcon />, path: "/reservations" }];
    if (sessionStorage.getItem("aXNBZG1pbg==") === "ZmxhZ3tuMF92dWxuM3I0YjFsaXRpM3NfaDNyM30=") {
        // append users, buses and control trips to the sidebar
        pages.push({ name: "Ônibus", icon: <DirectionsBusIcon />, path: "/bus" });
        pages.push({ name: "Viagens", icon: <MovingIcon />, path: "/trips" });
        pages.push({ name: "Usuários", icon: <PersonIcon />, path: "/users" });
    }

    const navigate = useNavigate();

    return (
        <>
            <div className="side-bar bg-white">
                <List>
                    {pages.map((page) => (
                        <>
                            <ListItem key={page.name} disablePadding>
                                <ListItemButton onClick={() => navigate(page.path)}>
                                    <ListItemIcon className="justify-center">{page.icon}</ListItemIcon>
                                    <ListItemText primary={page.name} />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                        </>
                    ))}
                </List>
            </div>
            <Divider orientation="vertical" sx={{ height: "100%" }} />
        </>
    );
}
