import React from "react";
import { FilterMotion } from "../../component";
import { AiOutlineFileImage } from "react-icons/ai";
import { Linear } from "../../component";
import { UseStateContextFormMarque } from "../form/FormMarque/FormMarque";

const Button = ({ onClick, color, label }) => (
  <button
    type="button"
    onClick={onClick}
    className={`col-span-2 py-2 text-xs text-center text-${color}-500 hover:text-white hover:bg-${color}-500 transition duration-700 ease-in-out`}
  >
    {label}
  </button>
);

const InputLabel = ({ bind }) => (
  <input
    type="text"
    {...bind}
    className="w-full py-2 rounded  tracking-wider text-center font-bold focus:outline-none"
    placeholder="Nom de marque"
  />
);

const ImageCard = ({ file, bind }) => (
  <div className="w-full grid grid-cols-1    h-full place-items-center ">
    <label className="w-full  relative">
      <div className="h-40  grid grid-cols-1  place-items-center">
        {file[0] ? (
          <img
            className="   h-40 w-full px-2 "
            alt="uploadImage"
            src={file[0]}
          />
        ) : (
          <AiOutlineFileImage className="w-full h-8  " />
        )}
      </div>
      <input
        type="file"
        {...bind}
        className="opacity-0 absolute  w-10   top-0"
      />
    </label>
  </div>
);

const ButtonCard = () => {
  const {
    update,
    resetForm,
    formValidUpdate,
    createMarque,
    updateMarque,
    formValid,
  } = UseStateContextFormMarque();
  return (
    <div className="  grid grid-cols-2 border border-white  w-full justify-center">
      {!update ? (
        !formValid ? (
          <Button onClick={resetForm} color="red" label="Clear" />
        ) : (
          <Button onClick={createMarque} color="blue" label="Save" />
        )
      ) : !formValidUpdate ? (
        <Button onClick={resetForm} color="red" label="Clear" />
      ) : (
        <Button onClick={updateMarque} color="green" label="Update" />
      )}
    </div>
  );
};
const CardNewMarque = ({}) => {
  const {
    loding,
    progress,
    file,
    bindLogo,
    bindLabel,
  } = UseStateContextFormMarque();
  return (
    <FilterMotion>
      <div
        key={1}
        className="relative grid place-items-center  bg-white rounded   group"
      >
        <Linear loding={loding} value={progress} />
        <InputLabel bind={bindLabel} />
        <ImageCard file={file} bind={bindLogo} />
        <ButtonCard />
      </div>
    </FilterMotion>
  );
};

export default CardNewMarque;
