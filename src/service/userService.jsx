import {default as axios} from "axios";
import {
    ACTIVATE_USER_ALL,
    DEACTIVATE_USER_ALL,
    FILTER_USER,
    GET_ALL_USERS,
    UPDATE_USER_STATUS,
    REPORT_COUNT_ALL_USER_BY_STATUS,
    USER_DETAILS,
    REPORT_COUNT_ALL_USERS
} from "~/service/api";
import JsCookie from "js-cookie";
import { UserStatus } from "~/pages/UserManagement/constants/UserStatus";

// axios.defaults.headers.common['Authorization'] = JsCookie.get("jwtToken");
axios.defaults.withCredentials = true;
const getAllUsers = async (params) => {
    let result = await axios
        .get(GET_ALL_USERS, { params: params })
        .catch((jqXHR) => console.log(jqXHR));
    return result.data;
};

const countAll = async () => {
    let count = await axios.get(REPORT_COUNT_ALL_USERS);
    return count;
  }

const countAllUserByStatus = async (status) => {
    let count = await axios.get(REPORT_COUNT_ALL_USER_BY_STATUS + `/${status}` + "/userStatus");
    return count;
  }

const findById = async (id) => {
    let user = await axios.get(USER_DETAILS + `/${id}`)
    return user.data;
};

const filterUsers = async (filter, paginationParams) => {
    let result = await axios
        .post(FILTER_USER, 
            JSON.stringify(filter), 
            {
            params: paginationParams,
            headers: {
                "Content-Type": "application/json",
            },
        })
        .catch((jqXHR) => console.log(jqXHR));
    return result.data;
};

const updateUserStatusById = async (id, stt) => {
    let user = await axios.patch(UPDATE_USER_STATUS + `/${id}/status`,null,{params: {status: stt}})
    return user;
};

const updateStatusAll = async (idList, type) => {
    console.log(type);
    const url = type === UserStatus.DEACTIVATED ? DEACTIVATE_USER_ALL : ACTIVATE_USER_ALL;
    let status = await axios.patch(url, JSON.stringify(idList), {
        headers: {
            "Content-Type": "application/json"
        }
    });
    return status.data;
};

export default { getAllUsers, findById, filterUsers, updateUserStatusById, updateStatusAll, countAll, countAllUserByStatus };
