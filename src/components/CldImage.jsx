import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import React from "react";
import { cldConfig } from "~/config/cloudinary";
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {focusOn} from "@cloudinary/url-gen/qualifiers/gravity";
import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";

function CldImage({ id,w = 80,h=80,r=5,alt = "image" }) {
    const img =cldConfig.cld.image(cldConfig.CLOUD_FOLDER + `/${id}`)

        img.resize(thumbnail().width(w).height(h))
            .roundCorners(byRadius(r))
    return (
        <div style={{width: "fit-content",height: "fit-content"}} className={r===50 ? "rounded-circle overflow-hidden":null}>
            <AdvancedImage
                cldImg={img}
                alt={alt}
            />
        </div>
    );
}

export default CldImage;
