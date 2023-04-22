import React, {createContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {categoryService} from "~/service";
import {columns} from "./categoryTBFormat";
import {DataGrid} from "@mui/x-data-grid";
import {Box, Button, FormHelperText, Modal, Stack, TextField, Typography, useTheme,} from "@mui/material";
import {tokens} from "~/theme";
import Header from "~/components/Header";
import {Add} from "@mui/icons-material";
import {useFormik} from "formik";
import * as Yup from "yup";
import useDocumentTitle from "~/hooks/useDocumentTitle";

export const CategoryTableConText = createContext();

const Category = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    useDocumentTitle("Ohana - Quản lý danh mục")

    const [state, setState] = useState({
        open: false,
        category: [],
        cate: "",
        forceReload: false,
    });

    const [tableState, setTableState] = useState({
        loading: true,
        pageSize: 10,
        page: 0,
        rowCount: 0,
    })
    const {open} = state;

    const formik = useFormik({
        initialValues: {
            title: "",
            status: "SHOW"
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .min(2, "Tối thiểu 2 ký tự")
                .max(50, "Tối đa 50 ký tự")
                .required("Danh mục không được để trống!"),
        }),

        onSubmit: async (value) => {
            try {
                const result = await categoryService.addNewCategory(value.title);

                setState({
                    ...state,
                    open: false,
                    cate: "",
                    forceReload: !state.forceReload,
                });

                toast.success(`Thêm mới thành công`);

                formik.resetForm();
            } catch (error) {
                toast.error(`Thêm mới thất bại`);
            }
        },
    });

    const titleError = formik.touched.title && formik.errors.title;

    const handleAdd = () => {
        setState({
            ...state,
            open: true,
        });
    };

    const handleSubmit = async () => {
        try {
            const result = await categoryService.addNewCategory(state.cate);

            setState({
                ...state,
                open: false,
                cate: "",
                forceReload: true,
            });

            toast.success(`Thêm mới thành công`);
        } catch (error) {
            toast.error(`Thêm mới thất bại`);
        }
    };

    const onChange = (e) => {
        setState({
            ...state,
            cate: e.target.value,
        });
    };

    const handleClose = () => {
        formik.resetForm();
        setState({
            ...state,
            open: false,
            cate: "",
        });
    };

    useEffect(() => {
        (async () => {
            try {
                let result = await categoryService.getAllCategory();
                setState({...state, category: result.content});
                setTableState({...tableState,loading: false})
            } catch (error) {
                toast.error("Lấy dữ liệu thất bại!");
                setTableState({...tableState,loading: false})
            }
        })();
    }, [state.forceReload]);

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <CategoryTableConText.Provider value={{state, setState}}>
                <Box m="20px" display={"flex"} flexDirection={"column"}>
                    <Stack sx={{height: "35px"}} mb={2} direction="row" spacing={105}>
                        <Header title="Danh mục phòng"/>

                    </Stack>
                    <Stack sx={{height: "35px"}} mb={0.5} direction="row" spacing={10} justifyContent="end">

                        <Button
                            onClick={handleAdd}
                            variant="contained"
                            color="success"
                        >
                            <Add/>
                            Thêm mới
                        </Button>
                    </Stack>
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
                            "& .MuiDataGrid-cell:hover": {
                                cursor: "pointer"
                            },
                            "& .MuiDataGrid-root .MuiDataGrid-cell:focus-within":
                                {
                                    outline: "none !important"
                                }
                            ,
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
                            pageSizeOptions={[10,20,50,100]}
                            initialState={{
                            ...state,
                            pagination: {paginationModel: {pageSize: 10}},
                        }} columns={columns}
                            autoHeight
                            rows={state.category}
                            disableRowSelectionOnClick={true}
                            paginationMode="server"
                            {...tableState}
                            onPaginationModelChange={(paginationModel) =>
                                setTableState((prev) => ({
                                  ...prev,
                                  ...paginationModel,
                                }))
                            }
                        />
                    </Box>

                    <Modal open={open} onClose={handleClose}>
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h3" gutterBottom>
                                Thêm danh mục mới
                            </Typography>

                            <Stack
                                component={"form"}
                                onSubmit={formik.handleSubmit}
                                sx={{marginBottom: "20px", marginTop: "30px"}}
                            >
                                <Stack direction="column" spacing={1}>
                                    <TextField
                                        onChange={formik.handleChange}
                                        value={formik.values.title}
                                        label="Tên danh mục"
                                        name="title"
                                        variant="standard"
                                        error={titleError}
                                        helperText={
                                            titleError && (
                                                <FormHelperText sx={{fontSize: 12}}>
                                                    {formik.errors.title}
                                                </FormHelperText>
                                            )
                                        }
                                    />
                                </Stack>
                            </Stack>

                            <Stack direction="row" spacing={2} justifyContent={"flex-end"}>
                                <Button
                                    onClick={formik.handleSubmit}
                                    type="submit"
                                    size="small"
                                    variant="contained"
                                    color="success"
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
                </Box>
            </CategoryTableConText.Provider>
        </>
    );
};

export default Category;
