import { Suspense, useState } from "react";
import { Routes, Route } from "react-router-dom";
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
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme.jsx";
import { publicRoutes } from "~/routes/index.jsx";
import { ProSidebarProvider } from "react-pro-sidebar";

import "react-toastify/dist/ReactToastify.css";
import "ag-grid-community/styles/ag-grid.min.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.min.css"; // Optional theme CSS

// import Calendar from "./scenes/calendar/calendar";

function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
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
                        <Routes>
                            {publicRoutes.map((route) => {
                                const { path } = route;
                                const Page = route.element;
                                return (
                                    <Route
                                        key={path}
                                        path={path}
                                        element={
                                            <Suspense
                                                fallback={<h1>Loading....</h1>}
                                            >
                                                <Page />
                                            </Suspense>
                                        }
                                    />
                                );
                            })}

                            <Route path="/" element={<Dashboard />} />
                            {/*<Route path="/team" element={<Team />} />*/}
                            {/*<Route path="/contacts" element={<Contacts />} />*/}
                            <Route path="/invoices" element={<Invoices />} />
                            {/*<Route path="/form" element={<Form />} />*/}
                            {/*<Route path="/bar" element={<Bar />} />*/}
                            {/*<Route path="/pie" element={<Pie />} />*/}
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
