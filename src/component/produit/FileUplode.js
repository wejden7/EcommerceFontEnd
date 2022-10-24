import React from "react";
import { AiFillDelete } from "react-icons/ai";
const FileUplode = ({ files, deleteByIndex, uplodeImage }) => (
  <>
    <div className="flex flex-wrap w-full justify-center  mt-5 gap-5">
    {files.map((file, index) => {
      return (
        <div key={index} className="relative">
          <img src={file} className="w-52 h-52" />
          <p
            onClick={() => {
              deleteByIndex(index);
            }}
            className="text-red-500 text-xl  absolute bottom-3 opacity-10 hover:opacity-100 cursor-pointer  grid place-items-center bg-red-100 rounded-full p-2   w-full"
          >
            <AiFillDelete />
          </p>
        </div>
      );
    })}
    </div>
    <div>
    {files.length > 0 && (
      <div className="text-white font-bold mt-4 grid place-items-center">
        <button
          onClick={uplodeImage}
          className="bg-blue-900 rounded-md px-3 py-2"
        >
          {" "}
          Uplode
        </button>
      </div>
    )}
    </div>
   
  </>
);

export default FileUplode;
