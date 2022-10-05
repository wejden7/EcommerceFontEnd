import React from "react";
import { isNumber, isEmpty } from "../../validateur/validator";

const MsgError = ({ msg }) => (
  <p className="text-xs text-red-500 text-end">{msg}</p>
);

const Error = ({ submit, value,max ,min,placeholder}) => {
  if (submit) {
    if (isEmpty(value)) {
      return <MsgError msg={`${placeholder} required`} />;
    } else if (!isNumber(value)) {
      return <MsgError msg={`${placeholder} invalide`}  />;
    }else  if((max===min)&& (value.length !=max) ){
        return <MsgError msg={`${placeholder} Must ${min} Number`} />;
    }else if(value.length<min){
        return <MsgError msg={`${placeholder} have ${min} number minimum`} />;
    }else if(value.length>max){
        return <MsgError msg={`${placeholder} have ${max} number maximum`} />;
    }
  }
  return null;
};

const InputNumber = ({ bind, value, submit, placeholder, max,min }) => {
  return (
    <div>
      <input
        {...bind}
        placeholder={placeholder || "Label"}
        className=" h-10 w-full appearance-none border rounded border-gray-400 hover:border-black hover:cursor-pointer  py-2 px-3 text-gray-700 text-base leading-tight focus:outline-none "
      />
      <Error submit={submit} value={value} placeholder={placeholder} max={max} min={min} />
    </div>
  );
};

export default InputNumber;
