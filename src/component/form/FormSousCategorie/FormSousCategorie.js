import { useState, useEffect } from "react";
import { UseStateContext } from "../../../contexts/contextProvider";
import { UseStateContextSousCategorie } from "../../../contexts/dashbored/contextProviderSousCategorie";
import useIconInput from "../../../hooks/inputFile";
import useInput from "../../../hooks/inputText";
import { isEmpty, isEmptyFile } from "../../../validateur/validator";
import { create, updateById } from "../../../service/sousCategorie.service";

export default function useFormSousCategorie() {
  const [label, bindlabel, resetlabel, setLabel] = useInput("");
  const [categorie, bindCategorie, resetCategorie, setCategorie] = useInput("");
  const [file, icon, bindIcon, resetIcon] = useIconInput();
  const [formValide, setFormValide] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [loding, setLoding] = useState(false);
  const [lodingValue, setLodingValue] = useState(0);
  const { handleClickSnackbar, severityESWI, handleCloseModel } =
    UseStateContext();
  const { getAllSousCategorie, update, item, categories } =
    UseStateContextSousCategorie();

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
    if (update) {
      setLabel(item.label);
      setCategorie(item.categorie._id);
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
          await getAllSousCategorie();
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
          await getAllSousCategorie();
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
    categories,
  ];
}
