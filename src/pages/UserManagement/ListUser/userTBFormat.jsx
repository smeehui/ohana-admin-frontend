import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useGridApiContext } from "@mui/x-data-grid";

const StatusRender = ({ value }) => (
    <span>
        {value === "CONFIRM_EMAIL"
            ? "Đang xác thực email"
            : value === "ACTIVATED"
            ? "Đã kích hoạt"
            : "Đã huỷ kích hoạt"}
    </span>
);
const columns = [
    {
        field: "id",
        headerName: "#",
        width: 90,
        type: "numericColumn",
        sortable: true,
    },
    {
        field: "fullName",
        headerName: "Họ tên",
        filter: true,
        editable: true,
        sortable: true,
        flex: 1,
    },
    {
        field: "email",
        headerName: "Email",
        filter: true,
        editable: true,
        sortable: true,
        flex: 1,
    },
    {
        field: "description",
        headerName: "Mô tả",
        filter: true,
        editable: true,

        sortable: true,
        flex: 1,
    },
    {
        field: "phone",
        headerName: "Số ĐT",
        filter: true,
        editable: true,
        sortable: true,
    },
    {
        field: "address",
        headerName: "Địa chỉ",
        filter: true,
        editable: true,
        sortable: true,
        flex: 1,
    },
    {
        field: "role",
        headerName: "Role",
        filter: true,
        editable: true,
        sortable: true,
        type: "singleSelect",
        valueOptions: ["ADMIN", "USER"],
    },
    {
        field: "status",
        headerName: "Trạng thái",
        filter: true,
        editable: true,
        sortable: true,
        width: 150,
        type: "singleSelect",
        valueOptions: ["CONFIRM_EMAIL", "ACTIVATED", "NOT_ACTIVATED"],
    },
];

export { columns };
