import React from "react";
import { motion } from "framer-motion";
import { AiOutlineClose, AiOutlineFileImage } from "react-icons/ai";

import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
const CardNewMarque = ({
  update,
  file,
  label,
  reset,
  handelSave,
  updateMarque,
  loding,
  progress,
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      key={1}
      className={
        !update
          ? "relative grid place-items-center border-2  bg-white drop-shadow-xl rounded  group"
          : "relative grid place-items-center border-2   bg-white drop-shadow-xl rounded  group"
      }
    >
      {loding && (
        <Box
          className=" w-full "
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Box sx={{ width: "100%" }}>
            <LinearProgress variant="determinate" value={progress} />
          </Box>
        </Box>
      )}
      <AiOutlineClose
        onClick={reset}
        className="absolute top-1 right-1  rounded-full w-6 h-6 p-1 bg-red-50 text-red-500 hover:drop-shadow-md cursor-pointer"
      />

      <p className=" pt-1 font-bold tracking-wider text-center ">{label}</p>
      <div className=" grid justify-center   ">
        {file ? (
          <img className=" w-40 h-40  " alt="uploadImage" src={file} />
        ) : (
          <AiOutlineFileImage className="w-8 h-8 mt-16 mb-16" />
        )}
      </div>
      <div className="  grid grid-cols-2 border border-white  w-full justify-center  divide-x">
        {!update ? (
          <button
            type="button"
            onClick={handelSave}
            className="col-span-2 py-2 text-xs text-center text-blue-500 hover:text-white hover:bg-blue-500 transition duration-700 ease-in-out"
          >
            Save
          </button>
        ) : (
          <button
            type="button"
            onClick={updateMarque}
            className="col-span-2 py-2 text-xs text-center text-green-500 hover:text-white hover:bg-green-500 transition duration-700 ease-in-out"
          >
            Update
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default CardNewMarque;
