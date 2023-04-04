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
                title: "Danh sách",
                path: routes.userManagement,
            },
        ],
    },
    {
        title: "Bài viết",
        icon: PostIcon,
        subMenu: [
            {
                title: "Danh sách bài viết",
                path: routes.postManagement,
            }
        ],
    },

];
