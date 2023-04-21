import {cldConfig} from "~/config/cloudinary";
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";

const generateImageById = (id, params = {width : 90, height : 90,  round : 0})=>{
    const {width,height,round} = params;

    const img =cldConfig.cld.image(`/${id}`)

    img.resize(thumbnail().width(width).height(height))
        .roundCorners(byRadius(round))
    return img.toURL()
}
export default {generateImageById}