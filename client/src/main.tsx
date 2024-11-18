import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AlertUtilsProvider } from "./context/alert-utils.context.tsx";
import { LoadingProvider } from "./hooks/use-loading.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import "dayjs/locale/pt-br";
import { CoursesPage } from "./pages/courses.page.tsx";
import { ProfessorsPage } from "./pages/professors.page.tsx";
import NotFoundPage from "./pages/notfound.page.tsx";
import { DisciplinesPage } from "./pages/disciplines.page.tsx";
import { HomePage } from "./pages/home.page.tsx";
import { UserPage } from "./pages/users.page.tsx";
//import Login from "./pages/login.page.tsx";
//import PrivateRoute from "./components/private-route.tsx";
//import AdminRoute from "./components/admin-route.tsx";
//import { UsersPage } from "./pages/users.page.tsx";

const router = createBrowserRouter([
    // {
    //     path: "/login",
    //     element: <Login />,
    // },
    {
        path: "/",
        element: (
            // <PrivateRoute>
            <App />
            // </PrivateRoute>
        ),
        children: [
            {
                path: "/",
                element: <Navigate to="/home" />,
            },
            {
                path: "/home",
                element: <HomePage />,
            },

            {
                path: "/professors",
                element: <ProfessorsPage />,
            },
            {
                path: "/disciplines",
                element: <DisciplinesPage />,
            },
            {
                path: "/courses",
                element: <CoursesPage />,
            },
            {
                path: "/users",
                element: <UserPage />,
            },
            // ...

            // example of admin page
            // {
            //     path: "/bus",
            //     element: (
            //         <AdminRoute>
            //             <BusPage />
            //         </AdminRoute>
            //     ),
            // },
        ],
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);

export const theme = createTheme({
    palette: {
        primary: {
            main: "#023864",
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode> #! TO AVOID DOUBLE REQUEST TO SERVER
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <ThemeProvider theme={theme}>
            <AlertUtilsProvider>
                <LoadingProvider>
                    <RouterProvider router={router} />
                </LoadingProvider>
            </AlertUtilsProvider>
        </ThemeProvider>
    </LocalizationProvider>
    // </React.StrictMode>,
);
