import React from "react";
import "./sidebar.css";
import { AiOutlineLogout} from 'react-icons/ai';
import { Link, NavLink, useNavigate} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";

import { links } from "../../data/dummy";
import { UseStateContext } from "../../contexts/contextProvider";

const Sidebar = () => {
  const {currentColor, activeMenu, setActiveMenu, screenSize } =
    UseStateContext();

    const navigate = useNavigate();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex bg-fuchsia-100   items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg   text-md m-2";
  const normalLink =
    "flex bg-blue-900  items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-white dark:text-white dark:hover:text-black hover:text-black hover:bg-fuchsia-100 m-2";

  return (
    <div className="bg-indigo-500 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 scrollbar-hide  ">
     
      {activeMenu && (
        <>
          <div className="flex justify-between ">
            <Link
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-white"
            >
              <SiShopware /> <span>Shoppy</span>
            </Link>
            <div className="items-center  gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900 ">
              <Tooltip title="" className="bg-primary">
                <IconButton
                  type="button"
                  onClick={() => {
                    navigate('/')
                    localStorage.setItem('token', null);}}
                  className="text-xl IconButton  rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
                >
                  <AiOutlineLogout />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          <div className="mt-10 ">
            {links.map((item) => (
              <div key={item.title}>
                <p className=" text-white  dark:text-white  m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.src}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                   
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span className="capitalize ">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
