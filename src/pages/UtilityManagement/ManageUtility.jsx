import React, {createContext, useContext, useEffect, useMemo, useState} from 'react'
import {Box, Button, FormHelperText, MenuItem, Modal, Stack, TextField, Typography, useTheme} from "@mui/material";
import Header from "~/components/Header";
import {DataGrid, GridToolbarContainer} from "@mui/x-data-grid";
import {utilitiesService} from "~/service";
import {toast} from "react-toastify";
import {tokens} from "~/theme";
import {columns} from "~/pages/UtilityManagement/utilityTableFormat";
import {allUtilityIcons} from "~/pages/UtilityManagement/data/allUtilities";
import "~/assets/fonts/icon-ohana.ttf"
import {useFormik} from "formik";
import * as Yup from "yup";
import {AddOutlined} from "@mui/icons-material";

export const UtilTableContext = createContext();

const ToolBar = ({formik}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {pageState, setPageState} = useContext((UtilTableContext));
    const handleClick = ()=>{
        formik.resetForm();
        setPageState({...pageState, isModalOpen: true,mode: "create"})
    }
    return (
        <GridToolbarContainer className="d-flex justify-content-end my-1">
            <Button
                variant="contained"
                color="success"
                title="Lọc"
                onClick={()=>handleClick()}
            >
                <AddOutlined/>
                Thêm mới
            </Button>
        </GridToolbarContainer>)
}

