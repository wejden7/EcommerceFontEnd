import React, { createContext, useContext, useState, useEffect } from "react";
import { UseStateContext } from "../contextProvider";
import { getAll, deleteById } from "../../service/categorie";
const StateContext = createContext();
const NavSechma = [
  {
    label: "Dashbored",
    link: "dashbored",
  },
  {
    label: "Categorie",
    link: "dashbored/categorie",
  },
];
export const ContextProvider = ({ children }) => {
  const [nav, setNav] = useState(NavSechma);
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [item, setItem] = useState({});
  const { handleClickSnackbar, severityESWI, handleOpenModel } =
    UseStateContext();

  useEffect(() => {
    getAllCategorie();
  }, []);

  const resetUpdate = () => {
    setUpdate(false);
    setItem({});
  };

  const ClickUpadet = (item) => {
    setUpdate(true);
    setItem(item);
    handleOpenModel();
  };

  const deleteCategoriById = async (id) => {
    await deleteById(id)
      .then(async () => {
        handleClickSnackbar("Delete Categorie", severityESWI[1]);
        await getAllCategorie();
      })
      .catch(() => {});
  };

  const getAllCategorie = async () => {
    await getAll()
      .then((res) => {
        resetUpdate();
        setData(res.data);
      })
      .catch((error) => {
        setData([]);
        console.log(error);
      });
  };

  return (
    <StateContext.Provider
      value={{
        getAllCategorie,
        setItem,
        ClickUpadet,
        deleteCategoriById,
        resetUpdate,
        nav,
        update,
        data,
        item
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const UseStateContextCategorie = () => useContext(StateContext);
