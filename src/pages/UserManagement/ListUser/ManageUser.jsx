import { Box, useTheme } from "@mui/material";
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { tokens } from "~/theme";
import Header from "~/components/Header";
import { columns } from "./userTBFormat";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    getAllUsers,
    updateUserById,
} from "~/pages/UserManagement/service/userService";
import { toast, ToastContainer } from "react-toastify";

function useApiRef() {
    const apiRef = useRef(null);
    const _columns = useMemo(
      () =>
        columns.concat({
          field: "__HIDDEN__",
          width: 0,
          renderCell: (params) => {
            apiRef.current = params.api;
            return null;
          }
        }),
      [columns]
    );
  
    return { apiRef, columns: _columns };
  }

const ManageUser = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data, setData] = useState([]);
    const [currRow, setCurrRow] = useState({});
    const { apiRef, columns } = useApiRef();
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
    }, []);

    const handleUpdateUser = async (params) => {
        const { id, field, value } = params;
        if (currRow[field] === value) return;
        try {
            let user = await updateUserById(id, { id: id, [field]: value });
            toast.success("Chỉnh sửa thành công!");
        } catch (err) {
            toast.error("Chỉnh sửa thất bại!");
            console.log(apiRef.current);
            // apiRef.current.startCellEditMode({id,field,ignoreModifications:true})
        }
    };

    return (
        <Box m="20px">
            <ToastContainer {...toastOption} />
            <Header title="INVOICES" subtitle="List of Invoice Balances" />
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
                <DataGrid
                    apiRef={apiRef}
                    checkboxSelection
                    rows={data}
                    columns={columns}
                    onCellEditCommit={(params, e) => {
                        handleUpdateUser(params);
                    }}
                    onCellEditStart={({ row }) => {
                        setCurrRow(row);
                    }}
                />
            </Box>
        </Box>
    );
};

export default ManageUser;
