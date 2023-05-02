import {Link} from "react-router-dom";
import {config} from "~/config";
import {UserStatus} from "~/pages/UserManagement/constants/UserStatus";

const userTableColumns = [
        // {
        //   field: "id",
        //   headerName: "ID",
        //   type: "numericColumn",
        //   sortable: true,
        //   headerAlign: "center",
        //   align: "center",
        //   width: 60,
        // },
        {
            field: "fullName",
            headerName: "Họ tên",
            sortable: true,
            flex: 1,
            headerAlign: "center",
            align: "center",
            renderCell: ({row}) => {
                return (
                    <Link to={config.routes.userDetails + `${row.id}`}>{row.fullName}</Link>
                );
            },
        },
        {
            field: "email",
            headerName: "Email",
            sortable: true,
            flex: 1,
            headerAlign: "center",
        },
        {
            field: "description",
            headerName: "Mô tả",
            sortable: true,
            flex: 1,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "phone",
            headerName: "Số ĐT",
            sortable: true,
        },
        {
            field: "location",
            headerName: "Địa chỉ",
            sortable: true,
            flex: 1,
            editable: false,
            headerAlign: "center",
            align: "center",
            renderCell: ({ row }) => {
                if (row.location) return `${row.location.line1}, ${row.location.wardName}, ${row.location.districtName}`
                return null;
            },
        },
        // {
        //   field: "role",
        //   headerName: "Role",
        //   filter: true,
        //   sortable: true,
        //   headerAlign: "center",
        //   align: "center",
        // },
        {
            field: "status",
            headerName: "Trạng thái",
            filter: true,
            // editable: true,
            sortable: true,
            width: 150,
            headerAlign: "center",
            align: "center",
            renderCell: ({row}) =>
                row.status === UserStatus.DEACTIVATED
                    ? "Đã huỷ kích hoạt"
                    : row.status === UserStatus.ACTIVATED
                        ? "Đang hoạt động"
                        : "Đang xác nhận email"
        },
    ]
;

export {userTableColumns};
