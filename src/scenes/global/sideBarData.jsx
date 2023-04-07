import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";


import {config} from "~/config";
import {AdminPanelSettingsOutlined, PostAddOutlined, Category} from "@mui/icons-material";

const {routes} = config;
const AdminIcon = () => <AdminPanelSettingsOutlined/>
const UserGroupIcon = () => <PeopleOutlinedIcon/>
const PostIcon = () => <PostAddOutlined/>
const CateIcon = () => <Category/>
export const sideBarData = [
    {
        title: "Quản trị viên",
        icon: AdminIcon,
        subMenu: [
            {
                title: "Danh sách khách hàng",
                path: routes.userManagement,
            },
        ],
    },
    {
        title: "Sản phẩm",
        icon: CateIcon,
        subMenu: [
            {
                title: "Danh mục sản phẩm",
                path: routes.category,
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
