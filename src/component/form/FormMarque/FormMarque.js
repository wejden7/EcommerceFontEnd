import { useState, useEffect, createContext, useContext } from "react";
import useTextInput from "../../../hooks/inputText";
import useLogoInput from "../../../hooks/inputFile";
import { isEmpty, isEmptyFile } from "../../../validateur/validator";
import { create, updateById } from "../../../service/marque.service";
import { UseStateContext } from "../../../contexts/contextProvider";
import { UseStateContextMarque } from "../../../contexts/dashbored/contextProviderMarque";
const StateContext = createContext();
export const ContextProviderFormMarque = ({ children }) => {
  const { handleClickSnackbar, severityESWI } = UseStateContext();

  const [label, bindLabel, resetLabel, setLabel] = useTextInput("");
  const [file, logo, bindLogo, resetLogo] = useLogoInput();
  const [submit, setSubmit] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [formValidUpdate, setFormValidUpdate] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loding, setLoding] = useState(false);
  const { update, item, getAllMarque,reset } = UseStateContextMarque();


  useEffect(() => {
    setFormValid(!(isEmpty(label) || isEmptyFile(logo[0])));
  }, [label, logo[0]]);
   
  useEffect(() => {
    setFormValidUpdate(!(isEmpty(label) ));
  }, [label]);
   
  useEffect(()=>{
    const initialization = ()=>{
      if(update && item){
        setLabel(item.label)
      }
    }
    initialization();

  },[update])

  const resetForm = () => {
    resetLabel();
    resetLogo();
    setSubmit(false);
    setFormValid(false);
    setProgress(0);
    setLoding(false);
    reset();
  };
  const createMarque = async () => {
    setSubmit(true);
    if (formValid) {
    setLoding(true);
    await create(label, logo, function (progressEvent) {
      const { loaded, total } = progressEvent;
      let precent = Math.floor((loaded * 100) / total);
      setProgress(precent);
    })
      .then((result) => {
        resetForm();
        getAllMarque();
        handleClickSnackbar("The marque has been created", severityESWI[1]);
      })
      .catch((error) => {
        handleClickSnackbar("here was an error", severityESWI[0]);

        console.log(error);
      });}
  };
  const updateMarque = async () => {
    setSubmit(true);
    if (formValidUpdate) {
      await updateById(item._id, label, logo, item.logo)
        .then((result) => {
          getAllMarque();
          resetForm();
          handleClickSnackbar("The marque has been update", severityESWI[1]);
        })
        .catch((error) => {
          handleClickSnackbar("here was an error", severityESWI[0]);

          console.log(error);
        });
    }
  };

  return (
    <StateContext.Provider value={{update, item,loding,progress,submit,file,bindLogo,label,bindLabel,formValid,formValidUpdate,resetForm,createMarque,updateMarque}}>
      {children}
    </StateContext.Provider>
  );
};

export const UseStateContextFormMarque = () => useContext(StateContext);