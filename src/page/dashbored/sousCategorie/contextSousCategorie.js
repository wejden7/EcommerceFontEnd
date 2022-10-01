import React, { createContext, useContext, useState, useEffect } from "react";
import useTextInput from "../../../hooks/textInput";
import useIconInput from "../../../hooks/iconInput";
import { UseStateContext } from "../../../contexts/contextProvider";
import { getAll } from "../../../service/categorie";
import{isEmpty,isEmptyFile}from "../../../validateur/validator"
import {
  create,
  getAll as getAllSousCategorie,
  deleteById,
  updateById,
} from "../../../service/sousCategorie.service";
const StateContext = createContext();

const Error = {
  label: "",
  icon: "",
  select: "",
};
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
  const {
    handleClickSnackbar,
    severityESWI,
    handleOpenModel,
    handleCloseModel,
  } = UseStateContext();
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState("");
  const [iconUpadte, setIconUpdate] = useState("");
  const [label, bindlabel, resetlabel, setLabel] = useTextInput("");
  const [categorie, bindcategorie, resecategorie, setcategorie] =
    useTextInput("");
  const [
    RechercheCategorie,
    bindRechercheCategorie,
    resetRechercheCategorie,
    setRechercheCategorie,
  ] = useTextInput("All");
  const [file, icon, iconName, bindIcon, resetIcon] = useIconInput();
  const [error, setError] = useState(Error);
  const [formValid, setFormValid] = useState(false);
  const [SubmitCliked, setSubmitCliked] = useState(false);
  const [updateCliked, setUpdateCliked] = useState(false);
  const [formUpadteValid, setFormUpadteValid] = useState(false);
  const [dataCategorie, setDataCategorie] = useState([]);
  const [dataSousCategorie, setDataSousCategorie] = useState([]);
  const [dataRechercheCategorie, setDataRechercheCategorie] = useState([]);

  const resetForm = () => {
    resetlabel();
    resetIcon();
    resecategorie();
    setUpdateCliked(false);
    setSubmitCliked(false);
    setIconUpdate("");
    setUpdate(false);
    setId("");
    setUpdate("");
  };
  
  const functionRecherche = () => {
    setDataRechercheCategorie((art) => []);

    if (RechercheCategorie === "All") {
      setDataRechercheCategorie( (art) => dataSousCategorie);
    } else {
      var arry = dataSousCategorie.filter(
        (item) => RechercheCategorie === item.categorie._id
      );
      setDataRechercheCategorie((art) => arry);
    }
  };
 
  useEffect(() => {
    functionRecherche ()
  }, [RechercheCategorie, dataSousCategorie]);

  useEffect(() => {
    let urlElements = window.location.href.split("/");
    let length = urlElements.length;
    console.log(urlElements[length - 1]);
    if (urlElements[length - 1] != "sousCategorie") {
      setRechercheCategorie(urlElements[length - 1]);
    }else{
      setRechercheCategorie("All");
    }
    getAllCategorie();
    getAllSousCategorieFn();
  }, []);

  useEffect(() => {
    setError((l)=>({...l,label:isEmpty(label)?"Label is required":""}))
  }, [label]);

  useEffect(() => {
    setError((l)=>({...l,icon:isEmptyFile(icon)?"icon is required":""}))
  }, [icon]);

  useEffect(() => {
    setError((l)=>({...l,select:isEmpty(categorie)?"categorie is required":""}))
  }, [categorie]);

 
  useEffect(()=>{
    setFormValid(!(isEmpty(label)||isEmptyFile(icon)||isEmpty(categorie)))
    setFormUpadteValid(!isEmpty(label))
},[error])
 



  const handleSubmit = async () => {
    console.log(error);
    console.log(formValid);
    console.log(SubmitCliked);
    console.log(categorie);
    setSubmitCliked(true);
    if (formValid) {
      await CreatNewSousCategorie();
    }
  };

  const handleUpdate = (item ) => {
    console.log(item)
    setcategorie(item.categorie._id);
    setIconUpdate(item.icon);
    setId(item._id);
    setLabel(item.label);
    handleOpenModel();
    setUpdate(true);
  };


// Function  async Crud 

  const CreatNewSousCategorie = async () => {
    await create(icon, label, categorie, iconName)
      .then(() => {
        resetForm();
        getAllSousCategorieFn();
        handleClickSnackbar(
          "Sous Categorie created successfully",
          severityESWI[1]
        );
      })
      .catch((error) => {
        handleClickSnackbar("Failed to create sous categorie", severityESWI[0]);
      });
  };

  const getAllSousCategorieFn = async () => {
    await getAllSousCategorie()
      .then((result) => {
        console.log(result);
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
        getAllSousCategorieFn();
      })
      .catch((error) => {
        handleClickSnackbar("failed delete Sous Categorie", severityESWI[1]);
        console.log(error);
      });
  };

  const updateSousCategorieBuId = async () => {
    console.log(label);
    setUpdateCliked(true);
    if (formUpadteValid) {
      await updateById(id, icon, label, iconName, iconUpadte, categorie)
        .then(async (result) => {
          console.log(result);
          handleCloseModel();
          resetForm();
          await getAllSousCategorieFn();
          handleClickSnackbar(
            "Sous Categorie Update successfully",
            severityESWI[1]
          );
        })
        .catch((error) => {
          handleClickSnackbar(
            "Failed to update Sous Categorie",
            severityESWI[1]
          );
          console.log(error);
        });
    }
  };

  const getAllCategorie = async () => {
    await getAll()
      .then((result) => {
        console.log(result.data);
        setDataCategorie(result.data);
      })
      .catch((error) => {
        setDataCategorie([]);
      });
  };

  return (
    <StateContext.Provider
      value={{
        updateCliked,
        nav,
        updateSousCategorieBuId,
        DeleteSousCategorieById,
        dataRechercheCategorie,
        RechercheCategorie,
        bindRechercheCategorie,
        dataSousCategorie,
        bindcategorie,
        dataCategorie,
        resetForm,
        formValid,
        SubmitCliked,
        error,
        handleSubmit,
        handleUpdate,
        update,
        setUpdate,
        label,
        bindlabel,
        resetlabel,
        setLabel,
        file,
        icon,
        iconName,
        bindIcon,
        resetIcon,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const UseStateContextSousCategorie = () => useContext(StateContext);
