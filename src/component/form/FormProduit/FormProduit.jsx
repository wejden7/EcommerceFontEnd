import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion } from "framer-motion";
import {
  InputText,
  InputFileMini,
  InputSelect,
  InputTextArea,
  Linear
} from "../../../component";
import { BsImages } from "react-icons/bs";
import { MdOutlineDescription } from "react-icons/md";
import { AiOutlineUpload, AiOutlineDelete, AiFillEdit } from "react-icons/ai";
import { UseStateContextFormProduit } from "./FormProduit";
const squareVariants = {
  visible: { opacity: 1, transition: { duration: 1 } },
  hidden: { opacity: 0, transition: { duration: 1 } },
};

const ButtonShowImageOuDescription = () => {
  const { showImageOuDescription, showImage, showDescription,update } =
    UseStateContextFormProduit();
  return (!update&&
    <div className="col-span-3 grid grid-cols-6 gap-4  mb-4 ">
      <div
        onClick={() => {
          showImageOuDescription(!showImage, false);
        }}
        className={
          showImage
            ? "group  h-40 bg-white grid col-start-3 place-items-center rounded shadow-md hover:cursor-pointer border border-2 border-blue-600 "
            : "group  h-40 bg-white grid col-start-3 place-items-center rounded shadow-md hover:cursor-pointer border border-2 border-white "
        }
      >
        <BsImages className="w-10 h-10 group-hover:scale-125  transition duration-300 ease-in-out" />
      </div>
      <div
        onClick={() => showImageOuDescription(false, !showDescription)}
        className={
          showDescription
            ? "group  h-40  bg-white grid place-items-center rounded shadow-md hover:cursor-pointer border border-2 border-blue-600"
            : "group  h-40  bg-white grid place-items-center rounded shadow-md hover:cursor-pointer border border-2 border-white"
        }
      >
        <MdOutlineDescription className="w-10 h-10 group-hover:scale-125 transition duration-300 ease-in-out" />
      </div>
    </div>
  );
};

const DetailOfDescription = () => {
  const { description, deleteDescriptionByIndex, updateDescriptionClicked } =
    UseStateContextFormProduit();
  return description.map((item, index) => {
    return (
      <Accordion key={index} className="mt-4">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <div className="flex place-items-center gap-4">
            <Typography className="w-32 truncate">{item.title}</Typography>
            <AiFillEdit
              onClick={() => updateDescriptionClicked(item)}
              className="text-green-600 w-7 h-7 rounded-full p-1 hover:scale-125 hover:shadow-md"
            />
            <AiOutlineDelete
              onClick={() => {
                deleteDescriptionByIndex(index);
              }}
              className="z-[10000] text-red-500 w-7 h-7 rounded-full p-1  hover:scale-125 hover:shadow-md"
            />
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{item.description}</Typography>
        </AccordionDetails>
      </Accordion>
    );
  });
};

const FormAddDecription = () => {
  const {
    showDescription,
    titelDescription,
    bindtitelDescription,
    bodyDescription,
    bindbodyDescription,
    AddDescription,
    submitDescription,
    updateDescription,
    UpdateDescription,
  } = UseStateContextFormProduit();
  return (
    showDescription && (
      <motion.div
        animate={showDescription ? "visible" : "hidden"}
        initial={!showDescription ? "visible" : "hidden"}
        variants={squareVariants}
        className="col-span-3 grid "
      >
        <InputText
          bind={bindtitelDescription}
          value={titelDescription}
          submit={submitDescription}
          placeholder="Titel"
        />
        <InputTextArea
          bind={bindbodyDescription}
          value={bodyDescription}
          placeholder="Description"
          submit={submitDescription}
        />
        <div className="grid grid-cols-6">
          {!updateDescription ? (
            <Button onClick={AddDescription} label="ADD" color="blue" />
          ) : (
            <Button onClick={UpdateDescription} color="green" label="Update" />
          )}
        </div>
        <DetailOfDescription />
      </motion.div>
    )
  );
};

