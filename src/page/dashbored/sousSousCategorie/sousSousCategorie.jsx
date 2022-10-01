import React, { useEffect, useState } from "react";
import {
  SnackBarComponent,
  Nav,
  CardCategorie,
  ModelComponent,
  FormCategorie,
  InputSelect,
  InputSerch

} from "../../../component";

import { UseStateContext } from "../../../contexts/contextProvider";

import { UseStateContextSousSousCategorie } from "./contextSousSousCategorie";

import { AnimatePresence } from "framer-motion";

const SousSousCategorie = () => {
  const { handleClickSnackbar, severityESWI } = UseStateContext();
  const {
    dataSousCategorie,
    bindSouscategorie,
    update,
    bindlabel,
    file,
    bindIcon,
    handleSubmit,
    updateCliked,
    SubmitCliked,
    error,
    updateSousSousCategorieBuId,
    resetIcon,
    bindSerchText,
    dataCategorie,
    bindRechercheSousCategorie,
    bindRechercheCategorie,
    dataRechercheCategorie,
    dataRechercheTextCategorie,
    DeleteSousSousCategorieById,
    handleUpdate,
    nav
  } = UseStateContextSousSousCategorie();

  return (
    <div className="m-2">
      <Nav Nav={nav} />
      <div className="bg-blue-700 w-full mt-1 p-5 mb-3 rounded-md flex items-center justify-between">
        <p className="text-xl font-bold text-white tracking-wider">
          Sous SousCategorie
        </p>

        <ModelComponent>
        <FormCategorie
            resetIcon={resetIcon}
            error={error}
            handleSubmit={handleSubmit}
            handleUpdate={updateSousSousCategorieBuId}
            update={update}
            submit={SubmitCliked}
            updateCliked={updateCliked}
            bindIcon={bindIcon}
            bindSelect={bindSouscategorie}
            bindlabel={bindlabel}
            file={file}
            data={dataSousCategorie}
            titel="SousCategorie"
          />
        </ModelComponent>
      </div>
      <div className="bg-white  w-full gap-4 rounded p-5 flex justify-center items-center">
        <p className="text-xl hidden sm:flex  min-w-max font-bold text-blue-700 tracking-wider mr-1">
          Recherce :
        </p>
        <div className="flex  w-full gap-4 hidden sm:flex items-center">
        <InputSelect
              titel={"Categorie"}
              data={dataCategorie}
              bind={bindRechercheCategorie}
              search={true}
            />
             <InputSelect
              titel={"SousCategorie"}
              data={dataRechercheCategorie}
              bind={bindRechercheSousCategorie}
              search={true}
            />
          
        </div>

        <div className="w-1/2 border rounded-md  ">
          <InputSerch
          bind={bindSerchText}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 justify-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ease-in-out gap-4 mt-4">
        <AnimatePresence>
          {dataRechercheTextCategorie.map((item, index) => {
            return (
              <CardCategorie
            key={item._id}
            item={item}
            deleteCategoriById={DeleteSousSousCategorieById}
            handleClickUpadet={handleUpdate}
            next="sousSousCategorie"
          />
              
            );
          })}
        </AnimatePresence>
      </div>
      {(dataRechercheTextCategorie.length === 0 ||
        dataRechercheCategorie.length === 0) && (
        <div className="grid  h-full place-items-center">
          <p>Cet Categorie Et Vide </p>
        </div>
      )}

      <SnackBarComponent />
    </div>
  );
};

export default SousSousCategorie;
