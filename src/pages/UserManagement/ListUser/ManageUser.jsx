import { Box, useTheme } from "@mui/material";
import { tokens } from "~/theme";
import Header from "~/components/Header";
import { columns } from "./userTBFormat";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import {
    filterUsers,
    getAllUsers,
    updateUserStatusById,
} from "~/service/userService";
import { toast, ToastContainer } from "react-toastify";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import CustomToolbar from "./CustomToolbar";
const ManageUser = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const apiRef = useGridApiRef();

    const [tableState, setTableState] = useState({
        pageSize: 100,
        page: 0,
        rowCount: 0,
        rows: [],
        selectedRows: [],
        currentRow: {},
        isLoading: true,
        forceReload: false,
    });

    const toggleLoading = (isLoading)=>{       
        setTableState({...tableState,isLoading:isLoading})
    }

    const forceReload = useCallback(() => {
        setTableState((prev) => ({ ...prev, forceReload: !prev.forceReload }));
        apiRef.current.setRowSelectionModel([])
    }, []);

    const addPaginationProperties = (result) => {
        const { totalElements, number, size, content } = result;
        setTableState((prev) => ({
            ...prev,
            rowCount: totalElements,
            pageSize: size,
            page: number,
            rows: content,
            isLoading: false,
        }));
    };

    const handleCellValueChanged = async (row) => {
        toggleLoading(true)
        try {
            await updateUserStatusById(row.id, row.status);
            toast.success("Chỉnh sửa thành công!");
        } catch (error) {
            console.log(error);
        }
        toggleLoading(false)
        return row;
    };

    const handleProcessRowUpdateError = async (event) => {
        toast.error("Chỉnh sửa thất bại!");
    };

    const handleFilter = useCallback(async (filterParams) => {
        try {
            toggleLoading(true)
            let result = await filterUsers(filterParams, {
                page: tableState.page,
                size: tableState.pageSize,
            });
            addPaginationProperties(result);
        } catch (error) {
            toast.error("Filter errror!");
            console.log(error);
        }
    }, []);

    useEffect(() => {
        (async () => {
            let paginationParams = {
                page: tableState.page,
                size: tableState.pageSize,
            };
            try {
                let result = await getAllUsers(paginationParams);
                addPaginationProperties(result);
            } catch {
                toast.error("Lấy dữ liệu thất bại!");
            }
        })();
    }, [tableState.pageSize, tableState.page, tableState.forceReload]);

    console.log(tableState.isLoading);
    const toolBar = useMemo(
        () => ({
            toolbar: () => (
                <CustomToolbar
                    selectedRows={tableState.selectedRows}
                    handleFilter={handleFilter}
                    forceReload={forceReload}
                />
            ),
        }),
        [tableState.selectedRows,tableState.forceReload],
    );
    return (
        <Suspense fallback={(<h1>Loading...</h1>)}>
            <Box m="20px" display={"flex"} flexDirection={"column"}>
                <Header title="Danh sách" />
                <Box
                    flex={1}
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
                    <DataGrid
                        apiRef={apiRef}
                        autoHeight
                        slots={toolBar}
                        columns={columns}
                        pagination
                        loading={tableState.isLoading}
                        processRowUpdate={handleCellValueChanged}
                        onProcessRowUpdateError={handleProcessRowUpdateError}
                        isCellEditable={({ row }) => row.role !== "ADMIN"}
                        rowSelection
                        pageSizeOptions={[10, 20, 50, 100]}
                        onPaginationModelChange={(paginationModel) =>
                            setTableState((prev) => ({
                                ...prev,
                                ...paginationModel,
                            }))
                        }
                        onRowEditStart={(row) =>
                            setTableState((prev) => ({
                                ...prev,
                                currentRow: row,
                            }))
                        }
                        filterMode="server"
                        checkboxSelection
                        paginationMode="server"
                        {...tableState}
                        onRowSelectionModelChange={(rows) =>
                            setTableState((prev) => ({
                                ...prev,
                                selectedRows: [
                                    ...rows.map((row) =>
                                        {
                                            console.log(rows)
                                            return tableState.rows.find(
                                                (tRow) => tRow.id === row,
                                            )
                                        },
                                    ),
                                ],
                            }))
                        }
                    />
                </Box>
            </Box>
        </Suspense>
    );
};

export default ManageUser;
