import { Link } from "react-router-dom";
import { config } from "~/config";
import * as React from "react";
import GridCellExpand from "~/pages/PostManagement/ListPost/components/GridCellExpand";

function renderCellExpand(params) {
  return (
    <GridCellExpand
      params={params}
      value={params.value || ""}
      width={params.colDef.computedWidth}
    />
  );
}

const columns = [
  {
    field: "id",
    headerName: "ID",
    align: "center",
    width: 50,
    sortable: true,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "title",
    headerName: "BÀI VIẾT",
    sortable: true,
    renderCell: ({ row }) => (
      <Link to={config.routes.postDetails + row.id}>{row.title}</Link>
    ),
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "thumbnailId",
    headerName: "ẢNH BÌA",
    renderCell: renderCellExpand,
    headerAlign: "center",
  },
  {
    field: "user",
    headerName: "NGƯỜI DÙNG",
    renderCell: ({ row }) => {
      return (
        <Link to={config.routes.userDetails + `${row.user.id}`}>
          {row.user.fullName}
        </Link>
      );
    },
    sortable: true,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "location.wardName",
    headerName: "PHƯỜNG/QUẬN",
    sortable: true,
    renderCell: ({ row }) => row.location.wardName,
    maxWidtd: "200px",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "location.line1",
    headerName: "ĐỊA CHỈ",
    sortable: true,
    renderCell: ({ row }) => row.location.line1,
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "createdAt",
    headerName: "NGÀY ĐĂNG",
    sortable: true,
    type: "dateTime",
    valueGetter: ({ value }) => value && new Date(value),
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "descriptionContent",
    headerName: "MÔ TẢ",
    sortable: true,
    renderCell: renderCellExpand,
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "category",
    headerName: "DANH MỤC",
    sortable: true,
    renderCell: ({ row }) => {
      const { category } = row;
      return <strong>{category.title}</strong>;
    },
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "status",
    headerName: "Trạng thái",
    sortable: true,
    editable: true,
    type: "singleSelect",
    valueOptions: ["PUBLISHED", "REFUSED"],
    headerAlign: "center",
    align: "center",
  },
];

export { columns };
