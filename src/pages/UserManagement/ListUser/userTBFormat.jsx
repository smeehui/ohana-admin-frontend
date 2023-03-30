const columns = [
    {
        field: "fullName",
        headerName: "Họ tên",
        flex: 1,
        cellClassName: "name-column--cell",
        editable: true,
    },
    {
        field: "email",
        headerName: "Email",
        flex: 1,
        cellClassName: "email-column--cell",
        editable: true,
    },
    {
        field: "description",
        headerName: "Mô tả",
        flex: 1,
        cellClassName: "desc-column--cell",
        editable: true,
    },
    {
        field: "phone",
        headerName: "Số ĐT",
        flex: 1,
        cellClassName: "phone-column--cell",
        editable: true,
    },
    {
        field: "address",
        headerName: "Địa chỉ",
        flex: 1,
        cellClassName: "address-column--cell",
        editable: true,
    },
    {
        field: "role",
        headerName: "Role",
        flex: 1,
        cellClassName: "role-column--cell",
        type: "",
        editable: true,
    },
    {
        field: "status",
        headerName: "Trạng thái",
        flex: 1,
        cellClassName: "status-column--cell",
        editable: true,
    },
]

export {columns};
