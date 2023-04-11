import {useMemo, useState} from "react";
import {Route, Routes} from "react-router-dom";
import {useMode} from "./theme.jsx";
import {publicRoutes} from "~/routes/index.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const toastOption = useMemo(() => {
        return {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: theme.palette.mode,
        };
    }, []);

    return (
        <>
            <Routes>
                {publicRoutes.map((route) => {
                    const {path} = route;
                    const Page = route.element;
                    const Layout = route.layout ? route.layout : null
                    return (
                        <Route
                            key={path}
                            path={path}
                            element={<Layout><Page/></Layout>}
                        />
                    );
                })}
                {/*<Route path="/" element={<Dashboard />} />*/}
                {/*<Route path="/team" element={<Team />} />*/}
                {/* <Route path="/contacts" element={<Contacts />} /> */}
                {/* <Route path="/invoices" element={<Invoices />} /> */}
                {/*<Route path="/form" element={<Form />} />*/}
                {/* <Route path="/bar" element={<Bar />} /> */}
                {/* <Route path="/pie" element={<Pie />} /> */}
                {/*<Route path="/line" element={<Line />} />*/}
                {/*<Route path="/faq" element={<FAQ />} />*/}
                {/*<Route path="/calendar" element={<Calendar />} />*/}
                {/*<Route path="/geography" element={<Geography />} />*/}
            </Routes>
        </>
    );
}

export default App;
