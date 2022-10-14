import React from "react";
import { Nav, FormProduit, OpenButton ,SnackBarComponent} from "../../../component";
import {ContextProviderFormProduit} from "../../../component/form/FormProduit/FormProduit"
import { UseStateContextProduit } from "../../../contexts/dashbored/contextProviderProduit";
import {
  AiOutlinePlus,
  AiOutlineHeart,
  AiOutlineUnorderedList,
  AiOutlineShoppingCart,
  AiOutlineDelete,
} from "react-icons/ai";
import {MdUpdate,MdOutlineVisibility,MdOutlineVisibilityOff} from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
const Produit = () => {
  console.log("Produit")
  const {
    nav,
    openNewForm,
    openCloseForm,
    produits,
    deleteProduitById,
    openProduit,
    openDetailProduit,
    produit,
    updateProduct,
    incriment,
        count
  } = UseStateContextProduit();
  return (
    <div className="m-3 grid gap-2">
      <Nav Nav={nav} />
      <button onClick={incriment} className="br-blue rounded py-2 px-3 ">{count}</button>
      <div className="w-full h-full grid  gap-2 rounded ">
        <div className="bg-blue-700 w-full mt-1 p-5 rounded-md flex items-center justify-between">
          <p className="text-xl font-bold text-white tracking-wider">Produit</p>
          <OpenButton
            title={"new Produit"}
            onClick={openCloseForm}
            icon={<AiOutlinePlus />}
          />
        </div>
        <>
          {openNewForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ContextProviderFormProduit>
              <FormProduit />
              </ContextProviderFormProduit>
            </motion.div>
          )}

          {!openNewForm && !openProduit && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="grid place-items-center w-full h-full sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-4 mb-4">
                {produits.map((item) => {
                  return (
                    <div className=" border bg-white w-full  " key={item._id}>
                      <div className="h-52 grid place-items-center">
                        {item.images.length > 0 && (
                          <img
                            src={
                              "http://127.0.0.1:3006/images/" +
                              item.images[0].url
                            }
                            alt="icon"
                            className=" h-52 w-full "
                          />
                        )}
                      </div>

                      <div className="flex justify-between mx-2 mt-2">
                        <p className=" break-normal whitespace-normal truncate capitalize text-cyan-500 tex-lg italic font-semibold tracking-wider">
                          {item.name}
                        </p>
                      </div>
                      <div className="flex justify-end mx-2 gap-2">
                        <p className="text-sm text-gray-300   line-through  ">
                          {item.prix}{" "}
                          <span className="text-xs  align-top">DT</span>
                        </p>
                        <p className="text-red-300  inline-block align-baseline  ">
                          {item.prix}{" "}
                          <span className="text-xs  align-top">DT</span>
                        </p>
                      </div>
                      <div className="grid  grid-cols-4 place-items-center mt-4	mx-2  ">
                        <div className=" text-xl group  p-2 grid place-items-center cursor-pointer ">
                          <MdOutlineVisibility className="group-hover:scale-110 group-hover:text-rose-500" />
                        </div>
                        <div onClick={()=>updateProduct(item)} className=" text-xl group  p-2 grid place-items-center cursor-pointer">
                          <MdUpdate className="group-hover:scale-110 group-hover:text-blue-500" />
                        </div>
                        <div
                          className=" text-xl group  p-2 grid place-items-center cursor-pointer"
                          onClick={() => {
                            deleteProduitById(item._id);
                          }}
                        >
                          <AiOutlineDelete className="group-hover:scale-110 group-hover:text-red-500" />
                        </div>
                        <div
                          className=" text-xl group  p-2 grid place-items-center cursor-pointer"
                          onClick={() => {
                            openDetailProduit(item);
                          }}
                        >
                          <AiOutlineUnorderedList className="group-hover:scale-110 group-hover:text-green-500" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {openProduit && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className=" "
            >
              <div className="grid sm:grid-cols-2 gap-2 bg-white">
                <div className="grid sm:grid-cols-2 gap-1">
                  {Produit.images.map((item) => {
                    return (
                      <div
                        key={item._id}
                        className="h-52 grid place-items-center"
                      >
                        <img
                          src={"http://127.0.0.1:3006/images/" + item.url}
                          alt="icon"
                          className=" h-52 w-full "
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="p-4  w-full h-full">
                  <p>{Produit.name}</p>
                  <div className="flex place-items-center">
                    <p className="text-lg pr-2 font-bold">Prix : </p>
                    <p className=""> {Produit.prix} <span className="text-xs align-top">dt</span></p>
                  </div>
                  <div className="flex place-items-center">
                    <p className="text-lg pr-2 font-bold">Tva : </p>
                    <p className=""> {Produit.tva}</p>
                  </div>
                  <div className="flex place-items-center">
                    <p className="text-lg pr-2 font-bold">Quantity : </p>
                    <p className=""> {Produit.quantity}</p>
                  </div>
                  <div className="flex place-items-center">
                    <p className="text-lg pr-2 font-bold">Forniseur : </p>
                    <p className=""> {Produit.forniseur.name}</p>
                  </div>
                  <div className="flex place-items-center">
                    <p className="text-lg pr-2 font-bold">marque : </p>
                    <p className=""> {Produit.marque.label}</p>
                  </div>
                  <div className="flex place-items-center">
                    <p className="text-lg pr-2 font-bold">categorie : </p>
                    <p className=""> {Produit.categorie.label}</p>
                  </div>

                </div>

                <div className="p-4  sm:col-span-2 w-full h-full">
                  {Produit.description.map((item) => {
                    return (
                      <div key={item._id} className="mb-2">
                        <p className="text-xl font-boled text-gray-800 mb-2">
                          {" "}
                          {item.title}
                        </p>
                        <p className="text-gray-500 text-sm  indent-4 leading-6  ">
                          {" "}
                          {item.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </>
      </div>
      <SnackBarComponent/>
    </div>
  );
};

export default Produit;
