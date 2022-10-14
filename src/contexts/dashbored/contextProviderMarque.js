import React, { createContext, useContext, useEffect, useState } from "react";
import useTextInput from "../../hooks/inputText";
import { UseStateContext } from "../contextProvider";
import {
  create,
  getAll,
  deleteById,
  updateById,
} from "../../service/marque.service";

const StateContext = createContext();

const NavSechma = [
  {
    label: "Dashbored",
    link: "dashbored",
  },
  {
    label: "marque",
    link: "dashbored/marque",
  },
];
export const ContextProviderMarque = ({ children }) => {
  const { handleClickSnackbar, severityESWI } = UseStateContext();
  const [nav, setNav] = useState(NavSechma);
  const [marques, setMarques] = useState([]);
  const [filterMarque, setFilterMarque] = useState([]);
  const [search, bindSearch, resetSearch, setSearch] = useTextInput("");
  const [item, setItem] = useState();
  const [update, setUpdate] = useState(false);
  const [loders, setLoders] = useState(false);

  const reset = () => {
    setItem({});
    setUpdate(false);
  };

  useEffect(() => {
    setLoders(true);
    getAllMarque();
  }, []);

  useEffect(() => {
    var tab = marques.filter((item) =>
      item.label.toUpperCase().includes(search.toUpperCase())
    );

    setFilterMarque((art) => tab);
  }, [marques, search]);

  const handelUpdate = (_) => {
    setUpdate(true);
    setItem(_);
  };

  const getAllMarque = async () => {
   
    await getAll()
      .then((result) => {
        setMarques(result.data.data);

        setLoders(false);
      })
      .catch((error) => {
        setMarques([]);
      });
  };

  const deleteMarque = async (id) => {
    await deleteById(id)
      .then((result) => {
        handleClickSnackbar("The marque has been delete", severityESWI[1]);
        getAllMarque();
      })
      .catch((error) => {
        handleClickSnackbar("here was an error", severityESWI[0]);
      });
  };

  return (
    <StateContext.Provider
      value={{
        reset,
        item,
        bindSearch,
        nav,
        filterMarque,
        deleteMarque,
        update,
        getAllMarque,
        handelUpdate,
        loders,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const UseStateContextMarque = () => useContext(StateContext);
