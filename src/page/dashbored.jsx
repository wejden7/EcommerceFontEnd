import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar, Navbar } from "../component";
import { UseStateContext } from "../contexts/contextProvider";


const Dashbored = () => {
  const {
    activeMenu,
  } = UseStateContext();
  return (
   
      <div className="dashbored flex relative  dark:bg-main-dark-bg ">
        {activeMenu ? (
          <div className="sidebar w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white  ease-in-out duration-300 translate-x-0">
            <Sidebar />
          </div>
        ) : (
          <div className="sidebar w-0 fixed sidebar dark:bg-secondary-dark-bg bg-white ease-in-out duration-300 translate-x-0 ">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? "relative dark:bg-main-dark-bg   min-h-screen md:ml-72 w-full ease-in-out duration-300 translate-x-0"
              : "relative  dark:bg-main-dark-bg  w-full min-h-screen  ease-in-out duration-300 translate-x-0"
          }
        >
          <div className="sticky top-0   drop-shadow bg-white dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
          </div>
          <div className="">
          <Outlet/>
          </div>
        </div>
      </div>
    
  );
};

export default Dashbored;