import {Box, useTheme} from "@mui/material";
import {tokens} from "~/theme";
import Header from "~/components/Header";
import {userTableColumns} from "./userTBFormat";
import {useCallback, useContext, useEffect, useMemo, useState} from "react";
import {toast} from "react-toastify";
import {DataGrid, useGridApiRef} from "@mui/x-data-grid";
import CustomToolbar from "./CustomToolbar";
import {userService} from "~/service";
import useDocumentTitle from "~/hooks/useDocumentTitle";
import {UserContext} from "~/pages/UserManagement/UserManagementContext/UserManagementContext";

const ManageUser = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const apiRef = useGridApiRef();
    useDocumentTitle("Ohana - Quản lý người dùng")

    const [state, dispatch] = useContext(UserContext);

    const [tableState, setTableState] = useState({
        pageSize: 10,
        page: 0,
        rowCount: 0,
        rows: [],
        selectedRows: [],
        currentRow: {},
        isLoading: true,
        forceReload: false,
        doFilter: true
    });
    const doFilter = useCallback(() => {
        setTableState((prev) => ({...prev, doFilter: !prev.doFilter}));
    }, []);

    const forceReload = useCallback(() => {
        setTableState((prev) => ({...prev, forceReload: !prev.forceReload}));
        apiRef.current.setRowSelectionModel([])
    }, []);

    const addPaginationProperties = (result) => {
        const {totalElements, number, size, content} = result;
        setTableState((prev) => ({
            ...prev,
            rowCount: totalElements,
            pageSize: size,
            page: number,
            rows: content,
            isLoading: false,
        }));
    };

    const handleFilter = useCallback(
        async (filterParams) => {
            setTableState({...tableState, isLoading: true})
            try {
                filterParams.status= filterParams.status ==="#"?undefined:filterParams.status;
                let result = await userService.filterUsers(filterParams, {
                    page: tableState.page,
                    size: tableState.pageSize,
                });
                addPaginationProperties(result);
            } catch (error) {
                toast.error("Lọc thất bại!");
                console.log(error);
            }
        }, [tableState.page, tableState.pageSize]);

    useEffect(() => {
        (async () => {
            try {
                await handleFilter(state.filter)
            } catch {
                toast.error("Lấy dữ liệu thất bại!");
            }
        })();
    }, [tableState.pageSize, tableState.page, tableState.forceReload, tableState.doFilter]);

    const toolBar = useMemo(
        () => ({
            toolbar: () => (
                <CustomToolbar
                    selectedRows={tableState.selectedRows}
                    handleFilter={doFilter}
                    forceReload={forceReload}
                />
            ),
        }),
        [tableState.selectedRows, tableState.forceReload],
    );
    return (
        <Box m="20px" display={"flex"} flexDirection={"column"}>
            <Header title="Danh sách người dùng"/>
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
                    pageSizeOptions={[10, 20, 50, 100]}
                    loading={tableState.isLoading}
                    rowSelection
                    onPaginationModelChange={(paginationModel) => {
                        setTableState((prev) => ({
                            ...prev,
                            ...paginationModel,
                        }))
                        console.log(paginationModel)
                    }

                    }
                    onRowEditStart={(row) =>
                        setTableState((prev) => ({
                            ...prev,
                            currentRow: row,
                        }))
                    }
                    filterMode="server"
                    paginationMode="server"
                    // checkboxSelection
                    {...tableState}
                />
            </Box>
        </Box>
    );
};

export default ManageUser;
