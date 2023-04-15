
import React from "react";
import {cldConfig} from "~/config/cloudinary";
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";

import noImage from  "~/assets/img/no-image.jpg"

function CldImage({ id,w = 80,h=80,r=5,alt = "image" }) {
    const img =cldConfig.cld.image(cldConfig.CLOUD_FOLDER + `/${id}`)
        img.resize(thumbnail().width(w).height(h))
            .roundCorners(byRadius(r))
    return (
        <div style={{width: "fit-content",height: "fit-content"}} className={r===50 ? "rounded-circle overflow-hidden":null}>
            <img
                src={img.toURL()}
                alt={alt}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src= noImage;
                    currentTarget.height = w
                    currentTarget.width = w
                    currentTarget.style.borderRadius = r + "%"
                }}
            />
        </div>
    );
}

export default CldImage;
