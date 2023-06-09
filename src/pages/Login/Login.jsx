import React, {useContext, useState} from 'react'
import {
    Box,
    Button,
    FormHelperText,
    Grid,
    Link,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import poster from "~/assets/img/sign-in-poster.jpg"
import {Image} from "react-bootstrap";
import {tokens} from "~/theme";
import {HomeIcon} from "~/assets/icons/icons";
import useDocumentTitle from "~/hooks/useDocumentTitle";
import {useFormik} from "formik";
import * as Yup from "yup";
import {authService} from "~/service";
import {AppContext} from "~/store";
import {GlobalActions} from "~/store/actionConstants";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {config} from "~/config";

function TabPanel(props) {
    const {children, value, index, ...other} = props;
    useDocumentTitle("Ohana - Đăng nhập admin")
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
            style={{minWidth: "100%"}}
        >
            {value === index && <> {children}</>}
        </div>
    );
}

function Login() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [value, setValue] = useState(0);
    const [globalState, globalDispatch] = useContext(AppContext);
    const [loginParams, setLoginParams] = useState({
        email: "",
        password: ""
    })
    const navgate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: loginParams.email,
            password: loginParams.password,
        }, validationSchema: Yup.object({
            email: Yup.string()
                .required('Email không được trống!')
                .email('Email không hợp lệ'),
            password: Yup.string()
                .max(50, 'Tên tối đa là 50 ký tự!')
                .min(7, 'Mật khẩu tối thiểu là 7 ký tự!')
                .required('Mật khẩu không được trống!')
                .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[-`!~({})|.,*_@#$%^&+=/])(?=\S+$).{6,}$/g, "Mật khẩu tối thiểu 6 ký tự, có ít nhất 1 chữ số, 1 ký tự đặc biệt và 1 chữ in hoa")
        }),
        onSubmit: async () => {
            try {
                const res = await authService.login(formik.values);
                toast.success("Đăng nhập thành công");
                setTimeout(() => {
                    globalDispatch({type: GlobalActions.LOGGED_IN, payload: {token: res.token, username: res.username}})
                    window.location.href = config.routes.dashboard;
                }, 1500)
            } catch (error) {
                toast.error("Tên đăng nhập hoặc mật khẩu không chính xác");
                console.log(error);
            }
        }
    })

    const emailErr = formik.errors.email && formik.touched.email
    const passwordErr = formik.errors.password && formik.touched.password
    const handleChange = (event, newValue) => {
        event.preventDefault();
        setValue(newValue);
    };

    return (
        <Box minHeight={"100vh"} display={"flex"} justifyContent={"center"} alignItems={"center"}
             sx={{background: theme.palette.mode === "light" ? "linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))" : "linear-gradient(to right, rgb(61 11 114), rgb(18 55 118))"}}>
            <Grid spacing={2} container direction={"row"} maxWidth={"900px"}>
                <Stack margin={"auto"} sx={{backgroundColor: colors.grey[900]}} padding={3} borderRadius={3}
                       direction={"row"} boxShadow={"0 0 50px " + colors.grey[300]}>
                    <Grid item xs={8} padding={2}>
                        <HomeIcon textColor={colors.grey[400]}/>
                        <Image className={"rounded rounded-2"} style={{maxWidth: "100%", maxHeight: "100%"}}
                               src={poster}/>
                    </Grid>
                    <Grid item xs={4} padding={3} borderRadius={2} bgcolor={colors.pink[200]} alignItems={"flex-start"}
                          display={"flex"} flexDirection={"column"}>
                        <Tabs value={value} onChange={handleChange}
                              centered indicatorColor="secondary"
                              textColor="inherit">
                            <Tab label={"Đăng nhập"}/>
                            {/*<Tab label={"Quên mật khẩu"}/>*/}
                        </Tabs>
                        <TabPanel value={value} index={0}>
                            <Box
                                component="form"
                                noValidate
                                onSubmit={formik.handleSubmit}
                                sx={{mt: 1}}
                            >
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={emailErr}
                                    helperText={emailErr &&
                                        <FormHelperText sx={{fontSize: 12}}>{formik.errors.email}</FormHelperText>}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Mật khẩu"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={passwordErr}
                                    helperText={passwordErr &&
                                        <FormHelperText sx={{fontSize: 12}}>{formik.errors.password}</FormHelperText>}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2, backgroundColor: colors.pink[600]}}
                                >
                                    Đăng nhập
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link onClick={(e) => handleChange(e, 1)} href="#" variant="body2">
                                            Quên mật khẩu?
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Box
                                component="form"
                                noValidate
                                onSubmit={formik.handleSubmit}
                                sx={{mt: 1}}
                            >
                                <Typography variant={"secondary"}>Vui lòng nhập địa chỉ email để lấy lại mật
                                    khẩu!</Typography>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                    onClick={(e) => handleChange(e, 2)}
                                >
                                    Send code
                                </Button>
                            </Box>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <Box
                                component="form"
                                noValidate
                                onSubmit={formik.handleSubmit}
                                sx={{mt: 1}}
                            >
                                <Typography>Mã xác minnh đã được gửi đến email, vui lòng kiểm tra và nhập mã xác minh
                                    vào khung bên dưới!</Typography>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="code"
                                    label="Mã xác minh"
                                    name="code"
                                    autoFocus
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                    onClick={(e) => handleChange(e, 4)}
                                >
                                    Xác minh
                                </Button>
                            </Box>
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            <Box
                                component="form"
                                noValidate
                                onSubmit={formik.handleSubmit}
                                sx={{mt: 1}}
                            >
                                <Typography>Xác minh thành công, vui lòng nhập mật khẩu mới!</Typography>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Mật khẩu mới"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Nhập lại mật khẩu mới"
                                    type="password"
                                    id="password"
                                    autoComplete="re-password"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                >
                                    Thay đổi
                                </Button>
                            </Box>
                        </TabPanel>
                        <TabPanel value={value} index={4}>
                            <Box
                                component="form"
                                noValidate
                                onSubmit={formik.handleSubmit}
                                sx={{mt: 1}}
                            >
                                <Typography>Xác minh không thành công, vui lòng nhập lại mã xác minh!</Typography>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                    onClick={(e) => handleChange(e, 2)}
                                >
                                    Nhập lại mã xác minh
                                </Button>
                            </Box>
                        </TabPanel>
                    </Grid>
                </Stack>
            </Grid>
        </Box>
    )
}

export default Login
