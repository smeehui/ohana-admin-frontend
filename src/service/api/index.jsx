const PORT = 8080;
// import { USER_DETAILS } from './../../config/routes';
const MAIN_API = "http://localhost:" + PORT;
const MIDDLE_PATH = "";
export const GET_ALL_USER = MAIN_API + MIDDLE_PATH + "/api/users";
export const USER_DETAILS = MAIN_API + MIDDLE_PATH + "/api/users";
export const GET_ALL_POST = MAIN_API + MIDDLE_PATH + "/api/posts";
export const FILTER_USER = MAIN_API + MIDDLE_PATH + "/api/users/filter";
export const UPDATE_USER_STATUS = MAIN_API + MIDDLE_PATH + "/api/users";
export const ACTIVATE_ALL = MAIN_API + MIDDLE_PATH + "/api/users/activate";
export const DEACTIVATE_ALL = MAIN_API + MIDDLE_PATH + "/api/users/deactivate";

