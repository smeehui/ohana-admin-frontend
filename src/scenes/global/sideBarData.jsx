import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";


import {config} from "~/config";
import {AdminPanelSettingsOutlined, PostAddOutlined} from "@mui/icons-material";

const {routes} = config;
const AdminIcon = () => <AdminPanelSettingsOutlined/>
const UserGroupIcon = () => <PeopleOutlinedIcon/>
const PostIcon = () => <PostAddOutlined/>
export const sideBarData = [
    {
        title: "Quản trị viên",
        icon: AdminIcon,
        subMenu: [
            {
                title: "Thêm mới",
                path: routes.newUser,
            },
            {
                title: "Danh sách",
                path: routes.userManagement,
            },
        ],
    },
    {
        title: "Người dùng",
        icon: UserGroupIcon,
    },
    {
        title: "Bài viết",
        icon: PostIcon,
        subMenu: [
            {
                title: "Chưa phê duyệt",
                path: routes.postManagement,
            },
            {
                title: "Đã phê duyệt",
                path: routes.userManagement,
            },
        ],
    },

];
