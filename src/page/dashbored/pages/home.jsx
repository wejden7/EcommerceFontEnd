import React from "react";
import { AiOutlineShop, AiOutlineBulb } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { BiDollarCircle } from "react-icons/bi";
import { UseStateContext } from "../../../contexts/contextProvider";
import { CardHome, ChartBar, ChartArea,ChartPie } from "../../../component";

const Home = () => {
  const { activeMenu } = UseStateContext();

  return (
    <div>
      <div
        className={
          activeMenu
            ? "grid md:grid-cols-4 gap-4  h-full m-2 e"
            : " grid grid-cols-2 sm:grid-cols-2  md:flex justify-center gap-4  h-full m-2   "
        }
      >
        <CardHome
          icon={<AiOutlineShop />}
          text="+5k"
          soutext="Produit"
          activeMenu={activeMenu}
          fromColor="cyan-400"
          toColor="blue-600 "
        />
        <CardHome
          icon={<BsFillPersonFill />}
          text="+220k"
          soutext="Client"
          activeMenu={activeMenu}
          fromColor="teal-400"
          toColor="lime-400"
        />
        <CardHome
          icon={<AiOutlineBulb />}
          text="145"
          soutext="Marque"
          activeMenu={activeMenu}
          fromColor="yellow-400"
          toColor="lime-400"
        />
        <CardHome
          icon={<BiDollarCircle />}
          text="5M"
          soutext="Ventes"
          activeMenu={activeMenu}
          fromColor="orange-300"
          toColor="orange-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-2">
        
   
        <ChartBar />

        <ChartPie/>
        <ChartArea />
      </div>
    </div>
  );
};

export default Home;
