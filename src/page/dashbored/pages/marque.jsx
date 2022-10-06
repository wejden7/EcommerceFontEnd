import React from "react";
import {
  Nav,
  SnackBarComponent,
  InputSerch,
  CardMarque,
  FormMarque,
} from "../../../component";
import { UseStateContextMarque } from "../../../contexts/dashbored/contextProviderMarque";
import { AnimatePresence } from "framer-motion";
const Marque = () => {
  const { nav, filterMarque, bindSearch, deleteMarque, handelUpdate } =
    UseStateContextMarque();

  return (
    <div className="m-3">
      <Nav Nav={nav} />
      <div className="grid gap-5   rounded ">
        <div className=" grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5  ">
          <div className="sm:col-start-3 md:col-start-4 lg:col-start-5  ">
            <InputSerch bind={bindSearch} />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5   ">
          <AnimatePresence>
            <FormMarque />
            {filterMarque.map((item, index) => {
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
