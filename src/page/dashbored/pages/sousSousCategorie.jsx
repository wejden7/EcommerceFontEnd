import React from "react";
import {
  SnackBarComponent,
  Nav,
  CardCategorie,
  ModelComponent,
  FormSousSousCategorie,
  InputSelect,
  InputSerch,
} from "../../../component";


import { UseStateContextSousSousCategorie } from "../../../contexts/dashbored/contextProviderSousSousCategorie";

import { AnimatePresence } from "framer-motion";

const SousSousCategorie = () => {
  const {
    bindSerchLabel,
    categories,
    bindSousCategorie,
    bindCategorie,
    filterCategories,
    filterLabels,
    DeleteSousSousCategorieById,
    handleUpdate,
    nav,
  } = UseStateContextSousSousCategorie();

  return (
    <div className="m-2">
      <Nav Nav={nav} />
      <div className="bg-blue-700 w-full mt-1 p-5 mb-3 rounded-md flex items-center justify-between">
        <p className="text-xl font-bold text-white tracking-wider">
          Sous SousCategorie
        </p>

        <ModelComponent>
          <FormSousSousCategorie />
        </ModelComponent>
      </div>
      <div className="bg-white  w-full gap-4 rounded p-5 flex justify-center items-center">
        <p className="text-xl hidden sm:flex  min-w-max font-bold text-blue-700 tracking-wider mr-1">
          Recherce :
        </p>
        <div className="flex  w-full gap-4 hidden sm:flex items-center">
          <InputSelect
            titel={"Categorie"}
            data={categories}
            bind={bindCategorie}
            search={true}
          />
          <InputSelect
            titel={"SousCategorie"}
            data={filterCategories}
            bind={bindSousCategorie}
            search={true}
          />
        </div>

        <div className="w-1/2 border rounded-md  ">
          <InputSerch bind={bindSerchLabel} />
        </div>
      </div>

      <div className="grid grid-cols-2 justify-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ease-in-out gap-4 mt-4">
        <AnimatePresence>
          {filterLabels.map((item, index) => {
            return (
              <CardCategorie
                key={item._id}
                item={item}
                Delete={DeleteSousSousCategorieById}
                Update={handleUpdate}
                url="/dashbored/sousSousCategorie/"
              />
            );
          })}
        </AnimatePresence>
      </div>
      {(filterLabels.length === 0 ||
        filterCategories.length === 0) && (
        <div className="grid  h-full place-items-center">
          <p>Cet Categorie Et Vide </p>
        </div>
      )}

      <SnackBarComponent />
    </div>
  );
};

export default SousSousCategorie;
