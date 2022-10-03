import React from "react";
import image from '../../data/4041.jpg';
import { useNavigate } from "react-router-dom";
const AuthenticatedError = ()=>{
    const navigate = useNavigate();

    const navigateToLogin= ()=>{
        navigate("/");
    }
    return(
        <div className="grid h-screen  place-items-center bg-white">
            <div className="grid   place-items-center ">
            <img className=" w-2/5 " src={image} alt={404} />
                <div className="text-3xl py-1 font-bold text-sky-800 tracking-wide">No authenticated found.</div>
                <div className="text-base font-medium  text-sky-800 opacity-60 tracking-wide">This  page is not publically available.</div>
                <div className="text-base py-1 font-medium text-sky-800 opacity-60 tracking-wide">To access it please login first.</div>
                <button
              type="button"
              onClick={navigateToLogin}
              className="flex items-center justify-center mt-6  w-48 text-white rounded py-2 font-medium text-xs bg-sky-600 hover:drop-shadow-xl hover:bg-sky-400 uppercase"
            > return login
            </button>
            </div>
       
        </div>
        
    )
}

export default AuthenticatedError;