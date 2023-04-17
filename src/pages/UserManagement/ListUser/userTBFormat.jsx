import {Link} from "react-router-dom";
import {config} from "~/config";
import {UserStatus} from "~/pages/UserManagement/constants/UserStatus";

const columns = [
  {
    field: "id",
    headerName: "ID",
    type: "numericColumn",
    sortable: true,
    headerAlign: "center",
    align: "center",
    width: 60,
  },
  {
    field: "fullName",
    headerName: "Họ tên",
    sortable: true,
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderCell: ({ row }) => {
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
    align: "center",
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
    field: "address",
    headerName: "Địa chỉ",
    sortable: true,
    flex: 1,
    editable: false,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "role",
    headerName: "Role",
    filter: true,
    sortable: true,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "status",
    headerName: "Trạng thái",
    filter: true,
    editable: true,
    sortable: true,
    width: 150,
    type: "singleSelect",
    valueOptions: [UserStatus.ACTIVATED,UserStatus.DEACTIVATED],
    headerAlign: "center",
    align: "center",
  },
];

export { columns };
