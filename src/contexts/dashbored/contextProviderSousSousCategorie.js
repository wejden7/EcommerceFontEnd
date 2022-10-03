import React, { createContext, useContext, useState, useEffect } from "react";
import useTextInput from "../../hooks/inputText";
import useIconInput from "../../hooks/inputFile";
import { UseStateContext } from "../contextProvider";
import { getAll } from "../../service/categorie";
import { getAll as getAllSousCategorie } from "../../service/sousCategorie.service";
import{isEmpty,isEmptyFile}from "../../validateur/validator"
import {
  create,
  getAll as getAllSousSousCategorie,
  deleteById,
  updateById,
} from "../../service/sousSousCategorie.service";
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
    label: "SousCategorie",
    link: "dashbored/sousCategorie",
  },
  {
    label: "Sous SousCategorie",
    link: "dashbored/sousSousCategorie",
  },
];

export const ContextProviderSousSousCategorie = ({ children }) => {
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
  const [serchText, bindSerchText, resetSerchText, setSerchText] =
    useTextInput("");
  const [label, bindlabel, resetlabel, setLabel] = useTextInput("");
  const [
    Souscategorie,
    bindSouscategorie,
    reseSouscategorie,
    setSouscategorie,
  ] = useTextInput("");
  const [
    RechercheCategorie,
    bindRechercheCategorie,
    resetRechercheCategorie,
    setRechercheCategorie,
  ] = useTextInput("All");
  const [
    RechercheSousCategorie,
    bindRechercheSousCategorie,
    resetRechercheSousCategorie,
    setRechercheSousCategorie,
  ] = useTextInput("All");
  const [file, icon, bindIcon, resetIcon] = useIconInput();
  const [error, setError] = useState(Error);
  const [formValid, setFormValid] = useState(false);
  const [SubmitCliked, setSubmitCliked] = useState(false);
  const [updateCliked, setUpdateCliked] = useState(false);
  const [formUpadteValid, setFormUpadteValid] = useState(false);
  const [dataCategorie, setDataCategorie] = useState([]);
  const [dataSousCategorie, setDataSousCategorie] = useState([]);
  const [dataSousSousCategorie, setDataSousSousCategorie] = useState([]);
  const [dataRechercheSousCategorie, setDataRechercheSousCategorie] = useState(
    []
  );
  const [dataRechercheCategorie, setDataRechercheCategorie] = useState([]);
  const [dataRechercheTextCategorie, setDataRecherTextcheCategorie] = useState(
    []
  );

  const resetForm = () => {
    resetlabel();
    resetIcon();
    reseSouscategorie();
    setSubmitCliked(false);
    setUpdateCliked(false)
    setIconUpdate("");
    setUpdate(false);
    setId("");
    setUpdate("");
  };
  const getAllCategorie = async () => {
    await getAll()
      .then((result) => {
        console.log(result.data);
        setDataCategorie(result.data);
      })
      .catch((error) => {});
  };
  const getAllSousCategorieFn = async () => {
    await getAllSousCategorie()
      .then((result) => {
        console.log(result);
        setDataSousCategorie(result.categories);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    setRechercheSousCategorie("All");
  }, [RechercheCategorie]);
  useEffect(() => {
    functionRecherche();
    console.log(dataRechercheSousCategorie);
  }, [
    RechercheSousCategorie,
    dataSousSousCategorie,
    RechercheCategorie,
    dataSousCategorie,
  ]);

  const functionRecherche = () => {
    setDataRechercheCategorie((art) => []);
    if (RechercheCategorie === "All") {
      setDataRechercheCategorie((art) => dataSousCategorie);
      setDataRechercheSousCategorie((art) => []);

      if (RechercheSousCategorie === "All") {
        console.log("All");
        setDataRechercheSousCategorie((art) => dataSousSousCategorie);
      } else {
        var tab = dataSousSousCategorie.filter(
          (item) => RechercheSousCategorie === item.souscategorie._id
        );
        setDataRechercheSousCategorie((l) => tab);
      }
    } else {
      setDataRechercheSousCategorie((art) => []);
      var tab1 = dataSousCategorie.filter(
        (item) => RechercheCategorie === item.categorie._id
      );
      setDataRechercheCategorie((l) => tab1);

      if (RechercheSousCategorie === "All") {
        console.log(tab1);

        var tab3 = dataSousSousCategorie.filter(
          (item2) =>
            tab1.filter((item1) => item1._id === item2.souscategorie._id)
              .length > 0
        );
        console.log(tab3);
        setDataRechercheSousCategorie((art) => tab3);
      } else {
        var tab2 = dataSousSousCategorie.filter(
          (item2) => RechercheSousCategorie === item2.souscategorie._id
        );
        setDataRechercheSousCategorie((l) => tab2);
      }
    }
  };

  useEffect(() => {
    RechercheText();
  }, [serchText, dataRechercheSousCategorie]);

  const RechercheText = () => {
    setDataRecherTextcheCategorie((art) => []);

    if (serchText.length === 0) {
      setDataRecherTextcheCategorie((art) => dataRechercheSousCategorie);
    } else {
      var tble = dataRechercheSousCategorie.filter((item) =>
        item.label.toUpperCase().includes(serchText.toUpperCase())
      );
      setDataRecherTextcheCategorie((art) => tble);
    }
  };

  useEffect(() => {
    getAllCategorie();
    getAllSousCategorieFn();
    getAllSousSousCategorieFn();
  }, []);

  useEffect(() => {
    setError((l)=>({...l,label:isEmpty(label)?"Label is required":""}))
  }, [label]);

  useEffect(() => {
    setError((l)=>({...l,icon:isEmptyFile(icon)?"icon is required":""}))
  }, [icon]);

  useEffect(() => {
    setError((l)=>({...l,select:isEmpty(Souscategorie)?"categorie is required":""}))
  }, [Souscategorie]);

  useEffect(()=>{
    setFormValid(!(isEmpty(label)||isEmptyFile(icon)||isEmpty(Souscategorie)))
    setFormUpadteValid(!isEmpty(label))
},[error])
 


  const handleSubmit = async () => {
    console.log(error);
    console.log(formValid);
    console.log(SubmitCliked);
    console.log(Souscategorie);
    setSubmitCliked(true);
    if (formValid) {
      await CreatNewSousSousCategorie();
    }
  };

  const handleUpdate = (item) => {
    setSouscategorie(item.souscategorie._id);
    setIconUpdate(item.icon);
    setId(item._id);
    setLabel(item.label);
    handleOpenModel();
    setUpdate(true);
  };

  const CreatNewSousSousCategorie = async () => {
    await create(icon, label, Souscategorie)
      .then(() => {
        resetForm();
        getAllSousSousCategorieFn();
        handleClickSnackbar(
          "Sous SousCategorie created successfully",
          severityESWI[1]
        );
      })
      .catch((error) => {
        console.log(error);
        handleClickSnackbar(
          "Failed to create sous Souscategorie",
          severityESWI[0]
        );
      });
  };

  const getAllSousSousCategorieFn = async () => {
    await getAllSousSousCategorie()
      .then((result) => {
        console.log(result);
        setDataSousSousCategorie(result.categories);
      })
      .catch((error) => {
        setDataSousSousCategorie([]);

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
        getAllSousSousCategorieFn();
      })
      .catch((error) => {
        handleClickSnackbar(
          "failed delete Sous SousCategorie",
          severityESWI[1]
        );
        console.log(error);
      });
  };

  const updateSousSousCategorieBuId = async () => {
    setUpdateCliked(true);
    if (formUpadteValid) {
      await updateById(id, icon, label, iconUpadte, Souscategorie)
        .then(async (result) => {
          console.log(result);
          handleCloseModel();
          resetForm();
          await getAllSousSousCategorieFn();
          handleClickSnackbar(
            "Sous SousCategorie Update successfully",
            severityESWI[1]
          );
        })
        .catch((error) => {
          handleClickSnackbar(
            "Failed to update Sous SousCategorie",
            severityESWI[1]
          );
          console.log(error);
        });
    }
  };

  return (
    <StateContext.Provider
      value={{
        dataRechercheTextCategorie,
        serchText,
        bindSerchText,
        dataRechercheCategorie,
        bindRechercheCategorie,
        dataCategorie,
        nav,
        updateSousSousCategorieBuId,
        DeleteSousSousCategorieById,
        dataRechercheSousCategorie,
        RechercheSousCategorie,
        bindRechercheSousCategorie,
        dataSousSousCategorie,
        bindSouscategorie,
        dataSousCategorie,
        resetForm,
        formValid,
        SubmitCliked,
        updateCliked,
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
        bindIcon,
        resetIcon,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const UseStateContextSousSousCategorie = () => useContext(StateContext);
