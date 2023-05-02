import { Link } from "react-router-dom";
import { config } from "~/config";
import * as React from "react";
import GridCellExpand from "~/pages/PostManagement/ListPost/components/GridCellExpand";
import { PostStatus } from "./constants/PostStatus";
import {Typography} from "@mui/material";
import dateTimeFormatter from "~/utils/dateTimeFormatter";

function renderCellExpand(params) {
  return (
    <GridCellExpand
      params={params}
      value={params.value || ""}
      width={params.colDef.computedWidth}
    />
  );
}

const {formatter} = dateTimeFormatter();

const postTableColumns = [
  // {
  //   field: "id",
  //   headerName: "ID",
  //   align: "center",
  //   width: 60,
  //   sortable: true,
  //   headerAlign: "center",
  // },
  {
    field: "title",
    headerName: "BÀI VIẾT",
    sortable: true,
    renderCell: ({ row }) => (
      <Link title={row.title} to={config.routes.postDetails + row.id}><Typography textAlign={"start"}>{row.title}</Typography></Link>
    ),
    flex: 1,
    headerAlign: "center",
  },
  {
    field: "thumbnailId",
    headerName: "ẢNH BÌA",
    renderCell: renderCellExpand,
    align: "center",
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
    align: "center",
    headerAlign: "center",
  },
  {
    field: "location.line1",
    headerName: "ĐỊA CHỈ",
    sortable: true,
    renderCell: ({ row }) => (`${row.location.line1}, ${row.location.wardName}, ${row.location.districtName}`),
    headerAlign: "center",
    flex: 1
  },
  {
    field: "createdAt",
    headerName: "NGÀY ĐĂNG",
    sortable: true,
    align: "center",
    headerAlign: "center",
    renderCell: ({row})=>(formatter(row.createdAt))
  },
  {
    field: "descriptionContent",
    headerName: "MÔ TẢ",
    sortable: true,
    renderCell: renderCellExpand,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "status",
    headerName: "Trạng thái",
    sortable: true,
    // editable: true,
    type: "singleSelect",
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
        case PostStatus.DELETED:
          return "Đã xoá";
        default:
          return "";
          break;
      }
    },
    valueOptions: ["PUBLISHED", "REFUSED"],
    align: "center",
    headerAlign: "center",
  },
];

export { postTableColumns };
