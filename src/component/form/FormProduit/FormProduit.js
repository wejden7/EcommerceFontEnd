import { useState, useEffect } from "react";
import { getAll as getAllSousSousCategorie } from "../../../service/sousSousCategorie.service";
import { getAll as getAllForniseur } from "../../../service/forniseur.service";
import { getAll as getAllMarque } from "../../../service/marque.service";
import { isEmpty, isNumber, isDouble,isEmptyFile } from "../../../validateur/validator";
import { UseStateContext } from "../../../contexts/contextProvider";
import useTextInput from "../../../hooks/inputText";
import useDoubleInput from "../../../hooks/inputDouble";
import useNumberInput from "../../../hooks/inputNumber";
import useFilesInput from "../../../hooks/inputFile";
import { creatProduit,updateProduit } from "../../../page/dashbored/pages/produit/produitSlice";
import { useDispatch } from "react-redux";
import FormProduit from "./FormProduit.jsx";

const FormProduitFunction = ({update,item}) => {
  const dispatch = useDispatch();
  const { handleClickSnackbar, severityESWI } = UseStateContext();
  const [name, bindName, resetName, setName] = useTextInput("");
  const [file, image, bindFile, reset] = useFilesInput("");
  const [prix, bindPrix, resetPrix, setPrix] = useDoubleInput("");
  const [tva, bindTva, resetTva, setTva] = useDoubleInput("");
  const [quantity, bindQuantity, resetQuantity, setQuantity] = useNumberInput({
    initialValue: "",
  });
  const [categorie, bindCategorie, resetCategorie, setCategorie] =
    useTextInput("null");
  const [forniseur, bindForniseur, resetForniseur, setForniseur] =
    useTextInput("null");
  const [marque, bindMarque, resetMarque, setMarque] = useTextInput("null");
  const [formValid, setFormValid] = useState(false);
  const [categories, setCategories] = useState([]);
  const [forniseurs, setForniseurs] = useState([]);
  const [marques, setMarques] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState("");
  const [loding, setLoding] = useState(false);
  useEffect(() => {
    initialization();
  }, []);

  useEffect(() => {
    
    const TestValidation = () => {
      if (
        isEmpty(name) ||
        isEmpty(prix) ||
        isEmpty(tva) ||
        isEmpty(quantity) ||
        isEmpty(forniseur) ||
        isEmpty(marque) ||
        isEmpty(categorie) 
      ) {
        return false;
      } else if (isNumber(quantity) && isDouble(prix) && isDouble(tva)) {
        return true;
      } else {
        return false;
      }
    };
    if(update)
    setFormValid(TestValidation());
    if(!update)
    setFormValid(TestValidation()&& !isEmptyFile(file));
  }, [name, prix, tva, quantity, forniseur, marque, categorie, file[0]]);

  const resetForm = () => {
    reset();
    resetCategorie();
    resetForniseur();
    resetMarque();
    resetName();
    resetTva();
    resetQuantity();
    resetPrix();
    setSubmit(false);
  };

  const initialization = async () => {
   
    let categories = await getAllSousSousCategorie();
    setCategories(categories);

    let forniseurs = await getAllForniseur();
    setForniseurs(forniseurs);

    let marques = await getAllMarque();
    setMarques(marques);
    if(update){
      setName(item.name)
      setTva(item.tva.toString())
      setPrix(item.prix.toString())
      setQuantity(item.quantity.toString())
      setCategorie(item.categorie._id)
      setForniseur(item.forniseur._id)
      setMarque(item.marque._id)
    }
  };

  const createProduitFunction = async () => {
    const initialProduit = {
      name: name,
      tva: tva,
      prix: prix,
      quantity: quantity,
      categorie: categorie,
      marque: marque,
      forniseur: forniseur,
      image: image[0],
    };
    setSubmit(true);
    //console.log(submit)
    if (formValid) {
      setLoding(true);
      try {
        await dispatch(creatProduit(initialProduit)).unwrap();
        resetForm();
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoding(false);
      }
    }
  };
  const updateProduitFunction = async () => {
    const initialProduit = {
      id:item._id,
      name: name,
      tva: tva,
      prix: prix,
      quantity: quantity,
      categorie: categorie,
      marque: marque,
      forniseur: forniseur,
    };
    setSubmit(true);
    //console.log(submit)
    if (formValid) {
      setLoding(true);
      try {
        await dispatch(updateProduit(initialProduit)).unwrap();
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoding(false);
      }
    }
  }

  let params = {
    submit,
    bindName,
    name,
    bindTva,
    tva,
    bindPrix,
    prix,
    bindQuantity,
    quantity,
    categorie,
    bindCategorie,
    forniseur,
    bindForniseur,
    marque,
    bindMarque,
    categories,
    forniseurs,
    marques,
    file,
    bindFile,
    reset,
    error,
    createProduitFunction,
    updateProduitFunction,
    update,
  };

  return <FormProduit params={params} />;
};

export default FormProduitFunction;
