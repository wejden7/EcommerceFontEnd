import React, { createContext, useContext, useEffect, useState } from "react";
import useTextInput from "../../hooks/inputText";
import useLogoInput from "../../hooks/inputFile";
import { UseStateContext } from "../contextProvider";
import {
  create,
  getAll,
  deleteById,
  updateById,
} from "../../service/marque.service";
import { isEmpty, isEmptyFile } from "../../validateur/validator";
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
  const [label, bindLabel, resetLabel, setLabel] = useTextInput("");
  const [file, logo, bindLogo, resetLogo] = useLogoInput();
  const [submit, setSubmit] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [marques, setMarques] = useState([]);
  const [filterMarque, setFilterMarque] = useState([]);
  const [search, bindSearch, resetSearch, setSearch] = useTextInput("");
  const [item, setItem] = useState();
  const [update, setUpdate] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loding, setLoding] = useState(false);

  const reset = () => {
    resetLabel();
    resetLogo();
    setSubmit(false);
    setFormValid(false);
    setItem({});
    setUpdate(false);
    setProgress(0);
    setLoding(false);
  };
  useEffect(() => {
    getAllMarque();
  }, []);

  useEffect(() => {
    var tab = marques.filter((item) =>
      item.label.toUpperCase().includes(search.toUpperCase())
    );

    setFilterMarque((art) => tab);
  }, [marques, search]);
  useEffect(() => {
    setFormValid(!(isEmpty(label) || isEmptyFile(logo[0])));
  }, [label, logo[0]]);

  useEffect(()=>{
    if(label.length===0&& update)
    reset();
  },[label])

  const handelSave = () => {
    setSubmit(true);
    if (formValid) {
      createMarque();
    }
  };

  const handelUpdate = (_) => {
    setUpdate(true);
    setItem(_);
    setLabel(_.label);
  };

  const createMarque = async () => {
    setLoding(true);
    await create(label, logo, function (progressEvent) {
      const { loaded, total } = progressEvent;
      let precent = Math.floor((loaded * 100) / total);
      setProgress(precent);
    })
      .then((result) => {
          reset();
          getAllMarque();
          handleClickSnackbar("The marque has been created", severityESWI[1]);
         
      })
      .catch((error) => {
        handleClickSnackbar("here was an error", severityESWI[0]);

        console.log(error);
      });
  };

  const getAllMarque = async () => {
    await getAll()
      .then((result) => {
        setMarques(result.data.data);
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

  const updateMarque = async () => {
    setSubmit(true);
    if (!isEmpty(label)) {
      await updateById(item._id, label, logo, item.logo)
        .then((result) => {
          getAllMarque();
          reset();
          handleClickSnackbar("The marque has been update", severityESWI[1]);
        })
        .catch((error) => {
          handleClickSnackbar("here was an error", severityESWI[0]);

          console.log(error);
        });
    }
  };

  return (
    <StateContext.Provider
      value={{
        loding,
        formValid,
        progress,
        reset,
        bindSearch,
        nav,
        bindLabel,
        bindLogo,
        file,
        submit,
        handelSave,
        filterMarque,
        deleteMarque,
        handelUpdate,
        update,
        updateMarque,
        label,
        logo,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const UseStateContextMarque = () => useContext(StateContext);
