import React from "react";

const InputTextArea = ({
  bind,
  saveCliked,
  updateCliked,
  errorLabel,
}) => {
  return (
    <div>
      <textarea
        {...bind}
        className="w-full border p-3 border-gray-400 rounded hover:border-black hover:cursor-pointer focus:outline-none "
        name=""
        id=""
        rows="3"
      />
      {(saveCliked || updateCliked) && (
        <p className="text-xs text-red-500 text-end">{errorLabel}</p>
      )}
    </div>
  );
};

export default InputTextArea;
