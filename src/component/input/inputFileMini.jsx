import React from "react"
import {
    AiOutlineCloudUpload
  } from "react-icons/ai";
const InputFileMini = ({bind,saveCliked,ErrorLogo,multiple})=>{

    return (
        <label
                    className={
                      saveCliked && ErrorLogo
                        ? "border bg-white w-min border-red-500 relative h-10  grid place-items-center   rounded cursor-pointer"
                        : "border bg-white w-min border-gray-400 relative h-10  grid place-items-center   rounded cursor-pointer"
                    }
                  >
                    <AiOutlineCloudUpload
                      className={
                        saveCliked && ErrorLogo 
                          ? "absolute text-2xl text-red-500  "
                          : "absolute text-2xl  opacity-50 "
                      }
                    />
                    <input
                      type="file"
                      multiple={multiple}
                      className=" w-10  opacity-0 hover:file:cursor-pointer"
                      {...bind}
                      id="upload"
                      accept="image/*"
                    />
                  </label>
    )
}

export default InputFileMini;