import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  InputBase,
  ListItemText,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import Header from "~/components/Header";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import user from "~/assets/img/Avatar-Profile-Vector.png";
import { postService, userService } from "~/service";
import CldImage from "~/components/CldImage";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "~/theme";
import { columns } from "./userDetailTBFormat";
import useDocumentTitle from "~/hooks/useDocumentTitle";
import { AppContext, AppProvider } from "~/store";
import { GlobalActions } from "~/store/actionConstants";
import { UserStatus } from "~/pages/UserManagement/constants/UserStatus";
import { PostStatus } from "~/pages/PostManagement/ListPost/constants/PostStatus";
import { Block, CheckCircleOutlined } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide easing={"enter"} ref={ref} {...props} />;
});
const UserDetails = () => {
  const theme = useTheme();

  const colors = tokens(theme.palette.mode);

  const { id } = useParams();

  const [globalState, globalDispatch] = useContext(AppContext);

  const [state, setState] = useState({
    isLoading: true,
    modifyingStatus: UserStatus.ACTIVATED,
    isShowConfirm: false,
    isReloadPage: false,
  });

  useDocumentTitle("Ohana - " + globalState.user.fullName);

  useEffect(() => {
    (async () => {
      setState({ ...state, isLoading: true });
      try {
        globalDispatch({ type: GlobalActions.CLEAR_SEARCH });
        let result = await userService.findById(id);

        let listPosts = await postService.findAllByUserId(id, result);

        globalDispatch(
          {
            type: GlobalActions.SET_USER_INFO,
            payload: {
              user: result,
              posts: listPosts.content,
              pageType: "USER",
            },
          },
          globalState
        );
        setState({ ...state, isLoading: false });
      } catch (error) {
        toast.error("Lấy dữ liệu thất bại!");
        console.log(error);
      }
    })();
  }, [id, state.isReloadPage]);

  const handleConfirmChangeStatus = async () => {
    try {
      await userService.updateUserStatusById(id, state.modifyingStatus);
      setState((prevState) => ({
        ...prevState,
        isReloadPage: !prevState.isReloadPage,
        isShowConfirm: false,
      }));
      toast.success("Cập nhật thành công!");
    } catch (error) {
      toast.error("Cập nhật thất bại!");
      console.log(error);
      setState((prevState) => ({ ...prevState, isLoading: false }));
    }
  };
  const handleClick = (e) => {
    setState({
      ...state,
      isShowConfirm: true,
      modifyingStatus: e.currentTarget.value,
    });
  };
  const onClose = () => {
    setState({ ...state, isShowConfirm: false });
  };
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
          <CircularProgress color="success" size={80} />
        </Box>
      ) : (
        <Container>
          <Grid
            borderRadius={5}
            container
            direction={"column"}
            p={2}
            border={"1px solid " + colors.grey[800]}
            mb={5}
          >
            <div>
              <Header title="Thông tin khách hàng" />
            </div>
            <Form>
              <Grid
                container
                spacing={1}
                sx={{
                  "& .MuiInputBase-root": {
                    fontSize: 18,
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: 18,
                  },
                }}
              >
                <Grid item xs={8}>
                  <Stack width={"100%"} direction={"column"} spacing={3}>
                    <Stack
                      spacing={2}
                      direction={"row"}
                      justifyContent={"space-between"}
                    >
                      <TextField
                        variant="standard"
                        InputProps={{
                          readOnly: true,
                        }}
                        fullWidth
                        type="readonly"
                        label="Họ tên"
                        readOnly={true}
                        value={globalState.user.fullName}
                      />
                      <TextField
                        variant="standard"
                        InputProps={{
                          readOnly: true,
                        }}
                        fullWidth
                        type="email"
                        label="Email"
                        readOnly={true}
                        value={globalState.user.email}
                      />
                      <TextField
                        variant="standard"
                        InputProps={{
                          readOnly: true,
                        }}
                        fullWidth
                        type="phone"
                        label="Số ĐT"
                        readOnly={true}
                        value={globalState.user.phone}
                      />
                    </Stack>

                    <Stack
                      spacing={2}
                      direction={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <TextField
                        variant="standard"
                        InputProps={{
                          readOnly: true,
                        }}
                        fullWidth
                        type="text"
                        label="Role"
                        readOnly={true}
                        value={globalState.user.role}
                      />
                      <TextField
                        variant="standard"
                        InputProps={{
                          readOnly: true,
                        }}
                        fullWidth
                        type="text"
                        label="Trạng thái"
                        readOnly={true}
                        value={globalState.user.status}
                      />
                    </Stack>

                    <Stack
                      spacing={2}
                      direction={"row"}
                      justifyContent={"space-between"}
                      fontSize="20px"
                    >
                      <TextField
                        variant="standard"
                        InputProps={{
                          readOnly: true,
                        }}
                        fullWidth
                        label={"Mô tả"}
                        value={globalState.user.description}
                        multiline
                        maxRows={4}
                      />
                    </Stack>

                    <Stack>
                      <TextField
                        variant="standard"
                        InputProps={{
                          readOnly: true,
                        }}
                        fullWidth
                        multiline
                        label={"Địa chỉ"}
                        maxRows={4}
                        readOnly={true}
                        value={globalState.user.address}
                      />
                    </Stack>

                    {/* <Stack
                      spacing={2}
                      direction={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      {globalState.user &&
                        globalState.user.status &&
                        globalState.user.status ===
                          UserStatus.CONFIRM_EMAIL && (
                          <Stack spacing={2} direction={"row"}>
                            <Button
                              onClick={handleClick()}
                              variant={"contained"}
                              size={"large"}
                              color={"success"}
                              value={UserStatus.ACTIVATED}
                            >
                              Kích hoạt
                              <CheckCircleOutlined sx={{ marginLeft: 1 }} />
                            </Button>
                            <Button
                              onClick={handleClick}
                              variant={"contained"}
                              size={"large"}
                              color={"error"}
                              value={UserStatus.DEACTIVATED}
                            >
                              Huỷ kích hoạt
                              <Block sx={{ marginLeft: 1 }} />
                            </Button>
                          </Stack>
                        )}
                      {globalState.user &&
                        globalState.user.status &&
                        globalState.user.status === UserStatus.ACTIVATED && (
                          <Stack spacing={2} direction={"row"}>
                            <Button
                              onClick={handleClick}
                              variant={"contained"}
                              size={"large"}
                              color={"error"}
                              value={UserStatus.DEACTIVATED}
                            >
                              Huỷ kích hoạt <Block sx={{ marginLeft: 1 }} />
                            </Button>
                          </Stack>
                        )}
                      {globalState.user &&
                        globalState.user.status &&
                        globalState.user.status === UserStatus.DEACTIVATED && (
                          <Stack spacing={2} direction={"row"}>
                            <Button
                              onClick={handleClick}
                              variant={"contained"}
                              size={"large"}
                              color={"success"}
                              value={UserStatus.ACTIVATED}
                            >
                              Kích hoạt{" "}
                              <CheckCircleOutlined sx={{ marginLeft: 1 }} />
                            </Button>
                          </Stack>
                        )}
                    </Stack> */}
                  </Stack>
                </Grid>

                <Grid
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  item
                  xs={4}
                >
                  {!globalState.user.thumbnailId.match(
                    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
                  ) ? (
                    <CldImage
                      id={globalState.user.thumbnailId}
                      w={275}
                      h={275}
                      r={50}
                      alt={globalState.user.fullName}
                    />
                  ) : (
                    <img
                      className="rounded rounded-circle"
                      src={globalState.user.thumbnailId}
                      width={275}
                      height={275}
                      alt={"User avt"}
                    />
                  )}
                </Grid>
              </Grid>
            </Form>
          </Grid>

          <Grid
            borderRadius={5}
            container
            direction={"column"}
            p={2}
            border={"1px solid " + colors.grey[800]}
          >
            <Box display={"flex"} flexDirection={"column"}>
              <Header title="Các bài đăng" />
              <Box
                flex={"1"}
                sx={{
                  "& .MuiDataGrid-root": {
                    border: "none",
                    borderRadius: 5,
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
                      <Stack
                        fontSize={18}
                        height="100%"
                        alignItems="center"
                        justifyContent="center"
                      >
                        Người dùng chưa có bài đăng nào
                      </Stack>
                    ),
                  }}
                  initialState={{
                    pagination: { paginationModel: { pageSize: 10 } },
                  }}
                  pageSizeOptions={[10, 20, 30]}
                  columns={columns}
                  autoHeight
                  rows={globalState.posts}
                />
              </Box>
            </Box>
          </Grid>
          <Dialog
            open={!!state.isShowConfirm}
            TransitionComponent={Transition}
            keepMounted
            // onClose={onClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogContent>
              <h4>
                {`Bạn có chắc chắn muốn ${
                  state.modifyingStatus === UserStatus.ACTIVATED
                    ? "kích hoạt"
                    : "khoá"
                } người dùng này?`}
              </h4>

              <Stack direction="row" spacing={1}></Stack>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="warning"
                onClick={() => onClose()}
              >
                Huỷ
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleConfirmChangeStatus()}
              >
                Xác nhận
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      )}
    </>
  );
};

export default UserDetails;
