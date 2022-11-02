import React from "react";
import { isEmail, isEmpty,isDouble } from "../../validateur/validator";

const MsgError = ({ msg }) => (
  <p className="text-xs tracking-wider text-red-500 text-end h-4">{msg}</p>
);

const Error = ({ submit, value, type ,placeholder}) => {
  if (submit) {
    if (isEmpty(value)) {
      return <MsgError msg={`${placeholder} is Required`} />;
    } else if (type === "Email" && !isEmail(value)) {
      return <MsgError msg="Email invalid" />;
    }
  }
  return  <MsgError msg="" />;
};

const InputText = ({ bind, value, submit, placeholder, type }) => {
  return (
    <div>
      <input
        {...bind}
        placeholder={placeholder || "Label"}
        className=" h-10  w-full appearance-none border rounded border-gray-400 hover:border-black hover:cursor-pointer  py-2 px-3 text-gray-700 text-base leading-tight focus:outline-none "
        type="text"
      />
      <Error submit={submit} value={value} type={type} placeholder={placeholder} />
    </div>
  );
};

export default InputText;
