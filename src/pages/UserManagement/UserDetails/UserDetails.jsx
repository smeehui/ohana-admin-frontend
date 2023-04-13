import React, {useEffect, useState} from "react";
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

const UserDetails = () => {
    const theme = useTheme();

    const colors = tokens(theme.palette.mode);

    const {id} = useParams();

    const [state, setState] = useState({
        user: {},
        content: [],
        isLoading: true,
    });

    useEffect(() => {
        (async () => {
            setState({...state, isLoading: true});
            try {
                let result = await userService.findById(id);

                let listPosts = await postService.findAllByUserId(id, result);

                setState({
                    ...state,
                    user: result,
                    content: listPosts.content,
                    isLoading: false,
                });
            } catch (error) {
                toast.error("Lấy dữ liệu thất bại!");
                console.log(error);
            }
        })();
    }, []);

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
                    <Grid borderRadius={5} container direction={"column"} p={2} bgcolor={colors.grey[800]} mb={5}>
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
                                              value={state.user.fullName}

                                          />
                                          <TextField
                                              fullWidth
                                              type="email"
                                              label="Email"
                                              readOnly={true}
                                              value={state.user.email}

                                          />
                                          <TextField
                                              fullWidth
                                              type="phone"
                                              label="Số ĐT"
                                              readOnly={true}
                                              value={state.user.phone}

                                          />
                                      </Stack>

                                      <Stack spacing={2} direction={"row"} justifyContent={"space-between"}>
                                          <TextField
                                              fullWidth
                                              label={"Mô tả"}
                                              rows={3}
                                              readOnly={true}
                                              value={state.user.description}
                                              multiline
                                              maxRows={4}
                                          />
                                          <TextField
                                              fullWidth
                                              multiline
                                              label={"Địa chỉ"}
                                              maxRows={4}
                                              rows={3}
                                              readOnly={true}
                                              value={state.user.address}
                                          />

                                      </Stack>

                                      <Stack spacing={2} direction={"row"} justifyContent={"space-between"}>

                                          <TextField
                                              fullWidth
                                              type="text"
                                              label="Role"
                                              readOnly={true}
                                              value={state.user.role}

                                          />
                                          <TextField
                                              fullWidth
                                              type="text"
                                              label="Trạng thái"
                                              readOnly={true}
                                              value={state.user.status}

                                          />
                                      </Stack>
                                  </Stack>
                                </Grid>

                                <Grid display={"flex"} justifyContent={"center"} alignItems={"center"} xs={4}>
                                    {state.user.thumbnailId
                                        ? (
                                            <CldImage
                                            id={state.user.thumbnailId}
                                            w={275}
                                            h={275}
                                            r={50}
                                            alt={state.user.fullName}
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

                    <Grid borderRadius={5} container direction={"column"} p={2} bgcolor={colors.grey[800]}>
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
                                }} initialState={{pagination: {paginationModel: {pageSize: 10}}}} pageSizeOptions={[10,20,30]} columns={columns} autoHeight rows={state.content}/>
                            </Box>
                        </Box>
                    </Grid>
                </Container>
            )}
        </>
    );
};

export default UserDetails;
