import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getAll as getAllProduit,
  deleteById,
} from "../../service/produit";

const StateContext = createContext();
const NavSechma = [
  {
    label: "Dashbored",
    link: "dashbored",
  },
  {
    label: "produit",
    link: "dashbored/produit",
  },
];

export const ContextProviderProduit = ({ children }) => {
  const [openNewForm, setOpenNewForm] = useState(false);
  const [openProduit, setOpenProdui] = useState(false);
  const [nav, setNav] = useState(NavSechma);
  const [update, setUpdate] = useState(false);
  const [produit, setProduit] = useState({});
  const [produits, setProduits] = useState([]);
  const [count,setCount] = useState(0);

  const incriment = () => {
    setCount(count+1);

  }

 
  useEffect(()=>{
    findAllProduit()
  },[])
  const reset = () => {
    setUpdate(false);
    setProduit({});
    setOpenProdui(false);
    setOpenNewForm(false);
  };

  const openCloseForm = () => {
    setOpenNewForm(!openNewForm);
  };
  const openDetailProduit = (_)=>{
   // setOpenProdui(true);
   // setProduit(_)

  }
  const updateProduct = (_)=>{
    setOpenNewForm(!openNewForm);
     setUpdate(true);
     setProduit(_)
 
   }

  const findAllProduit = async () => {
    await getAllProduit()
      .then((result) => {
        console.log(result);
        setProduits(result.data.result);
      })
      .catch((error) => {
        setProduits([]);
      });
  };

  const deleteProduitById = async (id) => {
    await deleteById(id)
      .then((result) => {
        console.log(result);
        findAllProduit();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <StateContext.Provider
      value={{
        produits,
        produit,
        update,
        nav,
        openNewForm,
        openCloseForm,
        openProduit,
        deleteProduitById,
        findAllProduit,
        openDetailProduit,
        updateProduct,
        reset,
        incriment,
        count
    
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const UseStateContextProduit = () => useContext(StateContext);

/*

    Décrire une personne, c'est parler de son physique et de son caractère. 
    Parler du physique d'une personne, c'est indiquer ses traits physiques.
    Parler du caractère d'une personne, c'est indiquer sa manière d'être. 
    Pour tout cela, il y a plusieurs adjectifs qui ont une forme masculine et une forme féminine.

*/
