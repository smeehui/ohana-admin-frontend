import axios from "axios";
import {ADMIN_LOGIN, ADMIN_LOGOUT} from "~/service/api";

// axios.defaults.withCredentials = true;

const login = async (params)=>{
    let response = await axios.post(ADMIN_LOGIN,JSON.stringify(params),{
        headers: {
            "Content-Type": "application/json",
        },
    })
    return response.data;
}
const logout = async ()=>{
    let response = await axios.get(ADMIN_LOGOUT)
    return response.data;
}
export default {login,logout}
