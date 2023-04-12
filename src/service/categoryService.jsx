import { default as axios } from "axios";
import {
  CREATE_NEW_CATEGORY,
  GET_ALL_CATEGORY,
  GET_CATEGORY_BY_ID,
  UPDATE_CATEGORY_TITLE,
} from "./api";

const getAllCategory = async (pageParam) => {
  let category = await axios.get(GET_ALL_CATEGORY, { params: pageParam });
  return category.data;
};

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

export default { getAllCategory, findById, updateCategoryTitle, addNewCategory };
