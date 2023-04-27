import {Box, useTheme} from "@mui/material";
import {tokens} from "~/theme";
import Header from "~/components/Header";
import {userTableColumns} from "./userTBFormat";
import {Suspense, useCallback, useEffect, useMemo, useState} from "react";
import {toast} from "react-toastify";
import {DataGrid, useGridApiRef} from "@mui/x-data-grid";
import CustomToolbar from "./CustomToolbar";
import {userService} from "~/service";
import useDocumentTitle from "~/hooks/useDocumentTitle";

const ManageUser = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const apiRef = useGridApiRef();
    useDocumentTitle("Ohana - Quản lý người dùng")


    const [tableState, setTableState] = useState({
        pageSize: 10,
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
            await userService.updateUserStatusById(row.id, row.status);
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

    const handleFilter = useCallback(
        async (filterParams) => {
        try {
            let result = await userService.filterUsers(filterParams, {
                page: tableState.page,
                size: tableState.pageSize,
            });
            addPaginationProperties(result);
            toast.success("Lọc thành công!")
        } catch (error) {
            toast.error("Lọc thất bại!");
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
                let result = await userService.getAllUsers(paginationParams);
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
                <Header title="Danh sách người dùng" />
                <Box
                    flex={1}
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            // borderBottom: "none",
                        },
                        "& .MuiDataGrid-cell:hover": {
                            cursor: "pointer"
                        },
                        "& .MuiDataGrid-root .MuiDataGrid-cell:focus-within":
                            {
                                outline: "none !important"
                            }
                        ,
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
                        columns={userTableColumns}
                        pagination
                        initialState={{
                            ...tableState,
                            pagination: {paginationModel: {pageSize: 10}},
                        }}
                        pageSizeOptions={[10,20,50,100]}
                        loading={tableState.isLoading}
                        processRowUpdate={handleCellValueChanged}
                        onProcessRowUpdateError={handleProcessRowUpdateError}
                        rowSelection
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
                        paginationMode="server"
                        checkboxSelection
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
