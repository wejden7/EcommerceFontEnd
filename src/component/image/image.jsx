import React from "react";
import {baseUrl} from "../../data/dummy"
import { motion } from "framer-motion";

const Image = ({src,alt,w,h,plu}) => (
  <motion.img initial={{opacity: 0}} animate={{ opacity:1}} transition={{duration:1}}
    src={baseUrl+src}
    alt={alt}
    className={`w-${w} h-${h} ${plu}`}
  />
);

export default Image;
