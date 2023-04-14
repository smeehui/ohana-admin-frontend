import React, {useContext, useEffect, useState} from "react";
import {Box, CircularProgress, Container, Grid, Stack, TextField, useTheme,} from "@mui/material";
import Header from "~/components/Header";
import Form from "react-bootstrap/Form";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";
import user from "~/assets/img/Avatar-Profile-Vector.png";
import {postService, userService} from "~/service";
import CldImage from "~/components/CldImage";
import {DataGrid} from "@mui/x-data-grid";
import {tokens} from "~/theme";
import {columns} from "./userDetailTBFormat";
import useDocumentTitle from "~/hooks/useDocumentTitle";
import {AppContext, AppProvider} from "~/store";
import {GlobalActions} from "~/store/actionConstants";

const UserDetails = () => {
    const theme = useTheme();

    const colors = tokens(theme.palette.mode);

    const {id} = useParams();

    const [globalState, globalDispatch] = useContext(AppContext);

    const [state, setState] = useState({
        isLoading: true,
    });

    useDocumentTitle("Ohana - " +globalState.user.fullName)

    useEffect(() => {
        (async () => {
            setState({...state, isLoading: true});
            try {
                globalDispatch({type: GlobalActions.CLEAR_SEARCH})
                let result = await userService.findById(id);

                let listPosts = await postService.findAllByUserId(id, result);

                globalDispatch({type: GlobalActions.SET_USER_INFO, payload: {user: result,posts: listPosts.content,pageType: "USER"}},globalState)
                setState({
                    isLoading: false,
                });
            } catch (error) {
                toast.error("Lấy dữ liệu thất bại!");
                console.log(error);
            }
        })();
    }, [id]);
    return (
        <>
            {state.isLoading ? (
                <Box
                    position={"absolute"}
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <CircularProgress color="success" size={80}/>
                </Box>
            ) : (
                <Container>
                    <Grid borderRadius={5} container direction={"column"} p={2} border={"1px solid " + colors.grey[800]} mb={5}>
                        <div>
                            <Header
                                title="Thông tin khách hàng"
                            />
                        </div>
                        <Form>
                            <Grid
                                container
                                spacing={1}
                                sx={{
                                    "& .MuiInputBase-root":{
                                        fontSize: 18
                                    },
                                    "& .MuiInputLabel-root":{
                                        fontSize: 18
                                    }
                                }}>
                                <Grid item xs={8}>
                                  <Stack width={"100%"} direction={"column"} spacing={3}>
                                      <Stack spacing={2} direction={"row"} justifyContent={"space-between"}>

                                          <TextField
                                              fullWidth
                                              type="readonly"
                                              label="Họ tên"
                                              readOnly={true}
                                              value={globalState.user.fullName}

                                          />
                                          <TextField
                                              fullWidth
                                              type="email"
                                              label="Email"
                                              readOnly={true}
                                              value={globalState.user.email}

                                          />
                                          <TextField
                                              fullWidth
                                              type="phone"
                                              label="Số ĐT"
                                              readOnly={true}
                                              value={globalState.user.phone}

                                          />
                                      </Stack>

                                      <Stack spacing={2} direction={"row"} justifyContent={"space-between"}>
                                          <TextField
                                              fullWidth
                                              label={"Mô tả"}
                                              readOnly={true}
                                              value={globalState.user.description}
                                              multiline
                                              maxRows={4}
                                          />
                                          <TextField
                                              fullWidth
                                              multiline
                                              label={"Địa chỉ"}
                                              maxRows={4}
                                              readOnly={true}
                                              value={globalState.user.address}
                                          />

                                      </Stack>

                                      <Stack spacing={2} direction={"row"} justifyContent={"space-between"}>

                                          <TextField
                                              fullWidth
                                              type="text"
                                              label="Role"
                                              readOnly={true}
                                              value={globalState.user.role}

                                          />
                                          <TextField
                                              fullWidth
                                              type="text"
                                              label="Trạng thái"
                                              readOnly={true}
                                              value={globalState.user.status}

                                          />
                                      </Stack>
                                  </Stack>
                                </Grid>

                                <Grid display={"flex"} justifyContent={"center"} alignItems={"center"} item xs={4}>
                                    {globalState.user.thumbnailId
                                        ? (
                                            <CldImage
                                            id={globalState.user.thumbnailId}
                                            w={275}
                                            h={275}
                                            r={50}
                                            alt={globalState.user.fullName}
                                        /> )
                                        : (
                                        <img
                                            className="rounded rounded-circle"
                                            src={user}
                                            width={275}
                                            height={275}
                                            alt={"User avt"}
                                        />
                                    )}
                                </Grid>
                            </Grid>
                        </Form>


                    </Grid>

                    <Grid borderRadius={5} container direction={"column"} p={2} border={"1px solid " + colors.grey[800]}>
                        <Box display={"flex"} flexDirection={"column"}>
                            <Header title="Các bài đăng"/>
                            <Box
                                flex={"1"}
                                sx={{
                                    "& .MuiDataGrid-root": {
                                        border: "none",
                                        borderRadius: 5
                                    },
                                    "& .MuiDataGrid-cell": {
                                        borderBottom: "none",
                                    },
                                    "& .name-column--cell": {
                                        color: colors.greenAccent[300],
                                    },
                                    "& .MuiDataGrid-columnHeaders": {
                                        backgroundColor: colors.blueAccent[700],
                                        borderBottom: "none",
                                    },
                                    "& .MuiDataGrid-virtualScroller": {
                                        backgroundColor: colors.primary[400],
                                    },
                                    "& .MuiDataGrid-footerContainer": {
                                        borderTop: "none",
                                        backgroundColor: colors.blueAccent[700],
                                    },
                                    "& .MuiCheckbox-root": {
                                        color: `${colors.greenAccent[200]} !important`,
                                    },
                                }}
                            >
                                <DataGrid
                                    slots={{
                                    noRowsOverlay: () => (
                                        <Stack fontSize={18} height="100%" alignItems="center" justifyContent="center">
                                           Người dùng chưa có bài đăng nào
                                        </Stack>
                                    )
                                }} initialState={{pagination: {paginationModel: {pageSize: 10}}}} pageSizeOptions={[10,20,30]} columns={columns} autoHeight rows={globalState.posts}/>
                            </Box>
                        </Box>
                    </Grid>
                </Container>
            )}
        </>
    );
};

export default UserDetails;
