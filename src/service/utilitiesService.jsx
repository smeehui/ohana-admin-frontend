import axios from "axios";
import {GET_ALL_UTILITIES, GET_UTILITY_BY_ID, UPDATE_UTILITY_BY_ID} from "~/service/api";

const getAllUtilities = async(pageParams)=>{
    let result = await axios.get(GET_ALL_UTILITIES,{params: pageParams})
    return result.data;
};
const findById = async (id)=>{
    let result = await axios.get(GET_UTILITY_BY_ID + `/${id}`)
    return result.data;
}
const updateById = async (id,data)=>{
    data.id = id;
    let result = await axios.patch(UPDATE_UTILITY_BY_ID + `/${id}`,JSON.stringify(data),{
        headers: {
            "Content-Type": "application/json"
        }
    })
    return result.data;
}
const createNew = async (data)=>{
    let result = await axios.post(UPDATE_UTILITY_BY_ID,JSON.stringify(data),{
        headers: {
            "Content-Type": "application/json"
        }
    })
    return result.data;
}
export default {getAllUtilities,findById,updateById,createNew};
