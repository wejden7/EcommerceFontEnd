import React, { createContext, useContext, useState, useEffect } from "react";
import useIconInput from "../../hooks/inputFile";
import useCategorieInput from "../../hooks/inputText";
import { UseStateContext } from "../contextProvider";
import{isEmpty,isEmptyFile}from "../../validateur/validator"
import {
  create,
  getAll,
  deleteById,
  updateById,
} from "../../service/categorie";

const StateContext = createContext();
const Error = {
  label:"is required",
  icon:"is required"

}
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
  const {
    handleClickSnackbar,
    severityESWI,
    handleOpenModel,
    handleCloseModel,
  } = UseStateContext();
  const [data, setData] = useState([]);
  const [label, bindlabel, resetlabel, setLabel] = useCategorieInput("");
  const [file, icon, bindIcon, resetIcon] = useIconInput();
  const [formValid, setFormValid] = useState(false);
  const [formUpadetValid,setFormUpadteValid] =useState(false);
  const [submit, setSubmit] = useState(false);
  const [updateCliked,setupdateCliked]=useState(false)
  const [error, setError] = useState(Error);
  const [update, setUpadte] = useState(false);
  const [id, setId] = useState("");
  const [iconUpadte, setIconUpdate] = useState("");

  const resetForm = () => {
    resetlabel();
    setUpadte(false);
    resetIcon();
    setSubmit(false);
    setupdateCliked(false)
    setFormValid(false);
    setFormUpadteValid(false);
    setIconUpdate("");
    setId("");
  };

  useEffect(() => {
    getAllCategorie();
  }, []);

  useEffect(() => {
    setError((l)=>({...l,label:isEmpty(label)?"Label is required":""}))
  }, [label]);

  useEffect(() => {
    setError((l)=>({...l,icon:isEmptyFile(icon)?"icon is required":""}))
  }, [icon]);

  useEffect(()=>{
    setFormValid(!(isEmpty(label)||isEmptyFile(icon)))
    setFormUpadteValid(!isEmpty(label))
},[error])

 

  const handleSubmit = () => {
    setSubmit(true);
    if (formValid) {
      createNewCategorie();
    }
  };

  const handleUpdate = () => {
    console.log(label);
    setupdateCliked(true);
    if (formUpadetValid) {
      updateCategorie();
    }
  };

  const handleClickUpadet = (item) => {
    resetForm()
    console.log("update : " + item._id);
    setIconUpdate(item.icon);
    setId(item._id);
    setLabel(item.label);
    handleOpenModel();
    setUpadte(true);
  };

  // Function async of service   CRUD

  const createNewCategorie = async () => {
    await create(label, icon)
      .then(async (res) => {
        handleClickSnackbar("sucssec wejden", severityESWI[1]);
        resetForm();
        await getAllCategorie();
      })
      .catch((err) => {
        handleClickSnackbar(err.message, severityESWI[0]);
        console.log(err);
      });
  };

  const deleteCategoriById = async (id) => {
    await deleteById(id)
      .then(async () => {
        handleClickSnackbar("Delete Categorie", severityESWI[1]);
        await getAllCategorie();
      })
      .catch(() => {});
  };

  const updateCategorie = async () => {

      updateById(label, icon, id, iconUpadte)
      .then(async (res) => {
        handleCloseModel();
        resetForm();
        await getAllCategorie();
      })
      .catch((err) => {
        console.log(err);
      });
    
   
  };

  const getAllCategorie = async () => {
    await getAll()
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        setData([]);
        console.log(error);
      });
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider
      value={{
        updateCliked,
        nav,
        update,
        handleUpdate,
        handleClickUpadet,
        deleteCategoriById,
        resetForm,
        data,
        label,
        bindlabel,
        resetlabel,
        file,
        resetIcon,
        icon,
        bindIcon,
        formValid,
        error,
        submit,
        handleSubmit,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const UseStateContextCategorie = () => useContext(StateContext);
