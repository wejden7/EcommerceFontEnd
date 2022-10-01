import React from "react"


const InputText = ({bind,saveCliked,updateCliked,errorLabel,placeholder})=>{

    return(
        <div>
        <input
                    {...bind}
                    placeholder={placeholder||"Label"}
                    className=" h-10 w-full appearance-none border rounded border-gray-400 hover:border-black hover:cursor-pointer  py-2 px-3 text-gray-700 text-base leading-tight focus:outline-none "
                    type="text"
                  />
                  {(saveCliked || updateCliked) && (
                    <p className="text-xs text-red-500 text-end">
                      {errorLabel}
                    </p>
                  )}
        </div>
    )
}

export default  InputText;