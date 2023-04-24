import {default as axios} from "axios";
import {
    REPORT_ANALYZE_POSTS,
    REPORT_ANALYZE_USERS,
    REPORT_COUNT_ALL_USER_BY_STATUS,
    REPORT_COUNT_USERS_AND_POSTS_OVER_MONTHS,
    REPORT_COUNT_TOP_TEN_PENDING_POSTS,
    REPORT_COUNT_ALL_CATEGORY,
    REPORT_COUNT_ALL_UTILITY
} from "~/service/api";

const getTopTenPendingPost = async ()=>{
    let res = await axios.get(REPORT_COUNT_TOP_TEN_PENDING_POSTS);
    return res.data;
}

const getUserAnalysis = async ()=>{
    let res = await axios.get(REPORT_ANALYZE_USERS);
    return res.data;
}
const getPostAnalysis = async ()=>{
    let res = await axios.get(REPORT_ANALYZE_POSTS);
    return res.data;
}
const countPostAndUserByMonth = async (params)=>{
    let res = await axios.post(REPORT_COUNT_USERS_AND_POSTS_OVER_MONTHS,JSON.stringify(params),{headers: {"Content-Type": "application/json"}})
    return res.data
}

const countAllCategory = async () => {
    let count = await axios.get(REPORT_COUNT_ALL_CATEGORY + "/countCategory");
    return count;
  }

  const countAllUtilty = async () => {
    let count = await axios.get(REPORT_COUNT_ALL_UTILITY + "/countUtility");
    return count;
  }

export default {getTopTenPendingPost,getPostAnalysis, getUserAnalysis,countPostAndUserByMonth, countAllCategory, countAllUtilty}

