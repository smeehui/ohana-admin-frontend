import {useContext, useMemo, useState} from "react";
import {Route, Routes} from "react-router-dom";
import {useMode} from "./theme.jsx";
import {publicRoutes} from "~/routes/index.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import {AppContext} from "~/store";
import LoginRegLayout from "~/scenes/global/LoginRegLayout";
import Login from "~/pages/Login/Login";

function App() {
    const [state] = useContext(AppContext);
    return (
        <>
            <Routes>
                {   state.admin.token &&
                    state.admin.token.length!==0?
                     publicRoutes.map((route) => {
                        const {path} = route;
                        const Page = route.element;
                        const Layout = route.layout ? route.layout : null
                        const Context = route.context ? route.context : null
                        return (
                            <Route
                                key={path}
                                path={path}
                                element={<Layout>{!!Context? <Context><Page/></Context>: <Page/>}</Layout>}
                            />
                        );
                    })
                    : <Route path={"*"} element={<LoginRegLayout><Login/></LoginRegLayout>}/>
                }
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
