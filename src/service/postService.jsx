import {default as axios} from "axios";
import {
    FILTER_POST,
    GET_ALL_POSTS,
    GET_ALL_POSTS_BY_USERID,
    UPDATE_ALL_POST_STATUS_BY_IDS,
    UPDATE_POST_STATUS_BY_ID,
    GET_POST_BY_ID,
} from "~/service/api/index.jsx";
import JsCookie from "js-cookie";

// axios.defaults.withCredentials = true;
const getAllPosts = async (pageParam) => {
    let result = await axios
        .get(GET_ALL_POSTS, {params: pageParam})
        .catch((jqXHR) => console.log(jqXHR));
    return result.data;
};

const findAllByUserId = async (userId, user) => {
    let posts = await axios.post(
        GET_ALL_POSTS_BY_USERID + `/${userId}/user`,
        JSON.stringify(user),
        {
            params: {page: 0, size: 10},
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return posts.data;
};

const filterPosts = async (filter, paginationParams) => {
    let result = await axios
        .post(FILTER_POST, JSON.stringify(filter), {
            params: paginationParams,
            headers: {
                "Content-Type": "application/json",
            },
        })
        .catch((jqXHR) => console.log(jqXHR));
    return result.data;
};

const getPostById = async (postId) => {
    let result = await axios
        .get(GET_ALL_POSTS + `/${postId}`)
        .catch((jqXHR) => console.log(jqXHR));
    return result.data;
};

const findEmailById = async (params) => {
    let result = await axios
        .patch(UPDATE_POST_STATUS_BY_ID + `/${params.id}/email`,
        JSON.stringify(params),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
        )
        .catch((jqXHR) => console.log(jqXHR));
    return result.data;
};

const updatePostStatusById = async (params) => {
    let result = await axios.patch(
        UPDATE_POST_STATUS_BY_ID + "/" + params.id,
        JSON.stringify(params),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    return result.data;
}
const updateAllPostStatusByIds = async (ids,status) => {
    let result = await axios.patch(
        UPDATE_ALL_POST_STATUS_BY_IDS + `/${status}/status`,
        JSON.stringify(ids),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    return result.data;
}
export default {getAllPosts, findAllByUserId, filterPosts, getPostById, updatePostStatusById,updateAllPostStatusByIds, findEmailById};
