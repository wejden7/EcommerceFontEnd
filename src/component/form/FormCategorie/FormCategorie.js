import { useState, useEffect } from "react";
import { UseStateContext } from "../../../contexts/contextProvider";
import { UseStateContextCategorie } from "../../../contexts/dashbored/contextProviderCategorie";
import useIconInput from "../../../hooks/inputFile";
import useInput from "../../../hooks/inputText";
import { isEmpty, isEmptyFile } from "../../../validateur/validator";
import { create, updateById } from "../../../service/categorie";

export default function useFormCategorie() {
  const [label, bindlabel, resetlabel, setLabel] = useInput("");
  const [file, icon, bindIcon, resetIcon] = useIconInput();
  const [formValide, setFormValide] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [loding, setLoding] = useState(false);
  const [lodingValue, setLodingValue] = useState(0);
  const { handleClickSnackbar, severityESWI, handleCloseModel } =
    UseStateContext();
  const { getAllCategorie, update, item } =
    UseStateContextCategorie();

  useEffect(() => {
    resetForm();
    if (update) setLabel(item.label);
  }, []);

  useEffect(() => {
    setFormValide(!(isEmpty(label) || isEmptyFile(icon[0])));
  }, [label, icon[0]]);

  const resetForm = () => {
    resetlabel();
    resetIcon();
    setSubmit(false);
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
      await create(label, icon, progressFunction)
        .then(async (res) => {
          handleClickSnackbar("sucssec wejden", severityESWI[1]);
          resetForm();
          await getAllCategorie();
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
      updateById(label, icon, item._id, item.icon, progressFunction)
        .then(async (res) => {
          handleCloseModel();
          resetForm();
          setLoding(false);
          await getAllCategorie();
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
    file,
    submit,
    saveFunction,
    updateFunction,
    resetIcon,
    update,
    loding,
    lodingValue,
  ];
}
