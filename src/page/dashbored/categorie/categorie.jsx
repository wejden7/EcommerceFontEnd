import React from "react";
import { AnimatePresence } from "framer-motion";

import { UseStateContextCategorie } from "./contextCategorie";
import {
  Nav,
  ModelComponent,
  CardCategorie,
  SnackBarComponent,
  FormCategorie,
} from "../../../component";

const Categorie = () => {
  const {
    data,
    deleteCategoriById,
    handleClickUpadet,
    bindlabel,
    bindIcon,
    file,
    resetIcon,
    error,
    submit,
    handleSubmit,
    handleUpdate,
    update,
    updateCliked,
    nav
  } = UseStateContextCategorie();

  return (
    <div className="m-2">
      <Nav Nav={nav} />
      <div className="bg-blue-700 w-full mt-1 p-5 rounded-md flex items-center justify-between">
        <p className="text-xl font-bold text-white tracking-wider">Categorie</p>
        <ModelComponent >
          <FormCategorie
            bindlabel={bindlabel}
            bindIcon={bindIcon}
            file={file}
            resetIcon={resetIcon}
            error={error}
            submit={submit}
            updateCliked={updateCliked}
            handleSubmit={handleSubmit}
            handleUpdate={handleUpdate}
            update={update}
          />
       
        </ModelComponent>
      </div>
      <div className=" grid grid-cols-2 justify-center sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ease-in-out gap-4 mt-4">
        <AnimatePresence>
          {data.map((item) => {
            return (
              <CardCategorie
                key={item._id}
                item={item}
                deleteCategoriById={deleteCategoriById}
                handleClickUpadet={handleClickUpadet}
                next="sousCategorie"
              />
            );
          })}
        </AnimatePresence>
      </div>
      {data.length === 0 && (
        <div className="grid h-full place-items-center">
          <p>Vide</p>
        </div>
      )}
      <div>
        <SnackBarComponent />
      </div>
    </div>
  );
};

export default Categorie;
