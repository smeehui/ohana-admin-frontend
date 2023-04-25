export const PORT = 8080;
export const FE_PORT = 5173
const DOMAIN = "http://localhost:"
const MAIN_API = DOMAIN + PORT;
const MIDDLE_PATH = "";
const BASE_PROVINCE_API = "https://vapi.vnappmob.com/api/province"

export const ADMIN_LOGIN = MAIN_API + MIDDLE_PATH + "/api/auth/sign-in"
export const ADMIN_LOGOUT = MAIN_API + MIDDLE_PATH + "/api/auth/sign-out"

const USERS = MAIN_API + MIDDLE_PATH + "/api/users";
export const GET_ALL_USERS = USERS + "";
export const USER_DETAILS = USERS + "";
export const FILTER_USER = USERS + "";
export const UPDATE_USER_STATUS = USERS + "";
export const ACTIVATE_USER_ALL = USERS + "/activate";
export const DEACTIVATE_USER_ALL = USERS + "/deactivate";

const POSTS = MAIN_API + MIDDLE_PATH + "/api/posts";
export const GET_ALL_POSTS = POSTS+"";
export const GET_ALL_POSTS_BY_USERID = POSTS+"";
export const GET_POST_BY_ID = POSTS+"";
export const UPDATE_POST_STATUS_BY_ID = POSTS+"";
export const UPDATE_ALL_POST_STATUS_BY_IDS = POSTS+"";
export const FILTER_POST = POSTS + "/filter";


const CATEGORY = MAIN_API + MIDDLE_PATH + "/api/categories";
export const GET_ALL_CATEGORY = CATEGORY + "";
export const GET_CATEGORY_BY_ID = CATEGORY + "";
export const UPDATE_CATEGORY_TITLE = CATEGORY + "";
export const CREATE_NEW_CATEGORY = CATEGORY + "/add-category";
export const UPDATE_STATUS_CATEGORY_BY_ID = CATEGORY + "";

export const REPORT = MAIN_API + MIDDLE_PATH + "/api/reports";
export const REPORT_COUNT_ALL_CATEGORY = MAIN_API + MIDDLE_PATH + "/api/reports";
export const REPORT_COUNT_ALL_UTILITY = MAIN_API + MIDDLE_PATH + "/api/reports";
export const REPORT_COUNT_ALL_USERS= REPORT + "/countUser";
export const REPORT_ANALYZE_USERS= REPORT + "/analyze/users";
export const REPORT_COUNT_ALL_USER_BY_STATUS = REPORT + "";
export const REPORT_COUNT_ALL_POSTS= MAIN_API + MIDDLE_PATH + "/countPost";
export const REPORT_ANALYZE_POSTS= REPORT + "/analyze/posts";
export const REPORT_COUNT_USERS_AND_POSTS_OVER_MONTHS= REPORT + "/count/monthly/unp";
export const REPORT_COUNT_ALL_POST_BY_STATUS = MAIN_API + MIDDLE_PATH + "/api/reports";
export const REPORT_COUNT_TOP_TEN_PENDING_POSTS= REPORT + "/ten/pending_posts";
export const REPORT_GET_DATA_BY_MONTH= REPORT + "/analyze/monthly";

export const GET_ALL_UTILITIES = MAIN_API + MIDDLE_PATH + "/api/utilities";
export const GET_UTILITY_BY_ID= MAIN_API + MIDDLE_PATH + "/api/utilities";
export const UPDATE_UTILITY_BY_ID= MAIN_API + MIDDLE_PATH + "/api/utilities";
export const UPDATE_STATUS_UTILITY_BY_ID= MAIN_API + MIDDLE_PATH + "/api/utilities";
export const CREATE_NEW_UTILITY= MAIN_API + MIDDLE_PATH + "/api/utilities";

export const SEND_POST_CENSORING_EMAIL = MAIN_API + MIDDLE_PATH + "/api/mail";


export const GET_ALL_PROVINCES = BASE_PROVINCE_API +"/";
export const GET_ALL_DISTRICTS_BY_PROVINCE_ID = BASE_PROVINCE_API +"/district";

