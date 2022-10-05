import { useEffect, useState } from "react";
import useTextInput from "../../../hooks/inputText";
import useNumberInput from "../../../hooks/inputNumber"
import {UseStateContextForniseur} from "../../../contexts/dashbored/contextProviderForniseur"
import {create,updateById} from "../../../service/forniseur.service";
import {isEmpty,isEmail,isNumberPhone}from '../../../validateur/validator'
import { UseStateContext } from "../../../contexts/contextProvider";
export default function useFormForniseur(){
    const [name,bindName, resetName,setName] =useTextInput('')
    const [email,bindEmail, resetEmail,setEmail] =useTextInput('')
    const [tel,bindTel, resetTel,setTel] =useNumberInput({initialValue:"",max:8})
    const [adresse,bindAdresse, resetAdresse,setAdresse] =useTextInput('')
    const [submit,setSubmit]=useState(false)
    const [formValid,setFormValid]=useState(false)
    const {getAllForniseur,update,item} =UseStateContextForniseur()
    const {handleClickSnackbar,severityESWI,} = UseStateContext();
   


    useEffect(()=>{
        const valid = ()=>{
            if(isEmpty(name)||isEmpty(email)||isEmpty(tel)||isEmpty(adresse)){
                return false;
            }else if(isEmail(email)&&isNumberPhone(tel)){
                return true;
            }else{
                return false;
            }
        }

        setFormValid(valid)

    },[name,email,tel,adresse])


    useEffect(()=>{
        const initialization =()=>{
            if(update){
                setName(item.name);
                setEmail(item.email);
                setTel(item.tel.toString());
                setAdresse(item.adresse);
            }else{
                resetForm();
            }

        }

        initialization()
    },[update])

    const resetForm = ()=>{
        resetName();
        resetEmail();
        resetAdresse();
        resetTel();
        setSubmit(false);
        setFormValid(false);
    }

    const CreateForniseur = async ()=>{
        setSubmit(true)
        if(formValid){
            console.log("valide")
        await create(name,email,tel,adresse)
            .then(async(result)=>{
            resetForm()
            await  getAllForniseur()
              handleClickSnackbar(result.data.message,severityESWI[1])
              console.log(result)
  
            }).catch((error)=>{
              handleClickSnackbar(error.response.data.message,severityESWI[0])
  
              console.log(error)
            })
     
        }
        
      }
      const UpdateForniseur = async ( )=>{
        setSubmit(true)
        if(formValid){
          updateById(item._id,name,email,tel,adresse)
          .then(async(result)=>{
            console.log(result)
            handleClickSnackbar("The forniseur has been updated",severityESWI[1])
            resetForm()
           await getAllForniseur()
          }).catch((error)=>{
            console.log(error)
            handleClickSnackbar("There was an error updating the forniseur",severityESWI[0])
            
          })
        }
      
      }

    return [bindName,bindEmail,bindTel,bindAdresse,name,email,tel,adresse,submit,update,UpdateForniseur,CreateForniseur]
}