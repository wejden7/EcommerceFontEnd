
import React from 'react'

const CardHome = ({icon, text,soutext,activeMenu,from,to})=>{
    return (
<div className={activeMenu ?
     `h-32 group w-full bg-gradient-to-r from-${from} to-${to} rounded-md grid place-items-center cursor-pointer mb-4 `
    :`h-32 group w-full md:w-60 bg-gradient-to-r from-${from} to-${to} rounded-md grid place-items-center cursor-pointer `}>
    <div className="flex items-center gap-4">
      <div className="w-min text-7xl hidden sm:flex text-sky-800 opacity-80 group-hover:scale-125 ease-in-out duration-300">
       {icon}
      </div>

      <div className="text-center">
        <div className="text-2xl  font-normal text-white">{text}</div>
        <div className=" font-medium text-xl text-indigo-900 opacity-70">{soutext}</div>
      </div>
    </div>
  </div>
    )
}

export default CardHome;