import React from "react";
import { InputText, InputSelect, InputFile } from "../../../component";
const squareVariants = {
  visible: { opacity: 1, transition: { duration: 1 } },
  hidden: { opacity: 0, transition: { duration: 1 } },
};

const Button = (props) => (
  <button
    type="button"
    className={`col-start-6 bg-${props.color}-500 py-2 rounded text-white font-bold tracking-wider`}
    onClick={props.onClick}
  >
    {props.label}
  </button>
);

const FormProduit = ({params}) => {
  return (
    <form className="grid  border border-gray-400 rounded-md p-4 md:grid-cols-3 gap-3  ">
   
      <div className="col-span-3 grid grid-cols-3 gap-4">
        <InputText
          bind={params.bindName}
          value={params.name}
          submit={params.submit}
          placeholder="Name"
        />
      </div>
      <div className="col-span-3 grid grid-cols-3 gap-4">
        <InputText
          bind={params.bindTva}
          value={params.tva}
          submit={params.submit}
          placeholder="Tva"
        />
        <InputText
          bind={params.bindPrix}
          value={params.prix}
          submit={params.submit}
          placeholder="Prix"
        />
        <InputText
          bind={params.bindQuantity}
          value={params.quantity}
          submit={params.submit}
          placeholder="Quantity"
        />
      </div>
      <div className="col-span-3 grid grid-cols-3 gap-4">
        <InputSelect
          titel="Categorie"
          bind={params.bindCategorie}
          data={params.categories}
          value={params.categorie}
          submit={params.submit}
          placeholder="Categorie"
        />
        <InputSelect
          titel="Marque"
          bind={params.bindMarque}
          data={params.marques}
          value={params.marque}
          submit={params.submit}
          placeholder="Marque"
        />
        <InputSelect
          titel="Forniseur"
          bind={params.bindForniseur}
          data={params.forniseurs}
          value={params.forniseur}
          submit={params.submit}
          placeholder="Forniseur"
        />
      </div>
     {!params.update&& <div className="col-span-3 grid grid-cols-1 gap-4 h-full place-items-center">
        <InputFile
          bind={params.bindFile}
          file={params.file}
          resetIcon={params.reset}
          multiple={false}
          submit={params.submit}
          update={params.update}
        />
      </div>}
      <div className="col-span-3 grid grid-cols-6 ">
        <p className="col-span-3  text-xs flex items-end text-red-500 align-bottom h-full">
          {params.error}
        </p>
        {!params.update ? (
          <Button onClick={params.createProduitFunction} color="blue" label="Save" />
        ) : (
          <Button onClick={params.updateProduitFunction} color="green" label="Update" />
        )}
      </div>
    </form>
  );
};

export default FormProduit;
