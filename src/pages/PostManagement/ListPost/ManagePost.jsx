import { Box, useTheme } from "@mui/material";
import { tokens } from "~/theme";
import Header from "~/components/Header";
import { columns } from "./postTBFormat";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import {
    updateUserStatusById,
} from "~/service/userService";
import { toast, ToastContainer } from "react-toastify";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { getAllPosts } from "~/service/postService";
import CustomToolbar from "~/pages/PostManagement/ListPost/components/CustomToolbar";
const ManagePost = () => {
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
        try {
            await updateUserStatusById(row.id, row.status);
            toast.success("Chỉnh sửa thành công!");
        } catch (error) {
            console.log(error);
        }
        return row;
    };

    const handleProcessRowUpdateError = async (event) => {
        toast.error("Chỉnh sửa thất bại!");
    };

    const handleFilter = useCallback(async (filterParams) => {

    }, []);

    useEffect(() => {
        (async () => {
            let paginationParams = {
                page: tableState.page,
                size: tableState.pageSize,
            };
            try {
                setTableState({...tableState,isLoading:true})
                let result = await getAllPosts(paginationParams);
                addPaginationProperties(result);
            } catch {
                toast.error("Lấy dữ liệu thất bại!");
            }
        })();
    }, [tableState.pageSize, tableState.page, tableState.forceReload]);

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
        <Box m="20px" display={"flex"} flexDirection={"column"}>
        <Header title="Danh sách" />
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
            <DataGrid
                apiRef={apiRef}
                autoHeight
                slots={toolBar}
                columns={columns}
                pagination
                loading={tableState.isLoading}
                processRowUpdate={handleCellValueChanged}
                onProcessRowUpdateError={handleProcessRowUpdateError}
                rowSelection
                pageSizeOptions={[5, 20, 50, 100]}
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
                resizable
                // onFilterModelChange={handleFilter}
                onRowSelectionModelChange={(rows) =>
                    setTableState((prev) => ({
                        ...prev,
                        selectedRows: [
                            ...rows.map((row) =>
                                tableState.rows.find(
                                    (tRow) => tRow.id === row,
                                ),
                            ),
                        ],
                    }))
                }
            />
        </Box>
    </Box>
    );
};

export default ManagePost;
