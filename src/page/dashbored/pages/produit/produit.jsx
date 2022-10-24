import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Slice from "./produitSlice";
import * as commponent from "../../../../component";
import { AiOutlinePlus } from "react-icons/ai";
import { motion } from "framer-motion";
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

const Content = ()=>{
  const orderedPostIds = useSelector(Slice.selectProduitIds);
  const postsStatus = useSelector(Slice.getProduitstatus);
  switch(postsStatus) {
    case 'loading':
      return  <commponent.LoderMotion />;
    case 'succeded':
        return(orderedPostIds.length)>0 ?  
          <div className="grid grid-cols-4 gap-5">
            {orderedPostIds.map((id) => (
              <commponent.CardProduit key={id} id={id} />
            ))}
          </div>
        :<commponent.EmpytPage />
    case 'failed':
      return <commponent._404Page />;
    
  
}

}
const Produit = () => {
  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState(false);
  const postsStatus = useSelector(Slice.getProduitstatus);
  const postsError = useSelector(Slice.getProduitError);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(Slice.fetchProduit());
    }
  }, [postsStatus, dispatch]);

  


  return (
    <div className="m-3 grid gap-2">
      <commponent.Nav Nav={NavSechma} />
      <div className="w-full h-full grid  gap-2 rounded ">
        <div className="bg-blue-700 w-full mt-1 p-5 rounded-md flex items-center justify-between">
          <p className="text-xl font-bold text-white tracking-wider">Produit</p>
          <commponent.OpenButton
            title={"new Produit"}
            onClick={() => {
              setOpenForm(!openForm);
            }}
            icon={<AiOutlinePlus />}
          />
        </div>
        <>
          {openForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <commponent.FormProduit />
            </motion.div>
          )}

          <Content/>
        </>
      </div>
      <commponent.SnackBarComponent />
    </div>
  );
};

export default Produit;
