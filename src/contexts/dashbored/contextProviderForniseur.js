import React, { createContext, useContext, useState, useEffect } from "react";
import { getAll, deleteByArrayId } from "../../service/forniseur.service";
import { UseStateContext } from "../contextProvider";
const StateContext = createContext();
const NavSechma = [
  {
    label: "Dashbored",
    link: "dashbored",
  },
  {
    label: "Forniseur",
    link: "dashbored/forniseur",
  },
];

export const ContextProviderForniseur = ({ children }) => {
  const [nav] = useState(NavSechma);
  const [update, setUpdate] = useState(false);
  const [item, setItem] = useState({});
  const [forniseur, setForniseur] = useState([]);
  const [forniseurSelected, setForniseurSelected] = useState([]);
  const { handleClickSnackbar, severityESWI } = UseStateContext();

  useEffect(() => {
    getAllForniseur();
  }, []);

  useEffect(() => {
    if (forniseurSelected.length !== 1 && update) 
      resetUpdate();
    
  }, [forniseurSelected]);

  const resetUpdate = () => {
    setItem({});
    setUpdate(false);
  };

  const itemSelect = (item) => {
    setForniseurSelected((a) => item);
  };

  const handelUpdate = () => {
    if (forniseurSelected.length === 1) {
      var data = forniseur.filter((item) => item._id === forniseurSelected[0]);
      setUpdate(true);
      setItem(data[0]);
    }
  };

  const getAllForniseur = async () => {
    await getAll()
      .then((result) => {
        resetUpdate();
        setForniseur(result);
      })
      .catch((error) => {
       
        setForniseur((l) => []);
      });
  };

  const deleteForniseur = async () => {
    await deleteByArrayId(forniseurSelected)
      .then((result) => {
       
        getAllForniseur();
        handleClickSnackbar("Delete Forniseur successfully",severityESWI[1])
      })
      .catch((error) => {
        handleClickSnackbar("Delete Error ",severityESWI[0])
       
      });
  };

  return (
    <StateContext.Provider
      value={{
        nav,
        update,
        forniseur,
        forniseurSelected,
        item,
        getAllForniseur,
        handelUpdate,
        deleteForniseur,
        itemSelect,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const UseStateContextForniseur = () => useContext(StateContext);
