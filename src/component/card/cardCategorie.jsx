import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const CardCategorie = ({item,deleteCategoriById,handleClickUpadet,next})=>{
  const navigate = useNavigate();
 
    return (
        <motion.div  layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        key={item._id} className="relative  ">
        <button
          
          className="absolute right-2 top-1 bg-icon p-1 rounded-full border border-black"
          onClick={() => {
            deleteCategoriById(item._id);
          }}
        >
          <AiOutlineClose className="text-red-600" />
        </button>
        
        <div className=" gap-1 grid place-items-center m-4 border p-4 border-2 border-black rounded-lg cursor-pointer ">
          <div className=" rounded-full w-12 h-12 grid place-items-center -mt-10 border-2 bg-icon  border-black">
            <img
            
              src={"https://shope7.herokuapp.com/icons/" + item.icon}
              alt="icon"
              className="w-6 h-6 text-white"
            />
          </div>
          <p  className="font-bold  break-words truncate">
            {item.label}
          </p>
          <button
        
          className=" text-white hover:shadow-md hover:bg-white p-2 rounded-full"
          onClick={() => {
           
            handleClickUpadet(item);
          }}
        >
          <GrUpdate className="icon"  color="blue"/>

          
        </button>
        <div onClick={()=>{
              navigate("/dashbored/"+next+"/"+item._id) 
          }}>Detail</div>
        </div>
      </motion.div>
    )
}

export default CardCategorie;