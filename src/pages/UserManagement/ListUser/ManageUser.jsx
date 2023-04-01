import { Box, useTheme } from "@mui/material";
import { tokens } from "~/theme";
import Header from "~/components/Header";
import { columns } from "./userTBFormat";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
    filterUsers,
    getAllUsers,
    updateUserById,
} from "~/pages/UserManagement/service/userService";
import { toast, ToastContainer } from "react-toastify";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import CustomToolbar from "./CustomToolbar";

const ManageUser = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const apiRef = useGridApiRef();

    const [currRow, setCurrRow] = useState({});
    const [tableState, setTableState] = useState({
        pageSize: 10,
        page: 0,
        rowCount: 0,
        rows: [],
        selectedRows: [],
    });
    const [isLoading, setIsLoading] = useState(false);
    const [reloadData, setReloadData] = useState(false);

    const [filter, setFilter] = useState({});

    const toastOption = useMemo(() => {
        return {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: theme.palette.mode,
        };
    }, []);

    const addPaginationProperties = (result) => {
        const { totalElements, number, size, content } = result;
        setTableState((prev) => ({
            ...prev,
            rowCount: totalElements,
            pageSize: size,
            page: number,
            rows: content,
        }));
        setIsLoading(false);
    };

    const handleCellValueChanged = useCallback(async (row) => {
        let result = await updateUserById(row.id, row);
        toast.success("Chỉnh sửa thành công!");
        return row;
    });

    const handleProcessRowUpdateError = useCallback(async (event) => {
        toast.error("Chỉnh sửa thất bại!");
    }, []);
    useEffect(() => {
        (async () => {
            setIsLoading(true);
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
    }, [tableState.pageSize, tableState.page, reloadData]);
    const handleFilter = async ({ quickFilterValues }) => {
        let value = quickFilterValues.join("");
        const filter = { keyword: value };

        try {
            let result = await filterUsers(filter, {
                page: tableState.page,
                size: tableState.pageSize,
            });
            addPaginationProperties(result);
        } catch (error) {
            toast.error("Filter errror!");
        }
    };
    return (
        <Box m="20px">
            <ToastContainer {...toastOption} />
            <Header title="Danh sách" />
            <Box
                width={"70vw"}
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
                    slots={{
                        toolbar: () => (
                            <CustomToolbar
                                colors={colors}
                                selectedRows={tableState.selectedRows}
                            />
                        ),
                    }}
                    columns={columns}
                    pagination
                    loading={isLoading}
                    processRowUpdate={handleCellValueChanged}
                    onProcessRowUpdateError={handleProcessRowUpdateError}
                    onRowDoubleClick={(row) => setCurrRow(row.row)}
                    rowSelection
                    pageSizeOptions={[10, 20, 50, 100]}
                    paginationModel={tableState}
                    onPaginationModelChange={(paginationModel) =>
                        setTableState((prev) => ({
                            ...prev,
                            ...paginationModel,
                        }))
                    }
                    filterMode="server"
                    checkboxSelection
                    paginationMode="server"
                    {...tableState}
                    onFilterModelChange={handleFilter}
                    onRowSelectionModelChange={(rows) =>
                        setTableState((prev) => ({
                            ...prev,
                            selectedRows: [...rows],
                        }))
                    }
                />
            </Box>
        </Box>
    );
};

export default ManageUser;
