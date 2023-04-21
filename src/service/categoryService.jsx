import {default as axios} from "axios";


import {
    CREATE_NEW_CATEGORY,
    GET_ALL_CATEGORY,
    GET_CATEGORY_BY_ID,
    REPORT,
    UPDATE_CATEGORY_TITLE,
    UPDATE_STATUS_CATEGORY_BY_ID
} from "./api";

axios.defaults.withCredentials = true;
const getAllCategory = async (pageParam) => {
  let category = await axios.get(GET_ALL_CATEGORY, { params: pageParam });
  return category.data;
};

const countAll = async () => {
  let count = await axios.get(REPORT + "/countCategory");
  return count;
}


const findById = async (id) => {
  let category = await axios.get(GET_CATEGORY_BY_ID + `/${id}`);
  return category.data;
};

const addNewCategory = async (title) => {
  let newCate = await axios.post(CREATE_NEW_CATEGORY,
    JSON.stringify({title}),
    {
      headers: {
          "Content-Type": "application/json",
      },
  }
    );
  return newCate.data;
}


const updateCategoryTitle = async (params) => {
  let result = await axios.patch(
    UPDATE_CATEGORY_TITLE + "/" + params.id,
      JSON.stringify(params),
      {
          headers: {
              "Content-Type": "application/json"
          }
      }
  )
  return result.data;
}

const updateStatusCategory = async (id,status)=>{
  let result = await axios.patch(UPDATE_STATUS_CATEGORY_BY_ID + `/${id}/status=${status}`, null)
  return result.data;
}

export default { getAllCategory, findById, updateCategoryTitle, addNewCategory, updateStatusCategory, countAll };
