import React from "react";

import {InputText,InputFile,InputSelect} from ".."
    
const FormCategorie = ({
  bindlabel,
  bindIcon,
  file,
  resetIcon,
  error,
  submit,
  updateCliked,
  handleSubmit,
  handleUpdate,
  update,
  data,
  bindSelect,
  titel
}) => {
  return (
    <div className="grid  h-full place-items-center ">
      <div className=" bg-white  p-4 rounded ">
        <div className="flex justify-between mb-2">
          <p className="mb-2 font-bold text-black w-full text-center  ">
            {!update ? "New " : "Update "}
          </p>
        </div>
        <form>
          <div className="grid gap-y-2">
          
            {data!=null && <InputSelect titel={titel} bind={bindSelect}  data={data} error={error.select}  SubmitCliked={submit}/>}

           
            <InputText
              bind={bindlabel}
              saveCliked={submit}
              updateCliked={updateCliked}
              errorLabel={error.label}
              
            />
            <InputFile
             bind={bindIcon}
             saveCliked={submit}
             file={file}
             resetIcon={resetIcon}
             errorIcon={error.icon}
            />
            
            {!update && (
              <button
                type="button"
                className="flex items-center justify-center gap-2 w-full text-white rounded py-2 text-lg bg-sky-600 hover:drop-shadow-xl hover:bg-sky-400 mt-3"
                onClick={handleSubmit}
              >
                Save
              </button>
            )}
            {update && (
              <button
                type="button"
                className="flex items-center justify-center gap-2 w-full text-white rounded py-2 text-lg bg-sky-600 hover:drop-shadow-xl hover:bg-sky-400 mt-3"
                onClick={handleUpdate}
              >
                Update
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormCategorie;
