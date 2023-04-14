import {config} from "~/config";
import {AdminPanelSettingsOutlined, AutoAwesomeOutlined, CategoryOutlined, PostAddOutlined} from "@mui/icons-material";

const {routes} = config;
const AdminIcon = () => <AdminPanelSettingsOutlined/>
const PostIcon = () => <PostAddOutlined/>
const CateIcon = () => <CategoryOutlined/>
const UtilIcon = () => <AutoAwesomeOutlined/>
export const sideBarData = [
    {
        title: "Quản trị viên",
        icon: AdminIcon,
        subMenu: [
            {
                title: "Danh sách người dùng",
                path: routes.userManagement,
            },
        ],
    },
    {
        title: "Danh mục phòng",
        icon: CateIcon,
        path: routes.category
    },
    {
        title: "Tiện ích",
        icon: UtilIcon,
        path: routes.utilityManagement
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
