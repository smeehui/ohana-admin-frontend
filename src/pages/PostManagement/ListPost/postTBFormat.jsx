import { Link } from "react-router-dom";
import { config } from "~/config";
import * as React from "react";
import GridCellExpand from "~/pages/PostManagement/ListPost/components/GridCellExpand";
import { PostStatus } from "./constants/PostStatus";

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
    width: 60,
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
    align: "center",
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
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  {
    field: "location.line1",
    headerName: "ĐỊA CHỈ",
    sortable: true,
    renderCell: ({ row }) => row.location.line1,
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: "NGÀY ĐĂNG",
    sortable: true,
    type: "dateTime",
    valueGetter: ({ value }) => value && new Date(value),
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  {
    field: "descriptionContent",
    headerName: "MÔ TẢ",
    sortable: true,
    renderCell: renderCellExpand,
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  {
    field: "category",
    headerName: "DANH MỤC",
    sortable: true,
    renderCell: ({ row }) => {
      const { category } = row;
      return <strong>{category.title}</strong>;
    },
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  {
    field: "status",
    headerName: "Trạng thái",
    sortable: true,
    editable: true,
    type: "singleSelect",
    headerAlign: "center",
    align: "center",
    renderCell: ({ row }) => {
      switch (row.status) {
        case PostStatus.PUBLISHED:
          return "Đã đăng";
        case PostStatus.REFUSED:
          return "Đã thu hồi";
        case PostStatus.PENDING_REVIEW:
          return "Đang chờ duyệt";
        case PostStatus.DRAFT:
          return "Nháp";
        case PostStatus.OVER_ROOM:
          return "Đã hết phòng";
        default:
          return "";
          break;
      }
    },
    valueOptions: ["PUBLISHED", "REFUSED"],
  },
];

export { columns };
