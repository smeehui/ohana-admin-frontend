import {default as axios} from "axios";
import {GET_ALL_POST} from "~/config/api.jsx";

const getAllPosts = async () => {
    console.log("getting all posts....");
    // const graphqlQuery = {
    //     query: `query AllUser{
    //                 users{
    //                     id
    //                     fullName
    //                     email
    //                     password
    //                 }
    //             }`,
    //     variables: {},
    // };

    let result = await axios({
        url: GET_ALL_POST,
        method: "get",
    }).catch((jqXHR) => console.log(jqXHR));
    return result.data;
};

export { getAllPosts};
