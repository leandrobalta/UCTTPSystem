import "./App.css";
import { LoadingPage } from "./components/loading";
import { useLoading } from "./hooks/use-loading";
import { Outlet } from "react-router-dom";
import BasePage from "./components/base";

function App() {
    const { loading } = useLoading();

    return (
        <div className="App">
            {/* <Header />
            <div className="flex flex-row h-full">
                <CustomSideBar />
                <Outlet />
            </div> */}
            <BasePage>
                <div className="Main">
                    {/* <img src={chinaBg} className="chinatur-bg" /> */}
                    <Outlet />
                </div>
            </BasePage>
            <LoadingPage show={loading} />
        </div>
    );
}

export default App;
