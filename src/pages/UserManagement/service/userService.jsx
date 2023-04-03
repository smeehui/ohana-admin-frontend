import { default as axios } from "axios";
import {
    GET_ALL_USER,
    FILTER_USER,
    UPDATE_USER_STATUS,
    DEACTIVATE_ALL,
    ACTIVATE_ALL,
} from "~/config/api";

const getAllUsers = async (params) => {
    let result = await axios
        .get(GET_ALL_USER, { params: params })
        .catch((jqXHR) => console.log(jqXHR));
    return result.data;
};
const filterUsers = async (filter, paginationParams) => {
    let result = await axios
        .post(FILTER_USER, JSON.stringify(filter), {
            params: paginationParams,
            headers: {
                "Content-Type": "application/json",
            },
        })
        .catch((jqXHR) => console.log(jqXHR));
    return result.data;
};
const updateUserStatusById = async (id, stt) => {
    let user = await axios({
        url: UPDATE_USER_STATUS + `/${id}/status`,
        method: "patch",
        params: {
            status: stt,
        },
    });
    return user;
};

const updateStatusAll = async (idList, type) => {
    const url = type === "deactivate" ? DEACTIVATE_ALL : ACTIVATE_ALL;
    let status = axios({
        url: url,
        method:"patch",
        data: JSON.stringify(idList),
        headers: {
            "Content-Type": "application/json",
        },
    })
};

export { getAllUsers, filterUsers, updateUserStatusById,updateStatusAll };
