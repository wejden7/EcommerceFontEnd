import React from "react";
import {
  InputText,
  InputFileMini,
  InputSelect,
  InputTextArea,
} from "../../component";
import { UseStateContextProduit } from "../../page/dashbored/produit/produit";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FormProduit = ({}) => {
  const {
    file,
    description,
    categorie,
    forniseur,
    marque,
    bindcategorieSelect,
    bindForniseurSelect,
    bindmarqueSelect,
    bindName,
    bindPrix,
    bindQuantity,
    bindTva,
    bindtitelDescription,
    bindbodyDescription,
    pushDescription,
    removeDescription,
    updateDescription,
    updateDescriptionCliked,
    clickedUpdateDescription,
    bindimage,
    createProduit,
    saveClicked,
    error,
    addClicked,
    errorDescription,
  } = UseStateContextProduit();
  return (
    <form className="grid  border border-gray-400 rounded-md p-4 md:grid-cols-3 gap-4 ">
      <div className=" grid grid-cols-5 justify-between ">
        <div className="col-span-4">
          <InputText
            saveCliked={saveClicked}
            errorLabel={error.name}
            bind={bindName}
            placeholder="Nom de Produit"
          />
        </div>
          <div className="grid justify-end">
          <InputFileMini bind={bindimage} multiple={true} />
          </div>
      </div>

      <div className="md:col-span-2 grid md:grid-cols-3 gap-4">
        <InputText
          saveCliked={saveClicked}
          errorLabel={error.prix}
          bind={bindPrix}
          placeholder="Prix"
        />
        <InputText
          saveCliked={saveClicked}
          errorLabel={error.quantity}
          bind={bindQuantity}
          placeholder="Quantity"
        />
        <InputText
          saveCliked={saveClicked}
          errorLabel={error.tva}
          bind={bindTva}
          placeholder="Tva"
        />
      </div>

      <InputSelect
        SubmitCliked={saveClicked}
        error={error.categorie}
        bind={bindcategorieSelect}
        data={categorie}
        titel="Categorie"
      />
      <InputSelect
        SubmitCliked={saveClicked}
        error={error.marque}
        bind={bindmarqueSelect}
        data={marque}
        titel="Marque"
      />
      <InputSelect
        SubmitCliked={saveClicked}
        error={error.forniseur}
        bind={bindForniseurSelect}
        data={forniseur}
        titel="Forniseur"
      />
      <div className="md:col-span-3 grid gap-2 w-full">
        <p className="font-bold text-blue-500">Description :</p>
        <div className=" grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <InputText
              saveCliked={addClicked}
              errorLabel={errorDescription.title}
              bind={bindtitelDescription}
              placeholder="Titel"
            />
          </div>
        </div>
        <InputTextArea
          saveCliked={addClicked}
          errorLabel={errorDescription.body}
          bind={bindbodyDescription}
        />
        <div className="grid justify-end">
          {!clickedUpdateDescription ? (
            <button
              type="button"
              onClick={pushDescription}
              className=" w-min bg-blue-300 py-2 px-4 rounded text-white hover:bg-blue-500 transition duration-300 ease-in-out"
            >
              Add
            </button>
          ) : (
            <button
              type="button"
              onClick={updateDescription}
              className=" w-min bg-green-300 py-2 px-4 rounded text-white hover:bg-green-500 transition duration-300 ease-in-out"
            >
              update
            </button>
          )}
        </div>
      </div>

      <div className="md:col-span-3 gap-4 grid w-full h-full ">
        {description.map((item, index) => {
          return (
            <div key={index}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <p className="font-bold text-xl tracking-wider text-blue-500">
                    {item.title}
                  </p>
                </AccordionSummary>
                <AccordionDetails>
                  <p className="text-md text-gray-500 tracking-wider ml-5">
                    {item.description}
                  </p>
                  <div className="grid  grid-cols-2 mt-3 divide-x">
                    <button
                      type="button"
                      className="text-red-500 hover:text-white hover:bg-red-500 py-2 transition duration-300 ease-in-out"
                      onClick={() => {
                        removeDescription(item);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="text-green-500 hover:text-white hover:bg-green-500 py-2 transition duration-300 ease-in-out"
                      onClick={() => {
                        updateDescriptionCliked(item, index);
                      }}
                    >
                      update
                    </button>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          );
        })}
      </div>
      <div className="md:col-span-3  grid md:grid-cols-4 place-items-center gap-2">
        {file.map((item, index) => {
          return (
            <div key={index} className=" border ">
              <img className="  w-60 h-60 " alt="uploadImage" src={item} />
            </div>
          );
        })}
      </div>
      <div className="grid md:col-span-3 justify-end">
        <button
          type="button"
          onClick={createProduit}
          className=" w-min bg-blue-300 py-2 px-4 rounded text-white hover:bg-blue-500 transition duration-300 ease-in-out"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default FormProduit;
