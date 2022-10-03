import React from "react";
import {
  Nav,
  SnackBarComponent,
  InputText,
  InputFileMini,
  InputSerch,
  CardNewMarque,
  CardMarque,
} from "../../../component";
import { UseStateContextMarque } from "../../../contexts/dashbored/contextProviderMarque";
import { AnimatePresence } from "framer-motion";
const Marque = () => {
  const {
    nav,
    label,
    bindLabel,
    bindLogo,
    file,
    saveCliked,
    handelSave,
    error,
    marquesSearch,
    bindSearch,
    deleteMarque,
    handelUpdate,
    update,
    updateMarque,
    updateCliked,
    reset,
    progress,
    loding,
  } = UseStateContextMarque();

  return (
    <div className="m-3">
      <Nav Nav={nav}/>
      
      <div className="grid gap-5   rounded ">
        <div className=" grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5  ">
          <form className="sm:col-span-2 grid grid-cols-2 gap-5 ">
            <div className="col-span-1 ">
              <InputText
                bind={bindLabel}
                saveCliked={saveCliked}
                updateCliked={updateCliked}
                errorLabel={error.label}
              />
            </div>
            <div className="col-span-1    rounded">
              <InputFileMini
                bind={bindLogo}
                saveCliked={saveCliked}
                ErrorLogo={error.logo != ""}
              />
            </div>
          </form>
          <div className="sm:col-start-3 md:col-start-4 lg:col-start-5  ">
            <InputSerch bind={bindSearch} />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5   ">
          <AnimatePresence>
            {(file.length ==1 || label.length > 0) && (
              <CardNewMarque
                update={update}
                file={file[0]}
                label={label}
                reset={reset}
                SaveFunction={handelSave}
                UpdateFunction={updateMarque}
                loding={loding}
                progress={progress}
              />
            )}
            {marquesSearch.map((item, index) => {
              return (
                <CardMarque
                  key={item._id}
                  item={item}
                  Update={handelUpdate}
                  Delete={deleteMarque}
                />
              );
            })}
          </AnimatePresence>
        </div>
      </div>
      <SnackBarComponent />
    </div>
  );
};
export default Marque;
