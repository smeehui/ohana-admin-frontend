const PORT = 8080;
const MAIN_API = "http://localhost:"+PORT;
const MIDDLE_PATH = ""
export const GET_ALL_USER = MAIN_API + MIDDLE_PATH + "/api/users"
export const GET_ALL_POST = MAIN_API + MIDDLE_PATH + "/api/posts"
export const SEARCH_USER = MAIN_API + MIDDLE_PATH
export const UPDATE_USER = MAIN_API + MIDDLE_PATH + "/api/users"