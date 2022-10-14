import React from "react";
import { motion } from "framer-motion";

const FilterMotion = ({ children }) => (
  <motion.div
    layout
    initial={{ opacity: 0 ,rotateZ:5}}
    animate={{ opacity: 1 ,rotateZ:0}}
    exit={{ opacity: 0 }}
    transition={{ duration: 1 }}
  >
    {children}
  </motion.div>);

export default  FilterMotion ;
