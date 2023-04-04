import {default as axios} from "axios";
import {GET_ALL_POST} from "~/service/api/index.jsx";

const getAllPosts = async (pageParam) => {
    console.log("getting all posts....");
    let result = await axios.get(GET_ALL_POST,{params:pageParam}).catch((jqXHR) => console.log(jqXHR));
    return result.data;
};

export { getAllPosts};
