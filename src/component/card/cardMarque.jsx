import React from "react"
import { motion } from "framer-motion";


const CardMarque =({item,handelUpdate ,deleteMarque})=>{

    return (
        <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        
        className=" grid place-items-center  bg-white  rounded  group"
      >
        <p className=" pt-1 font-bold tracking-wider text-center ">
          {item.label}
        </p>
        <img
          src={"https://shope7.herokuapp.com/logos/" + item.logo}
          alt="icon"
          className=" group-hover:scale-110 group-hover:drop-shadow-md group-hover:translate-y-1 transition duration-150 ease-in-out w-40 h-40 text-white px-2"
        />
        <div className="  grid grid-cols-2 border border-white  w-full justify-center  divide-x">
          <button
            onClick={() => {
              handelUpdate(item);
            }}
            className="py-2 text-xs text-center text-green-500 hover:text-white hover:bg-green-500 transition duration-700 ease-in-out"
          >
            {" "}
            Updete
          </button>

          <button
            onClick={() => {
              deleteMarque(item._id);
            }}
            className="py-2 text-xs text-center text-red-500 hover:text-white hover:bg-red-500 transition duration-300 ease-in-out"
          >
            {" "}
            Delete
          </button>
        </div>
      </motion.div>
    )

}

export default CardMarque;