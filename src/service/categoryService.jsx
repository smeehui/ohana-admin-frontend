import { default as axios } from "axios";
import { GET_ALL_CATEGORY } from "./api";


const getAllCategory = async (pageParam) => {
    let category = await axios
      .get(GET_ALL_CATEGORY, { params: pageParam });
    return category.data;
  };

export default { getAllCategory };
