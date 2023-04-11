import {useMemo, useState} from "react";
import {ToastContainer} from "react-toastify";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {ProSidebarProvider} from "react-pro-sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import {Box} from "@mui/system";
import styles from "~/assets/css/GlobalStyles.module.scss"
import clsx from "clsx";
import SidebarCustom from "~/scenes/global/SidebarCustom";
import Topbar from "~/scenes/global/Topbar";
import {ColorModeContext, useMode} from "~/theme";
import BreadCrumbs from "~/components/BreadCrumbs";

function GlobalLayout( {children}) {
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
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <ProSidebarProvider>
                        <SidebarCustom isSidebar={isSidebar} />
                    </ProSidebarProvider>
                    <main className={clsx(styles["content"])}>
                        <Topbar setIsSidebar={setIsSidebar} />
                        <ToastContainer {...toastOption} />
                        <Box
                            flex={1}
                            display="flex"
                            justifyContent="flex-start"
                            paddingLeft={2}
                            marginY={2}
                        >
                            <BreadCrumbs />
                        </Box>
                        {children}
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default GlobalLayout;
