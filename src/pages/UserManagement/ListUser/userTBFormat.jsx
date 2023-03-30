const RoleRender = ({ value }) => (
    <span>{value === "ADMIN" ? "Quản trị viên" : "Người dùng"}</span>
);
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
        checkboxSelection: true,
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
    },
    {
        field: "email",
        headerName: "Email",
        filter: true,
        editable: true,
        sortable: true,
    },
    {
        field: "description",
        headerName: "Mô tả",
        filter: true,
        editable: true,

        sortable: true,
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
    },
    {
        field: "role",
        headerName: "Role",
        filter: true,
        editable: true,
        sortable: true,
        cellEditor: "agSelectCellEditor",
        cellRenderer: RoleRender,
        cellEditorParams: {
            values: ["ADMIN", "USER"],
        },
    },
    {
        field: "status",
        headerName: "Trạng thái",
        filter: true,
        editable: true,
        sortable: true,
        cellRenderer: StatusRender,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
            values: ["CONFIRM_EMAIL", "ACTIVATED", "NOT_ACTIVATED"],
        },
    },
];

export { columns };
