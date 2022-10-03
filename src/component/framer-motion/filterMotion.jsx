import React from "react";
import { motion } from "framer-motion";

const FilterMotion = ({ children }) => (
  <motion.div
    layout
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>);

export default  FilterMotion ;
