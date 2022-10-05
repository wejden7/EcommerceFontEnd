import React, { createContext, useContext, useState, useEffect } from "react";
import useTextInput from "../../hooks/inputText";
import { UseStateContext } from "../contextProvider";
import { getAll as getAllCategorieService } from "../../service/categorie";
import { getAll as getAllSousCategorieService } from "../../service/sousCategorie.service";
import {
  getAll as getAllSousSousCategorieService,
  deleteById,
} from "../../service/sousSousCategorie.service";
const StateContext = createContext();
const NavSechma = [
  {
    label: "Dashbored",
    link: "dashbored",
  },
  {
    label: "SousCategorie",
    link: "dashbored/sousCategorie",
  },
  {
    label: "Sous SousCategorie",
    link: "dashbored/sousSousCategorie",
  },
];

export const ContextProviderSousSousCategorie = ({ children }) => {
  const [nav] = useState(NavSechma);
  const [update, setUpdate] = useState(false);
  const [item, setItem] = useState({});
  const [categorie, bindCategorie] = useTextInput("All");
  const [sousCategorie, bindSousCategorie, setSousCategorie] =
    useTextInput("All");
  const [serchLabel, bindSerchLabel] = useTextInput("");
  const [categories, setCategories] = useState([]);
  const [sousCategories, setSousCategories] = useState([]);
  const [sousSousCategories, setSousSousCategories] = useState([]);
  const [filterSousCategories, setFilterSousCategorie] = useState([]);
  const [filterCategories, setFilterCategorie] = useState([]);
  const [filterLabels, setFilterLabel] = useState([]);
  const { handleClickSnackbar, severityESWI, handleOpenModel } =
    UseStateContext();
 

  useEffect(() => {
    setSousCategorie("All");
  }, [categorie]);

  useEffect(() => {
    const filter = () => {
      console.log("filter");
      setFilterCategorie((art) => []);
      if (categorie === "All") {
        setFilterCategorie((art) => sousCategories);
        setFilterSousCategorie((art) => []);
  
        if (sousCategorie === "All") {
          console.log("All");
          setFilterSousCategorie((art) => sousSousCategories);
        } else {
          var tab = sousSousCategories.filter(
            (item) => sousCategorie === item.souscategorie._id
          );
          setFilterSousCategorie((l) => tab);
        }
      } else {
        setFilterSousCategorie((art) => []);
        var tab1 = sousCategories.filter(
          (item) => categorie === item.categorie._id
        );
        setFilterCategorie((l) => tab1);
  
        if (sousCategorie === "All") {
          console.log(tab1);
  
          var tab3 = sousSousCategories.filter(
            (item2) =>
              tab1.filter((item1) => item1._id === item2.souscategorie._id)
                .length > 0
          );
          console.log(tab3);
          setFilterSousCategorie((art) => tab3);
        } else {
          var tab2 = sousSousCategories.filter(
            (item2) => sousCategorie === item2.souscategorie._id
          );
          setFilterSousCategorie((l) => tab2);
        }
      }
    };
    filter();
  }, [sousCategorie, sousSousCategories, categorie, sousCategories]);


  useEffect(() => {
    const filterSerch = () => {
      console.log("search");
      setFilterLabel((art) => []);
  
      if (serchLabel.length === 0) {
        setFilterLabel((art) => filterSousCategories);
      } else {
        var tble = filterSousCategories.filter((item) =>
          item.label.toUpperCase().includes(serchLabel.toUpperCase())
        );
        setFilterLabel((art) => tble);
      }
    };
    filterSerch();
  }, [serchLabel, filterSousCategories]);

  useEffect(() => {
    getAllCategorie();
    getAllSousCategorie();
    getAllSousSousCategorie();
  }, []);

  const resetUpdate = () => {
    setUpdate(false);
    setItem({});
  };

  const handleUpdate = (item) => {
    setItem(item);
    handleOpenModel();
    setUpdate(true);
  };

  const getAllSousSousCategorie = async () => {
    await getAllSousSousCategorieService()
      .then((result) => {
        resetUpdate();
        setSousSousCategories(result.categories);
      })
      .catch((error) => {
        setSousSousCategories([]);

        console.log(error);
      });
  };

  const DeleteSousSousCategorieById = async (id) => {
    console.log(id);
    await deleteById(id)
      .then((result) => {
        console.log(result);
        handleClickSnackbar(
          "Sous SousCategorie delete successfully",
          severityESWI[1]
        );
        getAllSousSousCategorie();
      })
      .catch((error) => {
        handleClickSnackbar(
          "failed delete Sous SousCategorie",
          severityESWI[1]
        );
        console.log(error);
      });
  };

  const getAllCategorie = async () => {
    await getAllCategorieService()
      .then((result) => {
        console.log(result.data);
        setCategories(result.data);
      })
      .catch((error) => {});
  };

  const getAllSousCategorie = async () => {
    await getAllSousCategorieService()
      .then((result) => {
        console.log(result);
        setSousCategories(result.categories);
      })
      .catch((error) => {});
  };

  return (
    <StateContext.Provider
      value={{
        nav,
        bindSerchLabel,
        bindCategorie,
        bindSousCategorie,
        categories,
        filterCategories,
        sousCategories,
        filterLabels,
        update,
        item,
        getAllSousSousCategorie,
        DeleteSousSousCategorieById,
        resetUpdate,
        handleUpdate,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const UseStateContextSousSousCategorie = () => useContext(StateContext);
