import {Link} from "react-router-dom";
import {config} from "~/config";

const columns = [
    {
        field: "id",
        headerName: "#",
        width: 50,
        type: "numericColumn",
        sortable: true,
    },
    {
        field: "fullName",
        headerName: "Họ tên",
        sortable: true,
        flex: 1,
        renderCell: ({ row }) => {
            return (
                <Link to={config.routes.userDetails + `${row.id}`}>
                    {row.fullName}
                </Link>
            );
        },
    },
    {
        field: "email",
        headerName: "Email",
        sortable: true,
        flex: 1,
    },
    {
        field: "description",
        headerName: "Mô tả",
        sortable: true,
        flex: 1,
    },
    {
        field: "phone",
        headerName: "Số ĐT",
        sortable: true,
    },
    {
        field: "address",
        headerName: "Địa chỉ",
        sortable: true,
        flex: 1,
        editable: false,
    },
    {
        field: "status",
        headerName: "Trạng thái",
        filter: true,
        editable: true,
        sortable: true,
        width: 150,
        type: "singleSelect",
        valueOptions: ["ACTIVATED", "DEACTIVATED"],
    },
];

export { columns };
