import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProduitById, addImageProduit } from "./produitSlice";
import { useParams } from "react-router-dom";
import useFilesInput from "../../../../hooks/inputFile";
import * as comp from "../../../../component";

const ProduitDetailler = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const produit = useSelector((state) => selectProduitById(state, id));
  const [files, images, bindImages, resetImages, deleteByIndex] =
    useFilesInput(true);
  const uplodeImage = () => {
    const initialProduit = { id: id, images: images };
    try {
      dispatch(addImageProduit(initialProduit)).unwrap();
      resetImages();
    } catch (error) {}
  };
  const NavSechma = [
    {
      label: "Dashbored",
      link: "dashbored",
    },
    {
      label: "produit",
      link: "dashbored/produit",
    },
    {
      label: `${produit?.name}`,
      link: "",
    },
  ];
  let Content;
  if (produit) {
    Content = (
      <div className="bg-white grid  mt-2 ">
        <div className="grid grid-cols-3 gap-4 bg-white">
          <div className="group relative">
            <comp.SliderSwiper data={produit.images} id={id} />
            <div className="z-10 absolute group-hover:opacity-100 opacity-0 bottom-2 right-3">
              <comp.InputFileMini
                multiple={true}
                bind={bindImages}
                file={files}
                submit={false}
              />
            </div>
          </div>

          <comp.DetailleProduit produit={produit} />
        </div>
        <div>
          <comp.FileUplode
            files={files}
            deleteByIndex={deleteByIndex}
            uplodeImage={uplodeImage}
          />
        </div>

       
          <comp.Description descriptions={produit.description} id={id} />
         
         <div className="p-4">
         <comp.FormProduit update={true} item={produit}/>
         </div>
       
      </div>
    );
  } else {
    Content = <comp._404Page/>;
  }
  return (
    <div className="m-3">
      <comp.Nav Nav={NavSechma} />
      {Content}
    </div>
  );
};
export default ProduitDetailler;