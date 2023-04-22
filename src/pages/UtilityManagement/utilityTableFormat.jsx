import React, {useContext} from "react";
import {utilitiesService} from "~/service";
import {Button, Stack, Typography} from "@mui/material";
import {EditOutlined, VisibilityOffOutlined, VisibilityOutlined} from "@mui/icons-material";
import {UtilTableContext} from "~/pages/UtilityManagement/ManageUtility";
import {UtilityStatus} from "~/pages/UtilityManagement/data/utilityConstants";

function ActionButton({ row }) {
  const { pageState, setPageState } = useContext(UtilTableContext);
  const handleEdit = async () => {
    const { id } = row;
    const result = await utilitiesService.findById(id);
    setPageState({
      ...pageState,
      utility: result,
      isModalOpen: true,
      mode: "update",
    });
  };

  const handleChangeStatus = async () => {
    const { id, status } = row;
    const result = await utilitiesService.findById(id);
    setPageState({
      ...pageState,
      isDelModalOpen: true,
      utility: result,
      utilModifyingStatus:
        status === UtilityStatus.SHOW
          ? UtilityStatus.HIDDEN
          : UtilityStatus.SHOW,
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
                {
                    row.status === UtilityStatus.SHOW
                        ? (
                            <Button
                                onClick={handleChangeStatus}
                                size="small"
                                variant="contained"
                                color="error"
                                value={UtilityStatus.HIDDEN}
                                sx={{minWidth: 70}}
                            >
                                <VisibilityOffOutlined  /> Ẩn
                            </Button>
                        )
                        : (
                            <Button
                                onClick={handleChangeStatus}
                                size="small"
                                variant="contained"
                                color="success"
                                value={UtilityStatus.SHOW}
                                sx={{minWidth: 70}}

                            >
                                <VisibilityOutlined  /> Hiện
                            </Button>
                        )
                }
            </Stack>
        </>
    );
}
const columns = [
  {
    field: "id",
    headerName: "ID",
    headerAlign: "center",
    align: "center",
    width: 60,
  },
  {
    field: "name",
    headerName: "Tên",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "icon",
    headerName: "Icon",
    headerAlign: "center",
    align: "center",
    renderCell: ({ row }) => (
      <Typography fontSize={28}>
        <i className={row.icon}></i>
      </Typography>
    ),
  },
  {
    field: "priority",
    headerName: "Độ ưu tiên",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "status",
    headerName: "Trạng thái",
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderCell: ({row})=> row.status === UtilityStatus.HIDDEN? "Đã ẩn": "Đang hiển thị"
  },
  {
    field: "action",
    headerName: "Quản lý",
    flex: 1,
    renderCell: ({ row }) => <ActionButton row={row} />,
    align: "center",
    headerAlign: "center",
  },
];

export { columns };