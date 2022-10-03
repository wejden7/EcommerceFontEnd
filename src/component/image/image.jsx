import React from "react";
import {baseUrl} from "../../data/dummy"

const Image = ({src,alt,w,h}) => (
  <img
    src={baseUrl+src}
    alt={alt}
    className={`w-${w} h-${h}`}
  />
);

export default Image;
