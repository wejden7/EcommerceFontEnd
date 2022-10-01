import React, { useEffect } from "react";
import { Link } from "react-router-dom";
const Nav = ({Nav}) => {
 useEffect(() => {});
  return (
    <div className="flex items-center w-full pb-3 text-xs hidden md:flex">
      {Nav.map((item, index) => {
        if(index<Nav.length-1){
          return (
            <div key={index} className="pr-1">
              <Link  to={"/" + item.link} className="text-blue-500 pr-1">
                {item.label}
              </Link>
            /
            </div>
          );
        }else{
          return <p key={index}> {item.label}</p>
        }
          
         
        }
      )}
  </div>
  );
};

export default Nav;
