import React from 'react'
import {
    AiOutlineSearch,
  } from "react-icons/ai";
const InputSerch =({bind})=>{

    return (
        <div className=" bg-white  rounded grid grid-cols-6">
            <div className="col-span-1  w-full  grid place-items-center">
              <AiOutlineSearch className=" text-xl  opacity-50" />
            </div>
            <input
              {...bind}
              placeholder="Search"
              type="text"
              className=" h-10 col-span-5 ml-1 appearance-none  rounded  py-2  text-gray-700 text-base leading-tight focus:outline-none "
            />
          </div>
    )

}

export default InputSerch;