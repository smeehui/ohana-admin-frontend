import Dashboard from "~/scenes/dashboard";
import ManageUser from "~/pages/UserManagement/ListUser/ManageUser";
import ManagePost from "~/pages/PostManagement/ListPost/ManagePost";
import Report from "~/pages/Report/Report";
import UserDetails from "~/pages/UserManagement/UserDetails/UserDetails";
import config from "~/config/config";
import PostDetails from "~/pages/PostManagement/PostDetails/PostDetails";
import Category from "~/pages/CategoryManagement/Category";
import GlobalLayout from "~/scenes/global/GlobalLatyout";
import LoginRegLayout from "~/scenes/global/LoginRegLayout";
import Login from "~/pages/Login/Login";
import ManageUtility from "~/pages/UtilityManagement/ManageUtility";

const { routes } = config;

const publicRoutes = [
    {path: routes.home, element: Dashboard,layout: GlobalLayout},
    {path: routes.login, element: Login,layout: LoginRegLayout},
    {path: routes.dashboard, element: Dashboard,layout: GlobalLayout},
    {path: routes.userManagement, element: ManageUser,layout: GlobalLayout},
    {path: routes.userDetails + ":id", element: UserDetails,layout: GlobalLayout},
    {path: routes.postManagement, element: ManagePost,layout: GlobalLayout},
    {path: routes.postDetails + ":id", element: PostDetails,layout: GlobalLayout},
    {path: routes.report, element: Report,layout: GlobalLayout},
    {path: routes.category, element: Category,layout: GlobalLayout},
    {path: routes.utilityManagement, element: ManageUtility,layout: GlobalLayout},
];

export { publicRoutes };
