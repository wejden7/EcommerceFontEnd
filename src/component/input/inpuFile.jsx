import React from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { isEmptyFile } from "../../validateur/validator";

const MessageError = ({ msg }) => (
  <p className="text-right text-xs text-red-500">{msg}</p>
);

const Error = ({ file, submit }) => {
  if (submit) if (isEmptyFile(file[0])) return <MessageError msg="required" />;

  return null;
};

const InputFile = ({ bind, file, resetIcon, multiple, submit ,update}) => {
  return (
    <>
      <div className="flex  items-center justify-center   ">
        <label className="flex flex-col  h-32 border-4 border  border-dotted hover:bg-gray-100 cursor-pointer">
          <div className="flex flex-col items-center justify-center pt-7">
            {!file[0] ? (
              <AiOutlineCloudUpload className="w-8 h-8 opacity-50" />
            ) : (
              <img
                className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                alt="uploadImage"
                src={file[0]}
              />
            )}
            <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
              Attach a Icon
            </p>
          </div>
          <input
            type="file"
            className=" w-60 md:w-68 opacity-0"
            {...bind}
            multiple={multiple}
            id="upload"
            accept="image/*"
          />
        </label>
      </div>
      {!update&&<Error file={file} submit={submit} />}
      {file[0] && (
        <button
          onClick={() => {
            resetIcon();
          }}
        >
          Reset
        </button>
      )}
    </>
  );
};

export default InputFile;
