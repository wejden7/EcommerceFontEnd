import { createContext, useContext, useState, useEffect } from "react";
import { getAll as getAllSousSousCategorie } from "../../../service/sousSousCategorie.service";
import { getAll as getAllForniseur } from "../../../service/forniseur.service";
import { getAll as getAllMarque } from "../../../service/marque.service";
import { create ,update as updateProuit} from "../../../service/produit";
import { isEmpty, isNumber, isDouble } from "../../../validateur/validator";
import { UseStateContext } from "../../../contexts/contextProvider";
import { UseStateContextProduit } from "../../../contexts/dashbored/contextProviderProduit";
import useTextInput from "../../../hooks/inputText";
import useImagesInput from "../../../hooks/inputFile";
import useDoubleInput from "../../../hooks/inputDouble";
import useNumberInput from "../../../hooks/inputNumber";

const StateContext = createContext();

export const ContextProviderFormProduit = ({ children }) => {
  const { handleClickSnackbar, severityESWI } = UseStateContext();
  const { findAllProduit, produit, update,reset , incriment,
    count} = UseStateContextProduit();
  const [name, bindName, resetName, setName] = useTextInput("");
  const [prix, bindPrix, resetPrix, setPrix] = useDoubleInput("");
  const [tva, bindTva, resetTva, setTva] = useDoubleInput("");
  const [quantity, bindQuantity, resetQuantity, setQuantity] = useNumberInput({
    initialValue: "",
  });
  const [categorie, bindCategorie, resetCategorie, setCategorie] =
    useTextInput("");
  const [forniseur, bindForniseur, resetForniseur, setForniseur] =
    useTextInput("");
  const [marque, bindMarque, resetMarque, setMarque] = useTextInput("");
  const [formValid, setFormValid] = useState(false);
  const [categories, setCategories] = useState([]);
  const [forniseurs, setForniseurs] = useState([]);
  const [marques, setMarques] = useState([]);
  const [
    titelDescription,
    bindtitelDescription,
    resettitelDescription,
    setTitelDescription,
  ] = useTextInput("");
  const [
    bodyDescription,
    bindbodyDescription,
    resetbodyDescription,
    setBodyDescription,
  ] = useTextInput("");
  const [description, setDescription] = useState([]);
  const [files, images, bindImages, resetImages, setFile, setImages] =
    useImagesInput(true);
  const [showImage, setShowImage] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [submitDescription, setSubmitDescription] = useState(false);
  const [updateDescription, setUpdateDescription] = useState(false);
  const [itemUpdateDescription, setItemUpdateDescription] = useState({});
  const [progresse, setProgresse] = useState(0);
  const [loding, setLoding] = useState(false);

  useEffect(() => {
    initialization();
  }, []);

  useEffect(() => {
    // isEmpty, isNumber, isDouble
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
    setFormValid(TestValidation());
  }, [name, prix, tva, quantity, forniseur, marque, categorie]);

  useEffect(() => {
    resetDescription();
  }, [description]);

  const resetForm = () => {
    setProgresse(0);
    resetDescription();
    resetCategorie();
    resetForniseur();
    resetMarque();
    resetName();
    resetTva();
    resetQuantity();
    resetPrix();
    setDescription([]);
    setSubmit(false);
    resetImages();
  };

  const initialization = async () => {
    await getCategorie();
    await getForniseur();
    await getMarque();
    console.log(produit);
    if (update) {
      setCategorie(produit.categorie._id);
      setForniseur(produit.forniseur._id);
      setMarque(produit.marque._id);
      setName(produit.name);
      setTva(produit.tva.toString());
      setQuantity(produit.quantity.toString());
      setPrix(produit.prix.toString());
    }
  };

  const showImageOuDescription = (i, d) => {
    setShowImage(i);
    setShowDescription(d);
  };

  const deleteImageByIndex = (_) => {
    setImages(images.filter((item, index) => index != _));
    setFile(files.filter((item, index) => index != _));
  };

  const resetDescription = () => {
    resetbodyDescription();
    resettitelDescription();
    setSubmitDescription(false);
    setItemUpdateDescription(false);
    setUpdateDescription(false);
  };

  const AddDescription = () => {
    setSubmitDescription(true);
    const item = {
      title: titelDescription,
      description: bodyDescription,
    };
    if (!isEmpty(titelDescription) && !isEmpty(bodyDescription)) {
      setDescription((d) => [...d, item]);
    }
  };

  const UpdateDescription = () => {
    setSubmitDescription(true);
    const Newitem = {
      title: titelDescription,
      description: bodyDescription,
    };
    if (!isEmpty(titelDescription) && !isEmpty(bodyDescription)) {
      setDescription(
        description.map((item, index) => {
          if (item === itemUpdateDescription) {
            return Newitem;
          }
          return item;
        })
      );
    }
  };

  const updateDescriptionClicked = (item) => {
    setItemUpdateDescription(item);
    setUpdateDescription(true);
    setTitelDescription(item.title);
    setBodyDescription(item.description);
  };

  const deleteDescriptionByIndex = (_) => {
    setDescription(description.filter((item, index) => index != _));
  };

  const getCategorie = async () => {
    await getAllSousSousCategorie()
      .then((result) => {
        setCategories(result.categories);
      })
      .catch((error) => {});
  };

  const getForniseur = async () => {
    await getAllForniseur()
      .then((result) => {
        setForniseurs(result.data.data);
      })
      .catch((error) => {});
  };

  const getMarque = async () => {
    await getAllMarque()
      .then((result) => {
        setMarques(result.data.data);
      })
      .catch((error) => {});
  };
  
  const  onUploadProgress = (progressEvent) => {
    const { loaded, total } = progressEvent;
    let precent = Math.floor((loaded * 100) / total);
    console.log(precent);
    setProgresse(precent);
  }

  const createProduit = async () => {
    setSubmit(true);
    if (formValid) {
      setLoding(true);
      await create(
        name,
        prix,
        quantity,
        tva,
        categorie,
        marque,
        forniseur,
        description,
        images,
       onUploadProgress
      )
        .then((result) => {
          findAllProduit();
          setLoding(false);
          resetForm();
          handleClickSnackbar("created product succse", severityESWI[1]);
        })
        .catch((error) => {
          setLoding(false);
          setProgresse(0);
          console.log(error.response.data.message);
          if (error.response.data.message === "exist") {
            handleClickSnackbar(`${name} is Exist`, severityESWI[2]);
          } else {
            handleClickSnackbar(`Error when save the prouct`, severityESWI[0]);
          }
        });
    }
  };

  const updateProduit = async () => {
    setSubmit(true);
    if(formValid){
      setLoding(true);
      await updateProuit(produit._id,name,prix,tva,quantity,categorie,forniseur,marque,onUploadProgress)
      .then((result)=>{
        setLoding(false);
        resetForm();
        findAllProduit()
        reset()
        handleClickSnackbar("update product succse", severityESWI[1]);

      }).catch((error)=>{
        setLoding(false);
        setProgresse(0);
        console.log(error.response.data.message);
        if (error.response.data.message === "exist") {
          handleClickSnackbar(`${name} is Exist`, severityESWI[2]);
        } else {
          handleClickSnackbar(`Error when save the prouct`, severityESWI[0]);
        }
      })
    }
   

  }

  return (
    <StateContext.Provider
      value={{
        incriment,
        count,
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
        titelDescription,
        bindtitelDescription,
        bodyDescription,
        bindbodyDescription,
        AddDescription,
        deleteDescriptionByIndex,
        updateDescriptionClicked,
        showImageOuDescription,
        UpdateDescription,
        updateDescription,
        showImage,
        showDescription,
        description,
        submitDescription,
        bindImages,
        files,
        resetImages,
        deleteImageByIndex,
        createProduit,
        updateProduit,
        progresse,
        loding,
        update,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
export const UseStateContextFormProduit = () => useContext(StateContext);