const FormAddImage = () => {
  const { bindImages, files, showImage, resetImages, deleteImageByIndex } =
    UseStateContextFormProduit();
  return (
    showImage && (
      <motion.div
        animate={showImage ? "visible" : "hidden"}
        initial={!showImage ? "visible" : "hidden"}
        variants={squareVariants}
        className="relative  col-span-3 grid gap-4 border  border-black rounded border-dashed md:h-52 place-items-center "
      >
        {!files || !files.length > 0 ? (
          <label className="cursor-pointer">
            <div className=" grid place-items-center  ">
              <AiOutlineUpload className="h-10 w-10  " />
            </div>
            <input
              type="file"
              {...bindImages}
              multiple={true}
              className="absolute w-3 h-3  opacity-0"
            />
          </label>
        ) : (
          <div className="absolute bottom-2 right-2 grid  gap-2">
            <InputFileMini bind={bindImages} file={files} multiple={true} />
            <div
              onClick={resetImages}
              className="h-10 bg-white border border-red-400 rounded  grid place-items-center   rounded cursor-pointer"
            >
              <AiOutlineDelete className=" text-2xl text-red-500" />
            </div>
          </div>
        )}

        {files && files.length > 0 && files.length < 16 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-rows-2 md:grid-flow-col gap-2 p-1 ">
            {files.map((file, index) => {
              return (
                <div className="group relative ">
                  <img src={file} alt="" className="md:w-20 w-full h-24" />
                  <div className="absolute top-0  md:w-20 w-full">
                    <div className="grid h-24  place-items-center opacity-0 group-hover:opacity-100 cursor-pointer">
                      <AiOutlineDelete
                        onClick={() => {
                          deleteImageByIndex(index);
                        }}
                        className="text-red-500 rounded-full h-10 w-10 p-2  bg-white "
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          files &&
          files.length >= 16 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-rows-2 md:grid-flow-col w-max  gap-2 p-1 ">
              {files.map((file, index) => {
                if (index === 15)
                  return (
                    <div className="bg-gray-500 opacity-30 w-full  md:w-20 h-24 top-0 cursor-pointer ">
                      <div className="grid h-24 place-items-center">
                        <p className="text-white font-bold text-lg">. . .</p>
                      </div>
                    </div>
                  );
                if (index < 15)
                  return (
                    <div className="group relative ">
                      <img src={file} alt="" className="md:w-20 w-full h-24" />
                      <div className="absolute top-0  md:w-20 w-full">
                        <div className="grid h-24  place-items-center opacity-0 group-hover:opacity-100 cursor-pointer">
                          <AiOutlineDelete
                            onClick={() => {
                              deleteImageByIndex(index);
                            }}
                            className="text-red-500 rounded-full h-10 w-10 p-2  bg-white "
                          />
                        </div>
                      </div>
                    </div>
                  );
              })}
            </div>
          )
        )}
      </motion.div>
    )
  );
};

const Button = (props) => (
  <button
    type="button"
    className={`col-start-6 bg-${props.color}-500 py-2 rounded text-white font-bold tracking-wider`}
    onClick={props.onClick}
  >
    {props.label}
  </button>
);

const FormProduit = ({}) => {
  console.log("forme Produit")
  const {
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
    submit,
    createProduit,
    updateProduit,
    progresse,
    loding,
    update,
    incriment,
    count
  } = UseStateContextFormProduit();

  return (
    <form className="grid  border border-gray-400 rounded-md p-4 md:grid-cols-3 gap-3  ">
      <button type="button" onClick={incriment}>{count}</button>
      <div className="col-span-3 grid grid-cols-3 gap-4">
        <InputText
          bind={bindName}
          value={name}
          submit={submit}
          placeholder="Name"
        />
      </div>
      <div className="col-span-3 grid grid-cols-3 gap-4">
        <InputText bind={bindTva} value={tva} submit={submit} placeholder="Tva" />
        <InputText
          bind={bindPrix}
          value={prix}
          submit={submit}
          placeholder="Prix"
        />
        <InputText
          bind={bindQuantity}
          value={quantity}
          submit={submit}
          placeholder="Quantity"
        />
      </div>
      <div className="col-span-3 grid grid-cols-3 gap-4">
        <InputSelect
          titel="Categorie"
          bind={bindCategorie}
          data={categories}
          value={categorie}
          submit={submit}
          placeholder="Tva"
        />
        <InputSelect
          titel="Marque"
          bind={bindMarque}
          data={marques}
          value={marque}
          submit={submit}
          placeholder="Prix"
        />
        <InputSelect
          titel="Forniseur"
          bind={bindForniseur}
          data={forniseurs}
          value={forniseur}
          submit={submit}
          placeholder="Quantity"
        />
      </div>
      <ButtonShowImageOuDescription />
      <FormAddDecription />
      <FormAddImage />
      <div className="col-span-3 grid grid-cols-6 ">
        <Linear value={progresse} loding={loding}/>
    {!update?  <Button onClick={createProduit} color="blue" label="Save"/>: <Button onClick={updateProduit} color="green" label="Update"/>}
      </div>
    </form>
  );
};

export default FormProduit;
