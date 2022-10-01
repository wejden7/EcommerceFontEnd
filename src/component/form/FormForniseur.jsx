import React from 'react'
import {InputText} from "../../component"


const FormForniseur = ({bindname,bindemail,bindtel,bindadresse,savecliked,updatecliked,updateforniseur,createforniseur,update,error})=>{
    
    return(
        <form className="grid gap-3  justify-items-center ">
            <p className="font-medium tracking-wider text-blue-500 ">
              New Forniseur
            </p>
            <div className="w-3/4  grid gap-3">

            <div>
            <InputText
            bind={bindname}
            saveCliked={savecliked}
            updateCliked={updatecliked}
            errorLabel={error.name}
            placeholder={"Name"}
            />
            </div>
           
           
             <div> <InputText
            bind={ bindemail}    
            saveCliked={savecliked}
            updateCliked={updatecliked}
            errorLabel={error.email}
            placeholder={"Email"}
            /></div>
           
           
           <div> <InputText
            bind={bindtel}
            saveCliked={savecliked}
            updateCliked={updatecliked}
            errorLabel={error.tel}
            placeholder={"Phone"}
            /></div>
           
          <div> <InputText
              bind={bindadresse}
              saveCliked={savecliked}
                updateCliked={updatecliked}
                errorLabel={error.adresse}
                placeholder={"Adresse"}
            /></div>
           
            </div>

            <div className="flex  justify-center  md:justify-end w-3/4 ">
             {!(update ) ?( <button
                type="button"
                onClick={createforniseur}
                className=" rounded bg-blue-500 w-full md:w-min  px-3 py-1 text-white"
              >
                Save
              </button>):(<button
                type="button"
                onClick={updateforniseur}
                className=" rounded bg-green-500 w-full md:w-min  px-3 py-1 text-white"
              >
                Update
              </button>)}
            </div>
          </form>
         
    )

}

export default FormForniseur;