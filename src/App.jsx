import { Suspense, useMemo, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Breadcrumbs, CssBaseline, Link, ThemeProvider } from "@mui/material";

import Topbar from "./scenes/global/Topbar";
import SidebarCustom from "./scenes/global/SidebarCustom";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { ColorModeContext, useMode } from "./theme.jsx";
import { publicRoutes } from "~/routes/index.jsx";
import { ProSidebarProvider } from "react-pro-sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { NavigateNext } from "@mui/icons-material";
import { Box } from "@mui/system";

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

    const paths = useLocation().pathname.substring(1).split("/");
    const navigate = useNavigate();

    const onClick = useMemo(
        () => (e, index) => {
            e.preventDefault();
            const currentPath = paths
                .filter((path, i) => i <= index)
                .reduce((acc, curr) => acc + "/" + curr, "");
            navigate(currentPath);
        },
        [paths],
    );

    const breadcrumbs = paths.map((path, index) => (
        <Link
            underline="hover"
            sx={{ cursor: "pointer" }}
            key={index}
            color="inherit"
            onClick={(e) => onClick(e, index)}
        >
            {path}
        </Link>
    ));

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <ProSidebarProvider>
                        <SidebarCustom isSidebar={isSidebar} />
                    </ProSidebarProvider>
                    <main className="content">
                        <Topbar setIsSidebar={setIsSidebar} />
                        <ToastContainer {...toastOption} />
                        <Box
                            flex={1}
                            display="flex"
                            justifyContent="flex-start"
                            paddingLeft={2}
                            marginY={2}
                        >
                            <Breadcrumbs
                                separator={<NavigateNext fontSize="small" />}
                                aria-label="breadcrumb"
                            >
                                {breadcrumbs}
                            </Breadcrumbs>
                        </Box>

                        <Routes>
                            {publicRoutes.map((route) => {
                                const { path } = route;
                                const Page = route.element;
                                return (
                                    <Route
                                        key={path}
                                        path={path}
                                        element={<Page />}
                                    />
                                );
                            })}

                            <Route path="/" element={<Dashboard />} />
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
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
