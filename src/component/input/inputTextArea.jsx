import React from "react";
import {isEmpty } from "../../validateur/validator";

const ErrorMessage = ({msg}) => <p className="text-xs tracking-wider text-red-500 text-end h-4">{msg}</p>
const Error = ({submit,value,placeholder}) => {
 
  if(submit && isEmpty(value))
 return <ErrorMessage msg={`${placeholder} is Required`}/>
 return <ErrorMessage msg=""/>
};

const InputTextArea = ({ bind, submit,value,placeholder}) => {
  return (
    <div>
      <textarea
        {...bind}
        className="w-full border mb-0 py-2 px-3 border-gray-400 rounded hover:border-black hover:cursor-pointer focus:outline-none "
        name=""
        id=""
        rows="3"
        placeholder={placeholder}
      />
      <Error submit={submit} value={value} placeholder={placeholder}/>
     
    </div>
  );
};

export default InputTextArea;
