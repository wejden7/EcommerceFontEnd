import React from "react";

import { InputText, InputFile,InputSelect,Linear } from "../..";
import useFormSousCategorie from "./FormSousCategorie";

const Button = ({ onClick, label, color }) => (
  <button
    type="button"
    className={`flex items-center justify-center gap-2 w-full text-white rounded py-2 text-lg bg-${color}-500 hover:drop-shadow-xl hover:bg-${color}-400 mt-3`}
    onClick={onClick}
  >
    {label}
  </button>
);

const ButtonForm = ({ condition, Update, Save, }) =>
  condition ? (
    <Button onClick={Update} label="Update" color="green"  />
  ) : (
    <Button onClick={Save} label="Save" color="blue" />
  );

const FormSousCategorie = () => {
  const [
    label,
    bindlabel,
    bindIcon,
    bindCategorie,
    categorie,
    file,
    submit,
    saveFunction,
    updateFunction,
    resetIcon,
    update,
    loding,
    lodingValue,
    categories
  ] = useFormSousCategorie();
  return (
    <div className="grid  h-full place-items-center ">
      <div className=" bg-white  p-4 rounded ">
        
        <div className="flex justify-between mb-2">
          <p className="mb-2 font-bold text-black w-full text-center  ">
            New Categorie
          </p>
        </div>
        <form>
          <div className="grid gap-y-2">
         
              <InputSelect
                titel="Categorie"
                bind={bindCategorie}
                data={categories}
                value={categorie}
                submit={submit}
              />
            
            <InputText
              bind={bindlabel}
              value={label}
              submit={submit}
              placeholder="Label"
            />
            <InputFile
              bind={bindIcon}
              file={file}
              update={update}
              resetIcon={resetIcon}
              submit={submit}
            />
            {!loding?<ButtonForm
              condition={update}
              Update={updateFunction}
              Save={saveFunction}
            />:
            <Linear loding={loding}value={lodingValue}/>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormSousCategorie;

 
