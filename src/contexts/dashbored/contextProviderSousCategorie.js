import React, { createContext, useContext, useState, useEffect } from "react";
import useTextInput from "../../hooks/inputText";
import { UseStateContext } from "../contextProvider";
import { getAll as getAllCategorieService } from "../../service/categorie";
import {
  getAll as getAllSousCategorieService,
  deleteById,
} from "../../service/sousCategorie.service";
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
  {
    label: "Sous Categorie",
    link: "dashbored/sousCategorie",
  },
];

export const ContextProviderSouCategorie = ({ children }) => {
  const [nav, setNav] = useState(NavSechma);
  const [categories, setCategories] = useState([]);
  const [dataSousCategorie, setDataSousCategorie] = useState([]);
  const [dataRechercheCategorie, setDataRechercheCategorie] = useState([]);
  const [update, setUpdate] = useState(false);
  const [item, setItem] = useState({});
  const { handleClickSnackbar, severityESWI, handleOpenModel } =
    UseStateContext();
  const [
    RechercheCategorie,
    bindRechercheCategorie,
    resetRechercheCategorie,
    setRechercheCategorie,
  ] = useTextInput("All");

  useEffect(() => {
    filterParCategorie();
  }, [RechercheCategorie, dataSousCategorie]);

  useEffect(() => {
    getAllCategorie();
    getAllSousCategorie();
    
  }, []);

  const resetUpdate = () => {
    setUpdate(false);
    setItem({});
  };

  const getIdCategorieFromUrl = () =>{
    let urlElements = window.location.href.split("/");
    let length = urlElements.length;
    console.log(urlElements[length - 1]);
    if (urlElements[length - 1] != "sousCategorie") {
      setRechercheCategorie(urlElements[length - 1]);
    } else {
      setRechercheCategorie("All");
    }
  }

  const filterParCategorie = () => {
    setDataRechercheCategorie((art) => []);
    if (RechercheCategorie === "All") {
      setDataRechercheCategorie((art) => dataSousCategorie);
    } else {
      var arry = dataSousCategorie.filter(
        (item) => RechercheCategorie === item.categorie._id
      );
      setDataRechercheCategorie((art) => arry);
    }
  };

  const handleUpdate = (item) => {
    console.log(item);
    setItem(item);
    handleOpenModel();
    setUpdate(true);
  };

  const getAllSousCategorie = async () => {
    await getAllSousCategorieService()
      .then((result) => {
        console.log(result);
        resetUpdate()
        setDataSousCategorie(result.categories);
      })
      .catch((error) => {
        setDataSousCategorie([]);

        console.log(error);
      });
  };

  const DeleteSousCategorieById = async (id) => {
    console.log(id);
    await deleteById(id)
      .then((result) => {
        console.log(result);
        handleClickSnackbar(
          "Sous Categorie delete successfully",
          severityESWI[1]
        );
        getAllSousCategorie();
      })
      .catch((error) => {
        handleClickSnackbar("failed delete Sous Categorie", severityESWI[1]);
        console.log(error);
      });
  };

  const getAllCategorie = async () => {
    await getAllCategorieService()
      .then((result) => {
        console.log(result.data);
        
        setCategories(result.data);
        getIdCategorieFromUrl()
      })
      .catch((error) => {
        setCategories([]);
      });
  };

  return (
    <StateContext.Provider
      value={{
        nav,
        bindRechercheCategorie,
        categories,
        DeleteSousCategorieById,
        dataRechercheCategorie,
        RechercheCategorie,
        getAllSousCategorie,
        handleUpdate,
        update,
        item,
        resetUpdate,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const UseStateContextSousCategorie = () => useContext(StateContext);
