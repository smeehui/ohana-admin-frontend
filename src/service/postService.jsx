import {default as axios} from "axios";
import {FILTER_POST, FILTER_USER, GET_ALL_POSTS} from "~/service/api/index.jsx";

const getAllPosts = async (pageParam) => {
    console.log("getting all posts....");
    let result = await axios.get(GET_ALL_POSTS,{params:pageParam}).catch((jqXHR) => console.log(jqXHR));
    return result.data;
};

const filterPosts = async (filter, paginationParams) => {
    let result = await axios
        .post(FILTER_POST,
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

const getPostById = async (postId)=>{
    let result = await axios.get(GET_ALL_POSTS + `/${postId}`)
        .catch((jqXHR) => console.log(jqXHR));
    return result.data;
}
export  default { getAllPosts,filterPosts,getPostById};
