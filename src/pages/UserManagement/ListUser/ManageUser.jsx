import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "~/theme";
import Header from "~/components/Header";
import { columns } from "./userTBFormat";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    getAllUsers,
    updateUserById,
} from "~/pages/UserManagement/service/userService";
import { toast, ToastContainer } from "react-toastify";
import { AgGridReact } from "ag-grid-react";
import { Title } from "@mui/icons-material";

const ManageUser = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data, setData] = useState([]);
    const [reloadData, setReloadData] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const apiRef = useRef();
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

    useEffect(() => {
        return async () => {
            try {
                let result = await getAllUsers();
                setData(result);
            } catch (err) {
                toast.error("Lấy dữ liệu thất bại");
            }
        };
    }, [reloadData]);

    const handleCellValueChanged = useCallback(async (event) => {
        const { oldValue, newValue, data, colDef } = event;
        if (oldValue === newValue) return;
        try {
            let user = await updateUserById(data.id, {
                id: data.id,
                [colDef.field]: newValue,
            });
            toast.success("Chỉnh sửa thành công!");
        } catch (err) {
            toast.error("Chỉnh sửa thất bại!");
            setReloadData((reloadData) => !reloadData);
        } finally {
            console.log(apiRef.current.api);
            apiRef.current.api.refreshCells();
        }
    });
    const handleSelectionChanged = useCallback((event) => {
        setSelectedRows(apiRef.current.api.getSelectedRows());
    });
    console.log(selectedRows.length);
    return (
        <Box m="20px">
            <ToastContainer {...toastOption} />
            <Header
                title="Danh sách"
                subtitle={
                    <Box display={"flex"}>
                        <Box flex={1}> Danh sách quản trị viên</Box>
                        {selectedRows.length >= 1 ? (
                            <span className="float-end">
                                <Button
                                    style={{
                                        backgroundColor: colors.redAccent[500],
                                        color: colors.grey[100],
                                        fontWeight: "bold",
                                    }}
                                >
                                    Delete
                                </Button>
                            </span>
                        ) : null}
                    </Box>
                }
            />
            <Box
                m="40px 0 0 0"
                height="75vh"
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
                <AgGridReact
                    className={
                        theme.palette.mode === "dark"
                            ? "ag-theme-alpine-dark"
                            : "ag-theme-alpine"
                    }
                    columnDefs={columns}
                    rowData={data}
                    pagination
                    editable="true"
                    editType="cell"
                    onCellValueChanged={handleCellValueChanged}
                    onSelectionChanged={handleSelectionChanged}
                    rowSelection={"multiple"}
                    sidebar
                    ref={apiRef}
                />
            </Box>
        </Box>
    );
};

export default ManageUser;
