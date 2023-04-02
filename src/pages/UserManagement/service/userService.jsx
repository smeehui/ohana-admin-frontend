import { default as axios } from "axios";
import { GET_ALL_USER, FILTER_USER, UPDATE_USER } from "~/config/api";

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
const updateUserById = async (id, param) => {
    let user = await axios({
        url: UPDATE_USER + `/${id}`,
        method: "patch",
        data: param,
    });
    return user;
};
export { getAllUsers, filterUsers, updateUserById };
