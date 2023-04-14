import {Cloudinary} from "@cloudinary/url-gen";

const CLOUD_NAME= "ohana123"
const CLOUD_FOLDER = "post_images"
const API_KEY = "534578634358973"
const API_SECRET = "yVhzuaKVIg7zcs2moQn47Ga9nH8"
let cld = new Cloudinary({
   cloud: {
       cloudName: CLOUD_NAME,
       apiKey: API_KEY,
       apiSecret: API_SECRET,
   },
});

export default {cld,CLOUD_FOLDER,CLOUD_NAME,API_KEY,API_SECRET}