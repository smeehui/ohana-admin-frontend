import imageFormatter from "~/utils/imageFormater.jsx";
import dateTimeFormatter from "~/utils/dateTimeFormatter.jsx";
import noImage from "~/assets/img/no-img.png"

const {formatter} = dateTimeFormatter();

const columns = [
    {
        name: "BÀI VIẾT",
        selector: (row) => {
            const {thumbnailUrl} = row;
            const {setThumbnail} = imageFormatter();
            let thumbnail;
            if (thumbnailUrl) {
                thumbnail = setThumbnail(thumbnailUrl.fileUrl);
            }
            return (
                <>
                    {thumbnail
                        ? (<img className="rounded-circle p-1" src={thumbnail}/>)
                        : (<img className="rounded-circle p-1" src={noImage}/>)
                    }
                    {row.title}
                </>
            );
        },
        sortable: true,
    },
    {
        name: "THÀNH PHỐ",
        selector: (row) => {
            const { locationDetail, wardName, districtName, provinceName } =
                row.location;
            return `${locationDetail && locationDetail + " ,"}${
                wardName && wardName + " ,"
            }${districtName && districtName + " ,"}${
                provinceName && provinceName
            }`;
        },
        sortable: true,
    },
    {
        name: "TÊN NGƯỜI DÙNG",
        selector: (row) => {
            const {fullName} = row.user;
            return fullName;
        },
        sortable: true,
    },
    {
        name: "NGÀY ĐĂNG",
        selector: (row) => formatter(row.createdAt),
        sortable: true,
    },
    {
        name: "TRẠNG THÁI",
        selector: (row) => {
            switch (row.status) {
                case "REFUSED":
                    return "Từ chối";
                case "PUBLISHED":
                    return "Đã đăng";
            }
        },
        sortable: true,
    },
];
// const userData = [
//     {
//         id: 1,
//         fullName: "Beetlejuice",
//         email: "blj@co.cc",
//         password: "smee@9123",
//     },
//     {
//         id: 2,
//         fullName: "Ghostbusters",
//         email: "gbst@co.cc",
//         password: "smee@9123",
//     },
//     {
//         id: 3,
//         fullName: "Ghostbusters",
//         email: "gbst@co.cc",
//         password: "smee@9123",
//     },
//     {
//         id: 4,
//         fullName: "Ghostbusters",
//         email: "gbst@co.cc",
//         password: "smee@9123",
//     },
//     {
//         id: 5,
//         fullName: "Ghostbusters",
//         email: "gbst@co.cc",
//         password: "smee@9123",
//     },
//     {
//         id: 6,
//         fullName: "Ghostbusters",
//         email: "gbst@co.cc",
//         password: "smee@9123",
//     },
//     {
//         id: 7,
//         fullName: "Ghostbusters",
//         email: "gbst@co.cc",
//         password: "smee@9123",
//     },
//     {
//         id: 8,
//         fullName: "Ghostbusters",
//         email: "gbst@co.cc",
//         password: "smee@9123",
//     },
//     {
//         id: 9,
//         fullName: "Ghostbusters",
//         email: "gbst@co.cc",
//         password: "smee@9123",
//     },
//     {
//         id: 10,
//         fullName: "Ghostbusters",
//         email: "gbst@co.cc",
//         password: "smee@9123",
//     },
//     {
//         id: 11,
//         fullName: "Ghostbusters",
//         email: "gbst@co.cc",
//         password: "smee@9123",
//     },
//     {
//         id: 12,
//         fullName: "Ghostbusters",
//         email: "gbst@co.cc",
//         password: "smee@9123",
//     },
//     {
//         id: 13,
//         fullName: "Ghostbusters",
//         email: "gbst@co.cc",
//         password: "smee@9123",
//     },
//     {
//         id: 14,
//         fullName: "Ghostbusters",
//         email: "gbst@co.cc",
//         password: "smee@9123",
//     },
// ];

export { columns };
