const PORT = 8080;

const MAIN_API = "http://localhost:" + PORT;
const MIDDLE_PATH = "";
const BASE_PROVINCE_API = "https://vapi.vnappmob.com/api/province"

export const GET_ALL_USERS = MAIN_API + MIDDLE_PATH + "/api/users";
export const USER_DETAILS = MAIN_API + MIDDLE_PATH + "/api/users";
export const FILTER_USER = MAIN_API + MIDDLE_PATH + "/api/users/filter";
export const UPDATE_USER_STATUS = MAIN_API + MIDDLE_PATH + "/api/users";
export const ACTIVATE_USER_ALL = MAIN_API + MIDDLE_PATH + "/api/users/activate";
export const DEACTIVATE_USER_ALL = MAIN_API + MIDDLE_PATH + "/api/users/deactivate";

export const GET_ALL_POSTS = MAIN_API + MIDDLE_PATH + "/api/posts";
export const GET_ALL_POSTS_BY_USERID = MAIN_API + MIDDLE_PATH + "/api/posts";
export const GET_POST_BY_ID = MAIN_API + MIDDLE_PATH + "/api/posts";
export const UPDATE_POST_STATUS_BY_ID = MAIN_API + MIDDLE_PATH + "/api/posts";
export const UPDATE_ALL_POST_STATUS_BY_IDS = MAIN_API + MIDDLE_PATH + "/api/posts";
export const FILTER_POST = MAIN_API + MIDDLE_PATH + "/api/posts/filter";


export const GET_ALL_CATEGORY = MAIN_API + MIDDLE_PATH + "/api/categories";
export const GET_CATEGORY_BY_ID = MAIN_API + MIDDLE_PATH + "/api/categories";
export const UPDATE_CATEGORY_TITLE = MAIN_API + MIDDLE_PATH + "/api/categories";
export const CREATE_NEW_CATEGORY = MAIN_API + MIDDLE_PATH + "/api/categories/add-category";
export const UPDATE_STATUS_CATEGORY_BY_ID = MAIN_API + MIDDLE_PATH + "/api/categories";

export const GET_ALL_UTILITIES = MAIN_API + MIDDLE_PATH + "/api/utilities";
export const GET_UTILITY_BY_ID= MAIN_API + MIDDLE_PATH + "/api/utilities";
export const UPDATE_UTILITY_BY_ID= MAIN_API + MIDDLE_PATH + "/api/utilities";
export const UPDATE_STATUS_UTILITY_BY_ID= MAIN_API + MIDDLE_PATH + "/api/utilities";
export const CREATE_NEW_UTILITY= MAIN_API + MIDDLE_PATH + "/api/utilities";


export const GET_ALL_PROVINCES = BASE_PROVINCE_API +"/";
export const GET_ALL_DISTRICTS_BY_PROVINCE_ID = BASE_PROVINCE_API +"/district";

