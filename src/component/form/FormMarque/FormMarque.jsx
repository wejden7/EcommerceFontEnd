import React from "react";
import { CardNewMarque } from "../../../component";
import { ContextProviderFormMarque } from "./FormMarque";

const FormMarque = () => {
  return (
    <ContextProviderFormMarque>
      <form className="">
        <CardNewMarque />
      </form>
    </ContextProviderFormMarque>
  );
};

export default FormMarque;
