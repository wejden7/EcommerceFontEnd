import React from "react";
import {
  SnackBarComponent,
  Nav,
  ModelComponent,
  FormCategorie,
  CardCategorie,
  InputSelect,
} from "../../../component";
import { AnimatePresence } from "framer-motion";
import { UseStateContextSousCategorie } from "./contextSousCategorie.js";
const SousCategorie = () => {
  const {
    bindcategorie,
    update,
    bindlabel,
    file,
    bindIcon,
    handleSubmit,
    updateCliked,
    SubmitCliked,
    error,
    updateSousCategorieBuId,
    resetIcon,
    dataCategorie,
    bindRechercheCategorie,
    dataRechercheCategorie,
    DeleteSousCategorieById,
    handleUpdate,
    nav
  } = UseStateContextSousCategorie();

  return (
    <div className="m-2">
      <Nav Nav={nav} />
      <div className="bg-blue-700 w-full mt-1 p-5 mb-3 rounded-md flex items-center justify-between">
        <p className="text-xl font-bold text-white tracking-wider">
          Sous Categorie
        </p>

        <ModelComponent>
          <FormCategorie
            resetIcon={resetIcon}
            error={error}
            handleSubmit={handleSubmit}
            handleUpdate={updateSousCategorieBuId}
            update={update}
            submit={SubmitCliked}
            updateCliked={updateCliked}
            bindIcon={bindIcon}
            bindSelect={bindcategorie}
            bindlabel={bindlabel}
            file={file}
            data={dataCategorie}
            titel="Categorie"
          />
        </ModelComponent>
      </div>
      <div className="w-full bg-white p-4">
        <div className="flex gap-2 items-center">
          <p className="w-max text-lg font-bold text-blue-500 ">Filter :</p>

          <div className="w-60">
            <InputSelect
              titel={"Categorie"}
              data={dataCategorie}
              bind={bindRechercheCategorie}
              search={true}
            />
          </div>
        </div>
      </div>

      <div className="grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ease-in-out gap-4 mt-4">
        <AnimatePresence>
          {dataRechercheCategorie.map((item, index) => {
            return (
              <CardCategorie
                key={item._id}
                item={item}
                deleteCategoriById={DeleteSousCategorieById}
                handleClickUpadet={handleUpdate}
                next="sousSousCategorie"
              />
            );
          })}
        </AnimatePresence>
      </div>
      {dataRechercheCategorie.length === 0 && (
        <div className="grid  h-full place-items-center">
          <p>Cet Categorie Et Vide </p>
        </div>
      )}
      <SnackBarComponent />
    </div>
  );
};

export default SousCategorie;
