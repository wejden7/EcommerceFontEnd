import React from "react";
import { isEmail, isEmpty } from "../../validateur/validator";

const MsgError = ({ msg }) => (
  <p className="text-xs text-red-500 text-end">{msg}</p>
);

const Error = ({ submit, value, type }) => {
  if (submit) {
    if (isEmpty(value)) {
      return <MsgError msg="required" />;
    } else if (type === "Email" && !isEmail(value)) {
      return <MsgError msg="Email invalid" />;
    }
  }
  return null;
};

const InputText = ({ bind, value, submit, placeholder, type }) => {
  return (
    <div>
      <input
        {...bind}
        placeholder={placeholder || "Label"}
        className=" h-10 w-full appearance-none border rounded border-gray-400 hover:border-black hover:cursor-pointer  py-2 px-3 text-gray-700 text-base leading-tight focus:outline-none "
        type="text"
      />
      <Error submit={submit} value={value} type={type} />
    </div>
  );
};

export default InputText;
