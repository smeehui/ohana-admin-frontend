import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import React from "react";
import { cldConfig } from "~/config/cloudinary";
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {focusOn} from "@cloudinary/url-gen/qualifiers/gravity";
import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";

function CldImage({ id,w = 80,h=80,r=5 }) {
    const img =cldConfig.cld.image(cldConfig.CLOUD_FOLDER + `/${id}`)

        img.resize(thumbnail().width(w).height(h))
            .roundCorners(byRadius(r))
    return (
        <div className="p-2 r-50">
            <AdvancedImage
                cldImg={img}
            />
        </div>
    );
}

export default CldImage;
