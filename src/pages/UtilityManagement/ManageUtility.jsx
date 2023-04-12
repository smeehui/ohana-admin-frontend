import React, {createContext, useEffect, useMemo, useState} from 'react'
import {Box, Button, MenuItem, Modal, Stack, TextField, Typography, useTheme} from "@mui/material";
import Header from "~/components/Header";
import {DataGrid} from "@mui/x-data-grid";
import {utilitiesService} from "~/service";
import {toast} from "react-toastify";
import {tokens} from "~/theme";
import {columns} from "~/pages/UtilityManagement/utilityTableFormat";
import {allUtilityIcons} from "~/pages/UtilityManagement/data/allUtilities";
import "~/assets/fonts/icon-ohana.ttf"

export const UtilTableContext = createContext();
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
        isEditModalOpen: false,
        forceReload: false,
        utility: {
            icon: "",
            name: "",
            priority: ""
        }
    })

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
        setPageState({
            ...pageState,
            isEditModalOpen: false,
        });
    };

    const onChange = (e) => {
       setPageState({
           ...pageState,
           utility: {
               ...pageState.utility,
               [e.target.name]: e.target.value
           }
       })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    }


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
                <Modal open={pageState.isEditModalOpen} onClose={handleClose}>
                    <Box sx={style} onSubmit={handleSubmit} component={"form"}>
                        <Typography id="modal-modal-title" variant="h3" gutterBottom>
                            Chỉnh sửa tiện ích
                        </Typography>

                        <Stack sx={{
                            marginBottom: "20px",
                            "& .MuiInputBase-input": {
                                fontSize: "1.2rem"
                            }
                        }} spacing={2} direction={"row"}>
                            <TextField fontSize={18}
                                       value={pageState.utility.name}
                                       label="Tên tiện ích"
                                       variant="standard"
                                       onChange={onChange}
                                       name="name"
                            />
                            <TextField
                                fontSize={18}
                                select
                                label="Icon"
                                variant="standard"
                                defaultValue={pageState.utility.icon}
                                sx={{
                                    minWidth: 150
                                }}
                                onChange={onChange}
                                name="icon"

                            >
                                {
                                    allUtilityIcons.map(
                                        icon => {
                                            return (
                                                <MenuItem sx={{fontSize: "1.2rem !important"}} value={icon.icon} key={icon.icon}>
                                                    <i style={{margin: "0 3px",fontSize: "1.2rem"}} className={icon.icon + " icon"}></i>
                                                    {icon.name}
                                                </MenuItem>
                                            )
                                        })
                                }
                            </TextField>
                            <TextField name="priority"
                                       onChange={onChange}
                                       fontSize={18}
                                       type={"number"}
                                       value={pageState.utility.priority}
                                       label="Độ ưu tiên"
                                       variant="standard"
                            />
                        </Stack>

                        <Stack direction="row" spacing={2} justifyContent={"flex-end"}>
                            <Button
                                onClick={handleSubmit}
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
            </Box>
        </UtilTableContext.Provider>
    )
}

export default ManageUtility
