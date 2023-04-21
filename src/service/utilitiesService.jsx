import axios from "axios";
import {
    CREATE_NEW_UTILITY,
    GET_ALL_UTILITIES,
    GET_UTILITY_BY_ID,
    UPDATE_STATUS_UTILITY_BY_ID,
    UPDATE_UTILITY_BY_ID,
    REPORT,
} from "~/service/api";

axios.defaults.withCredentials = true;

const getAllUtilities = async(pageParams)=>{
    let result = await axios.get(GET_ALL_UTILITIES,{params: pageParams})
    return result.data;
};

const findById = async (id)=>{
    let result = await axios.get(GET_UTILITY_BY_ID + `/${id}`)
    return result.data;
}

const countAll = async () => {
    let count = await axios.get(REPORT + "/countUtility");
    return count;
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

const updateStatusById = async (id,status)=>{
    let result = await axios.patch(UPDATE_STATUS_UTILITY_BY_ID + `/${id}/status=${status}`,null)
    return result.data;
}

const createNew = async (data)=>{
    let result = await axios.post(CREATE_NEW_UTILITY,JSON.stringify(data),{
        headers: {
            "Content-Type": "application/json"
        }
    })
    return result.data;
}
export default {getAllUtilities,findById,updateById,createNew,updateStatusById, countAll};
