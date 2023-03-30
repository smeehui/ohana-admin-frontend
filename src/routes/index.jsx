import Dashboard from "~/scenes/dashboard";
import ManageUser from "~/pages/UserManagement/ListUser/ManageUser";
import config from "~/config/config";
import NewUser from "~/pages/UserManagement/NewUser/NewUser";
import ManagePost from "~/pages/PostManagement/ListPost/ManagePost";
import Report from "~/pages/Report/Report";

const {routes} = config;

const publicRoutes = [
    {path: routes.home, element: Dashboard},
    {path: routes.dashboard, element: Dashboard},
    {path: routes.userManagement,element: ManageUser},
    {path: routes.newUser, element: NewUser},
    {path: routes.postManagement, element: ManagePost},
    {path: routes.report, element: Report},
];

export {publicRoutes};
