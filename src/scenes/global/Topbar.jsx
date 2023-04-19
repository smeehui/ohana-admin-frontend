import {Box, Button, Fade, IconButton, Paper, Popper, Stack, Typography, useTheme} from "@mui/material";
import React, {useContext, useRef, useState} from "react";
import {ColorModeContext, tokens} from "../../theme.jsx";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import Search from "~/components/Search";
import {AppContext} from "~/store";
import {AdminPanelSettingsOutlined} from "@mui/icons-material";
import useOnClickOutside from "~/hooks/useOnclickOutSide";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import {authService} from "~/service";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {config} from "~/config";
import {GlobalActions} from "~/store/actionConstants";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide easing={"enter"} ref={ref} {...props} />;
});
const Topbar = ({showSearch = true}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const userBtnRef = useRef()
    const navigate = useNavigate()
    const [globalState, globalDispatch] = useContext(AppContext);
    const [state,setState] = useState({
        isShowLogOutDialog: false,
        isShowMenu:false,
    })

    useOnClickOutside(userBtnRef,()=>{
       let id = setTimeout(()=>{
           setState(prev=>({...prev,isShowMenu: false}))
           return clearTimeout(id);
       },250)
    })
    const handleShowMenu = ()=>{
        setState({...state, isShowMenu: true})
    }

    const handleClose = ()=> {
        setState({...state,isShowMenu: false,isShowLogOutDialog: false})
    }

    const handleShowLogoutConfirm = () => {
        setState({...state,isShowMenu: false,isShowLogOutDialog: true})
    }

    const handleLogout = async () => {
        try {
            await authService.logout();
            toast.success("Đăng xuất thành công!")
            let id = setTimeout(()=>{
                window.location.href = config.routes.login;
                return clearTimeout(id)
            },500)
        } catch (e){
            toast.error("Đăng xuất thất bại!")
        }
    }

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            bgcolor={colors.pink[400]}
            p={1}
            borderRadius={2}
        >
            {/* SEARCH BAR */}
            {showSearch && <Search/>}

            {/* ICONS */}
            <Box  marginLeft={"auto"} display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>
                <IconButton>
                    <NotificationsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <SettingsOutlinedIcon />
                </IconButton>
                <IconButton ref={userBtnRef} onMouseEnter={handleShowMenu} >
                    <PersonOutlinedIcon />
                </IconButton>
            </Box>
            <Popper placement={"bottom-end"} anchorEl={userBtnRef.current} open={!!state.isShowMenu}>
                <Paper>
                   <Fade in={!!state.isShowMenu}>
                       <Stack p={2}>
                           <Stack direction={"row"} sx={{borderBottom: "1px solid",py:1,mb:1,mx:1}}><AdminPanelSettingsOutlined/><Typography sx={{mx:1}} >{globalState.admin.username}</Typography></Stack>
                           <Button onClick={handleShowLogoutConfirm}  sx={{mx:1}} variant={"outlined"} color={"warning"}>Log out</Button>
                       </Stack>
                   </Fade>
                </Paper>
            </Popper>
            <Dialog
                open={!!state.isShowLogOutDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
            >
                <DialogContent>
                    <h4>
                        Đăng xuất khỏi hệ thống?
                    </h4>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={handleClose}
                    >
                        Huỷ
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleLogout}
                    >
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Topbar;
