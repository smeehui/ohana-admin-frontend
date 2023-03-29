import { default as axios } from "axios";
import { GET_ALL_USER, SEARCH_USER } from "~/config/api";

const getAllUsers = async () => {
    console.log("getting all user....");
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
        url: GET_ALL_USER,
        method: "get",
        // headers: {
        //     "content-type": "application/json",
        // },
        // data: JSON.stringify(graphqlQuery),
    }).catch((jqXHR) => console.log(jqXHR));
    return result.data;
};
const searchUsers = async (query) => {
    console.log("searching....");
    const graphqlQuery = {
        query: `query SearchUsers{
                    search(q:"${query}"){
                        id
                        fullName
                        email
                        password
                    }
                }`,
        variables: {},
    };
    let result = await axios({
        url: SEARCH_USER,
        method: "post",
        headers: {
            "content-type": "application/json",
        },
        data: JSON.stringify(graphqlQuery),
    });
    return result.data.data.search;
};
export { getAllUsers, searchUsers };
