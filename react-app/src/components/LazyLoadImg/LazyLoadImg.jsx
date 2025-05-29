import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const LazyLoadImg = ({ src, className, defaultSrc }) => {
    // const handleImageError = (event) => {
    //     // Set a default image when the original image fails to load
    //     event.target.src = defaultSrc;
    // };

    return (
        <LazyLoadImage
            className={className || ""}
            alt=""
            effect="blur"
            src={src}
            //onError={handleImageError}

        />
    );
};

export default LazyLoadImg;