import React from "react";
import { InputText, InputNumber } from "../../../component";
import useFormForniseur from "./FormForniseur";

const FormForniseur = () => {
  const [
    bindName,
    bindEmail,
    bindTel,
    bindAdresse,
    name,
    email,
    tel,
    adresse,
    submit,
    update,
    UpdateForniseur,
    CreateForniseur,
  ] = useFormForniseur();
  return (
    <form className="grid gap-3  justify-items-center ">
      <p className="font-medium tracking-wider text-blue-500 ">New Forniseur</p>
      <div className="w-3/4   ">
        <div>
          <InputText
            bind={bindName}
            value={name}
            submit={submit}
            placeholder={"Name"}
          />
        </div>

        <div>
          <InputText
            bind={bindEmail}
            value={email}
            submit={submit}
            placeholder={"Email"}
            type="Email"
          />
        </div>

        <div>
          <InputNumber
            bind={bindTel}
            value={tel}
            submit={submit}
            placeholder={"Phone"}
            max={8}
            min={8}
          />
        </div>

        <div>
          <InputText
            bind={bindAdresse}
            value={adresse}
            submit={submit}
            placeholder={"Adresse"}
          />
        </div>
      </div>

      <div className="flex  justify-center  md:justify-end w-3/4 ">
        {!update ? (
          <button
            type="button"
            onClick={CreateForniseur}
            className=" rounded bg-blue-500 w-full md:w-min  px-3 py-1 text-white"
          >
            Save
          </button>
        ) : (
          <button
            type="button"
            onClick={UpdateForniseur}
            className=" rounded bg-green-500 w-full md:w-min  px-3 py-1 text-white"
          >
            Update
          </button>
        )}
      </div>
    </form>
  );
};

export default FormForniseur;
