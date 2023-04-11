
import {
    DASHBOARD,
    HOME,
    MANAGE_POST,
    MANAGE_USER,
    POST_DETAILS,
    REPORT,
    USER_DETAILS,
    CATEGORY, LOGIN,
} from "./routes";

const config = {
    routes: {
        home: HOME,
        login: LOGIN,
        dashboard: DASHBOARD,
        userManagement: MANAGE_USER,
        userDetails: USER_DETAILS,
        postManagement: MANAGE_POST,
        postDetails: POST_DETAILS,
        report: REPORT,
        category: CATEGORY,
    },
};
export default config;