function ManageUtility() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const style = useMemo(() => ({
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    }), []);
    const [tableState, setTableState] = useState({
        rows: [],
        loading: true,
        pageSize: 5,
        page: 0,
        rowCount: 0,
    })
    const [pageState, setPageState] = useState({
        isModalOpen: false,
        isDelModalOpen: false,
        forceReload: false,
        mode: "update",
        utility: {
            icon: "",
            name: "",
            priority: "",
            id: -1
        },
        formikInitValues: {}
    })

    const formik = useFormik({
        initialValues: {
            name: pageState.utility.name,
            icon: pageState.utility.name,
            priority: pageState.utility.name
        }, validationSchema: Yup.object({
            icon: Yup.string()
                .required('Icon không được để trống!'),
            name: Yup.string()
                .max(50, 'Tên tối đa là 50 ký tự!')
                .min(2, 'Tên tối thiểu 2 ký tự!')
                .required('Tên tiện ích không được để trống!'),
            priority: Yup.number()
                .required("Độ ưu tiên không được để trống!")
                .max(30, "Độ ưu tiên cao nhất là 30!")
                .min(0, "Độ ưu tiên thấp nhất là 0! "),
        }),
        onSubmit: values => {
            console.log(pageState.mode)
            if (pageState.mode === "update") {
                (async () => {
                    try {
                        let utilityRs = await utilitiesService.updateById(pageState.utility.id, values);
                        setPageState({
                            ...pageState, utility: utilityRs, forceReload: !pageState.forceReload,
                            isModalOpen: false
                        });
                        toast.success("Cập nhật tiện ích thành công!")
                        formik.resetForm();
                    } catch (e) {
                        console.log(e);
                        toast.error("Cập nhật tiện ích thất bại!")
                    }
                })()
            }else {
                (async () => {
                    try {
                        let utilityRs = await utilitiesService.createNew(values);
                        setPageState({
                            ...pageState, utility: utilityRs, forceReload: !pageState.forceReload,
                            isModalOpen: false
                        });
                        toast.success("Thêm mới tiện ích thành công!")
                        formik.resetForm();
                    } catch (e) {
                        console.log(e);
                        toast.error("Thêm mới tiện ích thất bại!")
                    }
                })()
            }
        },
    });
    const nameError = formik.touched.name && formik.errors.name
    const iconError = formik.touched.icon && formik.errors.icon
    const priorityError = formik.touched.priority && formik.errors.priority


    const addPaginationProperties = (result) => {
        const {totalElements, number, size, content} = result;
        setTableState((prev) => ({
            ...prev,
            rowCount: totalElements,
            pageSize: size,
            page: number,
            rows: content,
            loading: false,
        }));
    };

    const handleClose = () => {
        formik.resetForm();
        setPageState({
            ...pageState,
            isModalOpen: false,
            isDelModalOpen: false
        });
    };

    useEffect(() => {
        (async () => {
            await formik.setFieldValue("name", pageState.utility.name)
            await formik.setFieldValue("icon", pageState.utility.icon)
            await formik.setFieldValue("priority", pageState.utility.priority)
        })()
    }, [pageState.utility])

    useEffect(() => {
        const {page, pageSize} = tableState;
        (async () => {
            try {
                let data = await utilitiesService.getAllUtilities({page, size: pageSize});
                addPaginationProperties(data);
            } catch (err) {
                toast.error("Lấy dữ liệu tiện ích thất bại!")
            }
        })()
    }, [tableState.pageSize, tableState.page, pageState.forceReload])

    return (
        <UtilTableContext.Provider value={{pageState, setPageState}}>
            <Box m="20px" display={"flex"} flexDirection={"column"}>
                <Header title="Danh mục phòng"/>
                <Box
                    flex={"1"}
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
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
                    <DataGrid columns={columns}
                              slots={{toolbar: () => <ToolBar formik={formik}/>}}
                              pageSizeOptions={[5, 20, 50, 100]}
                              initialState={{
                                  ...tableState,
                                  pagination: {paginationModel: {pageSize: 5}},
                              }}
                              paginationMode="server"
                              autoHeight
                              {...tableState}
                              onPaginationModelChange={(paginationModel) =>
                                  setTableState((prev) => ({
                                      ...prev,
                                      ...paginationModel,
                                  }))
                              }
                    />
                </Box>
                <Modal open={pageState.isModalOpen} onClose={handleClose}>
                    <Box sx={style} onSubmit={formik.handleSubmit} component={"form"}>
                        <Typography id="modal-modal-title" variant="h3" gutterBottom>
                            {pageState.mode === "update"? "Chỉnh sửa tiện ích":"Thêm mới"}
                        </Typography>

                        <Stack sx={{
                            marginBottom: "20px",
                            "& .MuiInputBase-input": {
                                fontSize: "1.2rem"
                            }
                        }} spacing={2} direction={"row"}>
                            <TextField fontSize={18}
                                       autoFocus
                                       label="Tên tiện ích"
                                       variant="standard"
                                       onChange={formik.handleChange}
                                       value={formik.values.name}
                                       name="name"
                                       error={nameError}
                                       helperText={nameError &&
                                           <FormHelperText sx={{fontSize: 12}}>{formik.errors.name}</FormHelperText>}
                            />
                            <TextField
                                fontSize={18}
                                select
                                label="Icon"
                                variant="standard"
                                sx={{
                                    minWidth: 150,
                                    maxHeight: 300
                                }}
                                onChange={formik.handleChange}
                                value={formik.values.icon}
                                name="icon"
                                error={iconError}
                                helperText={iconError &&
                                    <FormHelperText sx={{fontSize: 14}}>{formik.errors.icon}</FormHelperText>}

                            >
                                {
                                    allUtilityIcons.map(
                                        icon => {
                                            return (
                                                <MenuItem sx={{fontSize: "1.2rem !important"}} value={icon.icon}
                                                          key={icon.icon}>
                                                    <i style={{margin: "0 3px", fontSize: "1.2rem"}}
                                                       className={icon.icon + " icon"}></i>
                                                    {icon.name}
                                                </MenuItem>
                                            )
                                        })
                                }
                            </TextField>
                            <TextField name="priority"
                                       onChange={formik.handleChange}
                                       value={formik.values.priority}
                                       fontSize={18}
                                       type={"number"}
                                       label="Độ ưu tiên"
                                       variant="standard"
                                       error={priorityError}
                                       helperText={priorityError && <FormHelperText
                                           sx={{fontSize: 14}}>{formik.errors.priority}</FormHelperText>}
                            />
                        </Stack>

                        <Stack direction="row" spacing={2} justifyContent={"flex-end"}>
                            <Button
                                onClick={formik.handleSubmit}
                                size="small"
                                variant="contained"
                                color="success"
                                type="submit"
                            >
                                Xác nhận
                            </Button>

                            <Button
                                onClick={handleClose}
                                size="small"
                                variant="contained"
                                color="error"
                            >
                                Hủy
                            </Button>
                        </Stack>
                    </Box>
                </Modal>
                <Modal open={pageState.isDelModalOpen} onClose={handleClose}>
                    <Box sx={style}>Delete</Box>
                </Modal>
            </Box>
        </UtilTableContext.Provider>
    )
}

export default ManageUtility
