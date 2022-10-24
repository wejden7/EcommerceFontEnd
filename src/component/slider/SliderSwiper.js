import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Image } from "../";
// import required modules
import { Keyboard, Pagination, Navigation } from "swiper";

import {AiOutlineDelete} from 'react-icons/ai'

import { useDispatch } from "react-redux";
import { supprumeImage } from "../../page/dashbored/pages/produit/produitSlice";
const SliderSwiper = ({ data,id }) => {
  const dispatch = useDispatch();
  const handleDelete = (_id) => {

    const initialProduit = {id_produit:id,id_image:_id};
    try {
      dispatch(supprumeImage(initialProduit)).unwrap();
     
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Keyboard, Pagination, Navigation]}
        className="w-full h-full"
      >
        {data.map((image, index) => (
          <SwiperSlide key={index} className="group">
            <Image src={"/images/" + image.url} w="full" h="52" />
            <div className="z-50 absolute top-1 flex justify-center w-full">
              <div onClick={()=>handleDelete(image._id)} className="h-10 w-10  group-hover:bg-opacity-50 bg-white  group-hover:shadow-md shadow-red-800/100 bg-opacity-0  rounded-full grid place-items-center transition ease-in-out  group-hover:translate-y-3   duration-300 cursor-pointer">
                  <AiOutlineDelete className="z-50 text-lg text-red-500 opacity-0 group-hover:opacity-100"/>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
export default SliderSwiper;
