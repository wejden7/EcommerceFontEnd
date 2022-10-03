import React, { createContext, useContext, useEffect, useState } from "react";
import useTextInput from "../../hooks/inputText";
import useLogoInput from "../../hooks/inputFile";
import { UseStateContext } from "../contextProvider";
import {create,getAll,deleteById,updateById} from "../../service/marque.service"
import{isEmpty,isEmptyFile}from "../../validateur/validator"
const StateContext = createContext();

const NavSechma = [
    {
      label: "Dashbored",
      link: "dashbored",
    },
    {
      label: "marque",
      link: "dashbored/marque",
    },
  ];
  const Error = {
    label:"is required",
    logo:"is required"

  }
export const ContextProviderMarque = ({ children }) => {
    const {handleClickSnackbar,severityESWI,} = UseStateContext();
    const [nav,setNav] = useState(NavSechma)
    const [label,bindLabel,resetLabel,setLabel,] = useTextInput("");
    const [file, logo, bindLogo, resetLogo] = useLogoInput();
    const [saveCliked,setSaveCliked] =useState(false);
    const [formValid,setFormValid] =useState(false);
    const [error,setError] =useState(Error);
    const [marques,setMarques] =useState([]);
    const [marquesSearch,setMarquesSearch] =useState([]);
    const [search,bindSearch,resetSearch,setSearch,] = useTextInput("");
    const [id,setId] =useState();
    const [logNameExist,setLogNameExist] =useState("");
    const [update,setUpdate] =useState(false);
    const [updateCliked,setUpdateCliked] =useState(false);
    const [formUpadetValid,setFormUpadteValid] =useState(false);
    const [progress,setProgress] =useState(0);
    const [loding,setLoding] =useState(false);


    const reset = ()=>{
        resetLabel()
        resetLogo()
        setSaveCliked(false)
        setUpdateCliked(false)
        setFormValid(false)
        setId("")
        setLogNameExist("")
        setUpdate(false)
        setProgress(0)
        setLoding(false)
    }
    useEffect(()=>{
        getAllMarque()
    },[])
    useEffect(()=>{
        var tab =marques.filter(item=>item.label.toUpperCase().includes(search.toUpperCase()))

        setMarquesSearch((art)=>tab)

    },[marques,search])
    useEffect(()=>{
        setFormValid(!(isEmpty(label)||isEmptyFile(logo)))
        setFormUpadteValid(!isEmpty(label))
    },[error])
    useEffect(()=>{ 
      setError((l)=>({...l,label:isEmpty(label)?"Label is required":""}))
    },[label])

    useEffect(()=>{
      setError((l)=>({...l,logo:isEmptyFile(logo)?"logo is required":""}))
    },[logo])


    const handelSave =()=>{
        setSaveCliked(true)
        if(formValid){
            createMarque()
        }

    }

    const handelUpdate =(_)=>{
        setUpdate(true)
        setId(_._id)
        setLabel(_.label)
        setLogNameExist(_.logo)
    }

    const createMarque =async ()=>{
        await create(label,logo,function (progressEvent){
            const {loaded,total}=progressEvent;
            let precent = Math.floor((loaded*100)/total);
            setProgress(precent)
        }).
            then((result)=>{
                setLoding(true)
                setTimeout(()=>{
                    reset()
                    getAllMarque()
                    handleClickSnackbar("The marque has been created",severityESWI[1])
                    console.log(result)
                },1000)
                  
                
                

            }).catch((error)=>{
                handleClickSnackbar("here was an error",severityESWI[0])

                console.log(error)
            })
    }

    const getAllMarque =async () => {
        await getAll()
            .then((result)=>{
                setMarques(result.data.data)

            }).catch((error)=>{
                setMarques([])

            })

    }

    const deleteMarque = async ( id)=>{
        await deleteById(id)
            .then((result)=>{
                handleClickSnackbar("The marque has been delete",severityESWI[1])
                getAllMarque()
            }).catch((error)=>{
                handleClickSnackbar("here was an error",severityESWI[0])
            })
    }

    const updateMarque = async  () => {
        setUpdateCliked(true)
        if(formUpadetValid){
            await updateById(id,label,logo,logNameExist)
            .then((result)=>{
                
                getAllMarque()
                reset()
                handleClickSnackbar("The marque has been update",severityESWI[1])


            }).catch((error)=>{
                handleClickSnackbar("here was an error",severityESWI[0])

                console.log(error)

            })
        }

        
    }
    
  return (
    <StateContext.Provider value={{loding,formValid,progress,reset,bindSearch, nav,bindLabel,bindLogo,file,saveCliked,handelSave,error,marquesSearch,deleteMarque,handelUpdate,update,updateMarque,updateCliked ,label}}>
      {children}
    </StateContext.Provider>
  );
};

export const UseStateContextMarque = () => useContext(StateContext);
