import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import {Image,FilterMotion} from "../../component";

const ButtonDelete = ({ id, onClick }) => (
  <button
    className="absolute right-2 -top-2  bg-icon p-1 rounded-full border border-black"
    onClick={() => {
      onClick(id);
    }}
  >
    <AiOutlineClose className="text-red-600" />
  </button>
);

const ButtonUpdate = ({ onClick, item }) => (
  <button
    className=" text-white hover:shadow-md hover:bg-white p-2 rounded-full"
    onClick={() => {
      onClick(item);
    }}
  >
    <GrUpdate className="icon" color="blue" />
  </button>
);

const ButtonNavigate = ({ url }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate(url);
      }}
    >
      Detail
    </button>
  );
};

const Titel = ({ label }) => (
  <p className="font-bold  break-words truncate">{label}</p>
);

const CardCategorie = ({ item, Delete, Update, url }) => {
  return (
    <FilterMotion>
    <div className="relative">
    <ButtonDelete onClick={Delete} id={item._id} />
      <div className=" gap-1 grid place-items-center m-4 border p-4 border-2 border-black rounded-lg cursor-pointer ">
        <div className=" rounded-full w-12 h-12 grid place-items-center -mt-10 border-2 bg-icon  border-black">
          <Image src={"/icons/" + item.icon} alt="icon" h={6} w={6} />
        </div>
        <Titel label={item.label} />
        <ButtonUpdate onClick={Update} item={item} />
        <ButtonNavigate url={url + item._id} />
      </div>
    </div>
      
    </FilterMotion>
  );
};  

export default CardCategorie;
