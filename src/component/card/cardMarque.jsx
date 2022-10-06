import React from "react";
import { FilterMotion, Image } from "../../component";

const Button = ({ onClick, label, params, color }) => (
  <button
    onClick={() => {
      onClick(params);
    }}
    className={`py-2 text-xs text-center text-${color}-500 hover:text-white hover:bg-${color}-500 transition duration-700 ease-in-out`}
  >
    {label}
  </button>
);

const Titel = ({ label }) => (
  <p className=" py-2 font-bold tracking-wider text-center ">{label}</p>
);

const ImageCard = ({ item }) => (
  <div className=" group-hover:scale-110 group-hover:drop-shadow-md group-hover:translate-y-1 transition duration-150 ease-in-out text-white px-2">
    <Image src={"/logos/" + item.logo} alt={item.logo} w={40} h={40} />
  </div>
);

const ButtonCard = ({ item, Update, Delete }) => (
  <div className="  grid grid-cols-2 border border-white  w-full justify-center  divide-x">
    <Button onClick={Update} label="Updete" params={item} color="green" />
    <Button onClick={Delete} label="Delete" params={item._id} color="red" />
  </div>
);

const CardMarque = ({ item, Update, Delete }) => {
  return (
    <FilterMotion>
      <div
        key={item._id}
        className=" grid place-items-center  bg-white  rounded  group"
      >
        <Titel label={item.label} />
        <ImageCard item={item} />
        <ButtonCard item={item} Update={Update} Delete={Delete} />
      </div>
    </FilterMotion>
  );
};

export default CardMarque;
