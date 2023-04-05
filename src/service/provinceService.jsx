import axios from "axios";
import {GET_ALL_DISTRICTS_BY_PROVINCE_ID, GET_ALL_PROVINCES} from "~/service/api";

const getAllProvinces = async () => {
    const res = await axios.get(GET_ALL_PROVINCES)
    return res.data.results;
}
const getAllDistrictsByProvinceId = async (id)=>{
    const res = await axios.get(GET_ALL_DISTRICTS_BY_PROVINCE_ID + `/${id}`);
    return res.data.results;
}

export default {getAllProvinces,getAllDistrictsByProvinceId}