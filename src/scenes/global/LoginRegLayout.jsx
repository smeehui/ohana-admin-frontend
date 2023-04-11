import React, {useMemo} from 'react'
import {ColorModeContext, useMode} from "~/theme";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {ProSidebarProvider} from "react-pro-sidebar";
import SidebarCustom from "~/scenes/global/SidebarCustom";
import clsx from "clsx";
import styles from "~/assets/css/GlobalStyles.module.scss";
import Topbar from "~/scenes/global/Topbar";
import {ToastContainer} from "react-toastify";
import {Box} from "@mui/system";
import BreadCrumbs from "~/components/BreadCrumbs";

function LoginRegLayout({children}) {
    const [theme, colorMode] = useMode();
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
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <main className={clsx(styles["content"])}>
                        <Topbar showSearch={false}/>
                        <ToastContainer {...toastOption} />
                        {children}
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default LoginRegLayout
