import axios from "axios";
import {GET_ALL_UTILITIES, GET_UTILITY_BY_ID} from "~/service/api";

const getAllUtilities = async(pageParams)=>{
    let result = await axios.get(GET_ALL_UTILITIES,{params: pageParams})
    return result.data;
};
const findById = async (id)=>{
    let result = await axios.get(GET_UTILITY_BY_ID + `/${id}`)
    return result.data;
}
export default {getAllUtilities,findById};
