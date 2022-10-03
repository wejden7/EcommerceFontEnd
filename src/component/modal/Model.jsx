import  React, { useState } from "react";
import  Box from "@mui/material/Box";
import  { OpenButton, CloseButton } from "../../component";
import  { AiOutlinePlus } from "react-icons/ai";
import  Modal from "@mui/material/Modal";
import  { UseStateContext } from '../../contexts/contextProvider'
import  { UseStateContextCategorie } from '../../contexts/dashbored/contextProviderCategorie'
import  { UseStateContextSousCategorie } from '../../contexts/dashbored/contextProviderSousCategorie'
import  { UseStateContextSousSousCategorie } from '../../contexts/dashbored/contextProviderSousSousCategorie'
import  { UseStateContextProduit } from '../../contexts/dashbored/contextProviderProduit'
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
        onClick={() => {
          resetForm()
          handleOpenModel()}}
        icon={<AiOutlinePlus />}
        title="New Categorie"
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
