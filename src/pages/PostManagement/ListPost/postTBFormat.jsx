import imageFormatter from "~/utils/imageFormater.jsx";
import dateTimeFormatter from "~/utils/dateTimeFormatter.jsx";
import noImage from "~/assets/img/no-img.png";
import { Link } from "react-router-dom";
import { config } from "~/config";
import { Image } from "@mui/icons-material";
import CldImage from "~/components/CldImage";

const { formatter } = dateTimeFormatter();

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
        renderCell: ({row})=><Link to={"/"}>{row.title}</Link>,
        flex: 1
    },
    {
        field: "thumbnailId",
        headerName: "ẢNH BÌA",
        renderCell: ({ row }) => {
            return <CldImage id={row.thumbnailId} />;
        },
        align: "center"
    },
    {
        field: "user",
        headerName: "TÊN NGƯỜI ĐĂNG",
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
        renderCell: ({row})=>{
            const {wardName} = row.location;
            return <strong>{wardName}</strong>
        },
        maxWidtd: "200px",
        flex: 1
    },
    {
        field: "location.line1",
        headerName: "ĐỊA CHỈ",
        sortable: true,
        renderCell: ({row})=>{
            const {line1} = row.location;
            return <strong>{line1}</strong>
        },
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
        editable: true,
        type: "singleSelect",
        valueOptions: ["PUBLISHED", "REFUSED"],
    },
];

export { columns };
