import React, { useState ,useEffect} from "react";
import { InputText, InputTextArea } from "../../";
import useText from "../../../hooks/inputText";

import { addDescription,modifierDiscription } from "../../../page/dashbored/pages/produit/produitSlice";
import { useDispatch } from "react-redux";
const FormDescription = ({ id ,update, item ,reset}) => {
  const dispatch = useDispatch();
  const [submit, setSubmit] = useState(false);
  const [title, bindTitle, resetTitle, setTitle] = useText("");
  const [description, bindDescription, resetDescription, setDescription] =
    useText("");

  useEffect(() => {
    console.log(item)
    if(item && update){
      setTitle(item.title);
      setDescription(item.description);
    }else{
      resetTitle();
      resetDescription();
    }
    
  },[item])

  const handleSubmit = () => {
    setSubmit(true);
    const initialProduit = {
      id: id,
      title: title,
      description: description,
    };
    try {
      dispatch(addDescription(initialProduit)).unwrap();
      resetTitle();
      resetDescription();
      setSubmit(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = () =>{
    setSubmit(true);
    const initialProduit = {
      _id:item._id,
      id: id,
      title: title,
      description: description,
    };
    try {
      dispatch(modifierDiscription(initialProduit)).unwrap();
      resetTitle();
      resetDescription();
      setSubmit(false);
      reset()
    } catch (err) {
      console.log(err);
    }
   
  }

  return (
    <div className=" bg-gray-200 p-2 h-min pb-4">
      <div className="py-4">
       <p className="font-medium tracking-wider text-indigo-500 ">Detaille Notre produit</p> 
      </div>
      
      <InputText
        bind={bindTitle}
        value={title}
        submit={submit}
        placeholder="Title"
      />
      <InputTextArea
        bind={bindDescription}
        submit={submit}
        value={description}
        placeholder="Description"
      />
      <div className="flex justify-center w-full ">
        {!update?<button
          type="button"
          onClick={handleSubmit}
          className="bg-indigo-500 hover:bg-indigo-400 px-8 py-1 rounded text-white font-bold "
        > 
          Save
        </button>: <button
          type="button"
          onClick={handleUpdate}
          className="bg-indigo-500 hover:bg-indigo-400 px-8 py-1 rounded text-white font-bold "
        >
          update
        </button>}

      </div>
    </div>
  );
};

export default FormDescription;
