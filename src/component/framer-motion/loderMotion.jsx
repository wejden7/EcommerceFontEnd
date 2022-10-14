import React from 'react'
import { Waveform } from "@uiball/loaders";
import {motion} from "framer-motion";
const LoderMotion = ()=> <motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
transition={{ duration: 1 }}
 className="mt-40 grid place-items-center">
  <Waveform size={40} lineWeight={3.5} speed={1} color="Blue" />
</motion.div>

export default LoderMotion;