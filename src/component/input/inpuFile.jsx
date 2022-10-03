import React from 'react'
import {
    AiOutlineCloudUpload,
  } from "react-icons/ai";
  
const InputFile = ({bind,saveCliked,file,errorIcon,resetIcon,multiple})=>{

return (
    <>
    <div className="flex  items-center justify-center   ">
              <label className="flex flex-col  h-32 border-4 border  border-dotted hover:bg-gray-100 cursor-pointer">
                <div className="flex flex-col items-center justify-center pt-7">
                  {!file[0] ? (
                    <AiOutlineCloudUpload className="w-8 h-8 opacity-50" />
                  ) : (
                    <img
                      className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                      alt="uploadImage"
                      src={file[0]}
                    />
                  )}
                  <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                    Attach a Icon
                  </p>
                </div>
                <input
                  type="file"
                  className=" w-60 md:w-68 opacity-0"
                  {...bind}
                  multiple={multiple}
                  id="upload"
                  accept="image/*"
                />
              </label>
            </div>
            {(saveCliked)&&(
              <p className="text-right text-xs text-red-500">{errorIcon}</p>
            )}
            {file && (
              <button
                onClick={() => {
                  resetIcon();
                }}
              >
                Reset
              </button>
            )}
    </>
)
}

export default InputFile;