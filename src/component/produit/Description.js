import React ,{useState}from "react";
import { Image } from "../";
import { AiOutlineEdit } from "react-icons/ai";
import { FormDescription,EmpytPage } from "../";
import { useDispatch } from "react-redux";
import { supprumeDiscription } from "../../page/dashbored/pages/produit/produitSlice";

const Description = ({ descriptions, id }) => {
  let content;
  const dispatch = useDispatch();
  const[description,setDescription] = useState('')
  const[update,setUpdate] = useState(false)

  const resteUpdate = ()=> {
    setDescription({})
    setUpdate(false)
  }

  const handleDelete = (_id) => {
    const initialProduit = {id_produit:id,id_description:_id};
    try {
      dispatch(supprumeDiscription(initialProduit)).unwrap();
     
    } catch (err) {
      console.log(err);
    }
  };

  if (descriptions.length > 0) {
    content = (
      <div>
        <div className="bg-indigo-500  p-4 w-full mb-3 ">
          <p className=" text-xl font-bold text-center text-gray-100  tracking-wider whitespace-normal">
            Description
          </p>
        </div>

        {descriptions.map((item, index) => (
          <div key={index} className="mb-10">
            <h1 className="flex gap-2 place-items-center text-gray-900 font-medium   tracking-widest whitespace-normal mb-7">
              {item.title}{" "}
              <AiOutlineEdit onClick={()=>{
                setDescription(item)
                setUpdate(true)}} className="text-gray-500 hover:text-black cursor-pointer" />
            </h1>
            <p className="text-gray-500  text-sm  text-justify tracking-wider  whitespace-normal mb-7">
              {item.description}
            </p>
            <div className="flex justify-end">
              <button type="button" onClick={()=>handleDelete(item._id)} className="py-1 px-2 bg-red-500 hover:bg-red-400 text-white font-medium">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    content = <EmpytPage/>
  }

  return (
    <div className="grid grid-cols-3 gap-5 my-4 mx-4">
      <div className=" col-span-2">{content}</div>
      <FormDescription id={id} update={update} item={description} reset={resteUpdate} />
    </div>
  );
};

export default Description;
