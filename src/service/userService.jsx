import { default as axios } from "axios";
import {
    GET_ALL_USERS,
    USER_DETAILS,
    FILTER_USER,
    UPDATE_USER_STATUS,
    DEACTIVATE_USER_ALL,
    ACTIVATE_USER_ALL,
} from "~/service/api";

const getAllUsers = async (params) => {
    let result = await axios
        .get(GET_ALL_USERS, { params: params })
        .catch((jqXHR) => console.log(jqXHR));
    return result.data;
};

const findById = async (id) => {
    // console.log(USER_DETAILS + `/${id}`);
    let user = await axios.get(USER_DETAILS + `/${id}`)
    
    return user;
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
    const url = type === "deactivate" ? DEACTIVATE_USER_ALL : ACTIVATE_USER_ALL;
    let status = axios.patch(url,JSON.stringify(idList),{headers: {
        "Content-Type": "application/json"
    }});
    return status;
};

export default { getAllUsers, findById, filterUsers, updateUserStatusById, updateStatusAll };
