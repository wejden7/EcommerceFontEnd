import React, { createContext, useContext, useState, useEffect } from "react";
import useTextInput from "../../hooks/inputText";
import {create,getAll,deleteByArrayId,updateById} from "../../service/forniseur.service";
import {isEmpty,isEmail,isNumberPhone}from '../../validateur/validator'
import { UseStateContext } from "../contextProvider";

const StateContext = createContext();
const NavSechma = [
    {
      label: "Dashbored",
      link: "dashbored",
    },
    {
      label: "Forniseur",
      link: "dashbored/forniseur",
    },
  ];

  const Error ={
    name:'',
    email:'',
    tel:'',
    adresse:''
  }
export const ContextProviderForniseur = ({ children }) => {
    const [nav,setNav] = useState(NavSechma)
    const [name,bindName, resetName,setName] =useTextInput('')
    const [email,bindEmail, resetEmail,setEmail] =useTextInput('')
    const [tel,bindTel, resetTel,setTel] =useTextInput('')
    const [adresse,bindAdresse, resetAdresse,setAdresse] =useTextInput('')
    const [formValidator,setFormValidator,] =useState('false')
    const [errorMessage,setErrorMessage,] =useState(Error)
    const [saveCliked,setSaveCliked,] =useState(false)
    const [updateCliked,setUpdateCliked,] =useState(false)
    const [update,setUpdate,] =useState(false)
    const [id,setId,] =useState('')
    const {handleClickSnackbar,severityESWI,} = UseStateContext();
   
    const [forniseur,setForniseur] =useState([])
    const [forniseurSelected,setForniseurSelected] =useState([])

    useEffect(()=>{
      getAllForniseur()
    },[])

    useEffect(()=>{
      if(forniseurSelected.length!=1 && update){
        reset()
      }
    },[forniseurSelected])

    useEffect(()=>{
      setErrorMessage((l)=>({...l,name:isEmpty(name)?"Name is required":""}))

    },[name])
    useEffect(()=>{
      setErrorMessage((l)=>({...l,email:isEmpty(email)?"Email is required":(isEmail(email)?"":"Email invalide")}))

    },[email])

    useEffect(()=>{
      setErrorMessage((l)=>({...l,tel:isEmpty(tel)?"Telphone is required":(isNumberPhone(tel)?"":"Number Phone have 8 number")}))

    },[tel])

    useEffect(()=>{
      setErrorMessage((l)=>({...l,adresse:isEmpty(adresse)?"Adresse is required":""}))

    },[adresse])


    useEffect(()=>{
      if(isEmpty(name)||isEmpty(email)||isEmpty(tel)||isEmpty(adresse)){
        setFormValidator(false)

      }else if(isEmail(email)&& isNumberPhone(tel)){
        setFormValidator(true)
      }else{
        setFormValidator(false)
      }
    },[errorMessage])

   

    const reset= ()=>{
      resetName()
      resetEmail()
      resetTel()
      resetAdresse()
      setSaveCliked(false)
      setUpdateCliked(false)
      setId('')
      setUpdate(false)

    }

    const itemSelect = (item)=>{
      console.log(item)
      setForniseurSelected(a=>item)
      
    }

    const updateFunction = () => {
    
       if(forniseurSelected.length==1)
     { 
      var data = forniseur.filter(item=>item._id===forniseurSelected[0])
      console.log(data[0])

      setUpdate(true)
      setId(data[0]._id)
      setAdresse(data[0].adresse)
      setEmail(data[0].email)
      setName(data[0].name)
      setTel(data[0].tel.toString())
      console.log(errorMessage) 
    }
    }

    const createForniseur = async ()=>{
      setSaveCliked(true)
      if(formValidator){
      await create(name,email,tel,adresse)
          .then((result)=>{
            reset()
            getAllForniseur()
            handleClickSnackbar(result.data.message,severityESWI[1])
            console.log(result)

          }).catch((error)=>{
            handleClickSnackbar(error.response.data.message,severityESWI[0])

            console.log(error)
          })
   
      }
      
    }

    const getAllForniseur = async ()=>{
      await getAll()
        .then((result)=>{
          console.log(result)
          console.log(result.data)
          setForniseur(l=>result.data.data)

        }).catch((error)=>{
          console.log(error.response.data)
          setForniseur(l=>[])
        })
    }

    const deleteForniseur = async () => {
        await  deleteByArrayId(forniseurSelected)
        .then((result)=>{
              console.log(result.data)
              getAllForniseur()
            
        }).catch((error)=>{
          console.log(error)
        })
       
      
      
     
    }

    const UpdateForniseur = async ( )=>{
      setUpdateCliked(true)
      if(formValidator){
        updateById(id,name,email,tel,adresse)
        .then((result)=>{
          console.log(result)
          handleClickSnackbar("The forniseur has been updated",severityESWI[1])
          reset()
          getAllForniseur()
        }).catch((error)=>{
          console.log(error)
          handleClickSnackbar("There was an error updating the forniseur",severityESWI[0])
          
        })
      }
    
    }



  return <StateContext.Provider value={{updateCliked,UpdateForniseur,update,updateFunction,deleteForniseur,forniseurSelected,itemSelect,forniseur,errorMessage,saveCliked,createForniseur,nav,bindName,bindEmail,bindTel,bindAdresse}}>{children}</StateContext.Provider>;
};

export const UseStateContextForniseur = () => useContext(StateContext);
