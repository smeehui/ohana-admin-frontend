// import { HOME, DASHBOARD, MANAGE_USER, MANAGE_PRODUCT } from "./routes" ;

import {
    DASHBOARD,
    HOME,
    MANAGE_POST,
    MANAGE_USER,
    REPORT,
    USER_DETAILS,
} from "./routes";

const config = {
    routes: {
        home: HOME,
        dashboard: DASHBOARD,
        userManagement: MANAGE_USER,
        userDetails: USER_DETAILS,
        postManagement: MANAGE_POST,
        report: REPORT,
    },
};
export default config;
