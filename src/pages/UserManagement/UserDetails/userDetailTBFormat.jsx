import {Link} from "react-router-dom";
import CldImage from "~/components/CldImage";
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
        field: "title",
        headerName: "BÀI VIẾT",
        sortable: true,
        flex: 1,
        renderCell: ({row})=><Link to={config.routes.postDetails + row.id}>{row.title}</Link>,
    },
    {
        field: "thumbnailId",
        headerName: "ẢNH BÌA",
        renderCell: (({row})=> <CldImage id={row.thumbnailId} w={90} h={90}/>),
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
        flex: 1
    },
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
       
    },
];

export { columns };
