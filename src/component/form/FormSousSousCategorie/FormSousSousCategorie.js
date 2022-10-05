import { useState, useEffect } from "react";
import { UseStateContext } from "../../../contexts/contextProvider";
import { UseStateContextSousSousCategorie } from "../../../contexts/dashbored/contextProviderSousSousCategorie";
import useIconInput from "../../../hooks/inputFile";
import useInput from "../../../hooks/inputText";
import { isEmpty, isEmptyFile } from "../../../validateur/validator";
import { create, updateById } from "../../../service/sousSousCategorie.service";

export default function useFormSousSousCategorie() {
  const [label, bindlabel, resetlabel, setLabel] = useInput("");
  const [categorie, bindCategorie, resetCategorie, setCategorie] = useInput("");
  const [file, icon, bindIcon, resetIcon] = useIconInput();
  const [formValide, setFormValide] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [loding, setLoding] = useState(false);
  const [lodingValue, setLodingValue] = useState(0);
  const { handleClickSnackbar, severityESWI, handleCloseModel } =
    UseStateContext();
  const { getAllSousSousCategorie, update, item, sousCategories } =
  UseStateContextSousSousCategorie();

  useEffect(() => {
    resetForm();
    initialization();
  }, []);

  useEffect(() => {
    setFormValide(
      !(isEmpty(label) || isEmpty(categorie) || isEmptyFile(icon[0]))
    );
  }, [label, icon[0]]);

  const resetForm = () => {
    resetlabel();
    resetIcon();
    resetCategorie();
    setSubmit(false);
  };

  const initialization = () => {
    console.log(item)
    if (update) {
      setLabel(item.label);
      setCategorie(item.souscategorie._id);
    }
  };

  const progressFunction = (progressEvent) => {
    const { loaded, total } = progressEvent;
    let precent = Math.floor((loaded * 100) / total);
    console.log(precent);
    setLodingValue(precent);
  };

  const saveFunction = async () => {
    setSubmit(true);
    console.log(formValide);
    if (formValide) {
      setLoding(true);
      await create(label, icon, categorie, progressFunction)
        .then(async (res) => {
          handleClickSnackbar("sucssec wejden", severityESWI[1]);
          resetForm();
          await getAllSousSousCategorie();
          setLoding(false);
        })
        .catch((err) => {
          handleClickSnackbar(err.message, severityESWI[0]);
          console.log(err);
        });
    }
  };

  const updateFunction = () => {
    setSubmit(true);
    if (!isEmpty(label)) {
      setLoding(true);
      updateById(label, icon, categorie, item._id, item.icon, progressFunction)
        .then(async (res) => {
          handleCloseModel();
          resetForm();
          setLoding(false);
          await getAllSousSousCategorie();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return [
    label,
    bindlabel,
    bindIcon,
    bindCategorie,
    categorie,
    file,
    submit,
    saveFunction,
    updateFunction,
    resetIcon,
    update,
    loding,
    lodingValue,
    sousCategories,
  ];
}
