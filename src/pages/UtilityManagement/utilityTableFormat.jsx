import React, {useContext, useState} from "react";
import {toast} from "react-toastify";
import {categoryService, utilitiesService} from "~/service";
import {Button, Stack, Typography} from "@mui/material";
import {BlockOutlined, Delete, Edit, EditOutlined} from "@mui/icons-material";
import {UtilTableContext} from "~/pages/UtilityManagement/ManageUtility";

function ActionButton({ row }) {
    const [state, setState] = useState({
    });
    const {pageState,setPageState} =useContext(UtilTableContext);

    const handleSubmit = async () => {
        try {
        } catch (error) {
            toast.error(`Cập nhật thất bại`);
            console.log(error);
        }
    };
    const handleEdit = async () => {
        const { id } = row;
        const result = await utilitiesService.findById(id);
        setPageState({...pageState,utility: result, isEditModalOpen: true})


    };
    const handleChangeStatus = async () => {
        const { id } = row;

        const result = await categoryService.findById(id);

        setState({
            ...state,
            open: true,
            category: result,
        });
    };

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
            <Stack spacing={1} direction="row">
                <Button
                    onClick={handleEdit}
                    size="small"
                    variant="contained"
                    color="warning"
                >
                    <EditOutlined /> Sửa
                </Button>
                <Button
                    onClick={handleChangeStatus}
                    size="small"
                    variant="contained"
                    color="error"
                >
                    <BlockOutlined /> Tắt
                </Button>
            </Stack>
        </>
    );
}
const columns = [
    {
        field: "id",
        headerName: "ID",
    },
    {
        field: "name",
        headerName: "Tên",
        flex: 1,
    },
    {
        field: "icon",
        headerName: "Icon",
        renderCell: ({row})=><Typography fontSize={28}><i className={row.icon}></i></Typography>,
    },
    {
        field: "priority",
        headerName:"Độ ưu tiên" ,
        flex: 1,
    },
    {
        field: "status",
        headerName: "Trạng thái" ,
        flex: 1,
    },
    {
        field: "action",
        headerName: "Quản lý" ,
        flex: 1,
        renderCell: ({row})=> <ActionButton row={row}/>,
        align: "center",
        headerAlign: 'center',
    },

];

export { columns };