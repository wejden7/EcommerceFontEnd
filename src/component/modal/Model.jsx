import  React, { useState } from "react";
import  Box from "@mui/material/Box";
import  { OpenButton, CloseButton } from "../../component";
import  { AiOutlinePlus } from "react-icons/ai";
import  Modal from "@mui/material/Modal";
import  { UseStateContext } from '../../contexts/contextProvider'
import  { UseStateContextCategorie } from '../../page/dashbored/categorie/contextCategorie'
import  { UseStateContextSousCategorie } from '../../page/dashbored/sousCategorie/contextSousCategorie'
import  { UseStateContextSousSousCategorie } from '../../page/dashbored/sousSousCategorie/contextSousSousCategorie'
import  { UseStateContextProduit } from '../../page/dashbored/produit/produit'
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
};
const ModelComponent = ({ children }) => {
const {handleCloseModel,handleOpenModel,openModel}=UseStateContext();
const {resetForm}=UseStateContextCategorie()||UseStateContextSousCategorie()||UseStateContextSousSousCategorie()||UseStateContextProduit()

  return (
    <div>
      <OpenButton
        customFunc={() => {
          resetForm()
          handleOpenModel()}}
        icon={<AiOutlinePlus />}
        title="New Categorie"
        dotColor={"white"}
      />
      <Modal
        open={openModel}
        onClose={handleCloseModel}
      >
        <Box className=" rounded" sx={style}>{children}</Box>
      </Modal>
    </div>
  );
};

export default ModelComponent;
