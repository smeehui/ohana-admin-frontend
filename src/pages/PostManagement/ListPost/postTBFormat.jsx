
import { Link } from "react-router-dom";
import { config } from "~/config";
import CldImage from "~/components/CldImage";
import * as React from "react";
import GridCellExpand from "~/pages/PostManagement/ListPost/components/GridCellExpand";
import {publicRoutes} from "~/routes";
function renderCellExpand(params) {
    return (
        <GridCellExpand params={params} value={params.value || ''} width={params.colDef.computedWidth} />
    );
}

const columns = [
    {
        field: "id",
        headerName: "ID",
        align: "center",
        width: 50,
        sortable: true,
    },
    {
        field: "title",
        headerName: "BÀI VIẾT",
        sortable: true,
        renderCell: ({row})=><Link to={config.routes.postDetails + row.id}>{row.title}</Link>,
        flex: 1,
    },
    {
        field: "thumbnailId",
        headerName: "ẢNH BÌA",
        renderCell: renderCellExpand,
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
        flex: 1
    },
    {
        field: "location.wardName",
        headerName: "PHƯỜNG/QUẬN",
        sortable: true,
        renderCell: ({row})=>row.location.wardName,
        maxWidtd: "200px",
        flex: 1
    },
    {
        field: "location.line1",
        headerName: "ĐỊA CHỈ",
        sortable: true,
        renderCell: ({row})=>row.location.line1,
        flex: 1
    },
    {
        field: "createdAt",
        headerName: "NGÀY ĐĂNG",
        sortable: true,
        type: "dateTime",
        valueGetter: ({value})=> value && new Date(value),
    }
    ,
    {
        field: "descriptionContent",
        headerName: "MÔ TẢ",
        sortable: true,
        renderCell: renderCellExpand
    }
    ,
    {
        field: "category",
        headerName: "DANH MỤC",
        sortable: true,
        renderCell: ({row})=>{
            const {category} = row;
            return <strong>{category.title}</strong>
        },
        flex: 1
    },
    {
        field: "status",
        headerName: "Trạng thái",
        sortable: true,
        editable: true,
        type: "singleSelect",
        valueOptions: ["PUBLISHED", "REFUSED"],
    },
];

export { columns };
