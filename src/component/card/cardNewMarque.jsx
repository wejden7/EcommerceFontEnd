import React from "react";
import { FilterMotion } from "../../component";
import { AiOutlineClose, AiOutlineFileImage } from "react-icons/ai";
import { Linear } from "../../component";

const Button = ({ onClick, color, label }) => (
  <button
    type="button"
    onClick={onClick}
    className={`col-span-2 py-2 text-xs text-center text-${color}-500 hover:text-white hover:bg-${color}-500 transition duration-700 ease-in-out`}
  >
    {label}
  </button>
);

const ButtonClose = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute top-1 right-1  rounded-full w-6 h-6 p-1 bg-red-50 text-red-500 hover:drop-shadow-md cursor-pointer"
  >
    <AiOutlineClose />
  </button>
);

const Titel = ({ titel }) => (
  <p className=" pt-1 font-bold tracking-wider text-center ">{titel}</p>
);

const ImageCard = ({ file }) => (
  <div className=" grid justify-center   ">
    {file ? (
      <img className=" w-40 h-40  " alt="uploadImage" src={file} />
    ) : (
      <AiOutlineFileImage className="w-8 h-8 mt-16 mb-16" />
    )}
  </div>
);

const ButtonCard = ({ condition, Save, Update }) => (
  <div className="  grid grid-cols-2 border border-white  w-full justify-center  divide-x">
    {!condition ? (
      <Button onClick={Save} color="blue" label="Save" />
    ) : (
      <Button  onClick={Update} color="green" label="Update" />
    )}
  </div>
);
const CardNewMarque = ({
  update,
  file,
  label,
  reset,
  SaveFunction,
  UpdateFunction,
  loding,
  progress,
}) => {
  return (
    <FilterMotion>
      <div
        key={1}
        className="relative grid place-items-center border-2  bg-white drop-shadow-xl rounded  group"
      >
        <Linear loding={loding} value={progress} />
        <ButtonClose onClick={reset} />
        <Titel titel={label} />
        <ImageCard file={file} />
        <ButtonCard
          condition={update}
          Save={SaveFunction}
          Update={UpdateFunction}
        />
      </div>
    </FilterMotion>
  );
};

export default CardNewMarque;
