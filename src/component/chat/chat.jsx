import React from 'react';
import { Button } from '../';
import { MdOutlineCancel } from 'react-icons/md';
import { chatData } from '../../data/dummy';
import { UseStateContext } from '../../contexts/contextProvider';

const Chat =()=>{
    const { currentColor } = UseStateContext();
    return(
        <div className="z-[10000] bg-white  absolute right-5  md:right-52 top-16 dark:bg-[#42464D] p-8 rounded-lg w-96">
            <div className="flex justify-between  items-center">
            <div className="flex gap-3 " >
                <p  className="font-bold text-lg dark:text-gray-200">Messages</p>  
                <button type="button" className="text-white  text-xs rounded  px-2 bg-orange-400">
                5 New</button>
            </div>
              
            <Button
            icon={<MdOutlineCancel/>}
            color="rgb(153, 171, 180)"
            bgHoverColor="light-gray"
            borderRadius="50%"
            />
            </div>
            <div>
                {
                    chatData.map((item, index) => (
                        <div className=" flex items-center gap-5 border-b-1 border-color leading-8 cursor-pointer p-3" >
                          <div className='relative'>
                            <img 
                                className='rounded-full h-10 w-10'
                                src={item.image}
                                alt={item.message}/>
                          </div>
                          <div>
                            <p className="font-semibold dark:text-gray-200 ">{item.message}</p>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">{item.desc}</p>
                            <p className="text-gray-500 dark:text-gray-400 text-xs">{item.time}</p>
                          </div>
                        </div>
                    ))
                }
                <div className="mt-5">
          <Button
            color="white"
            bgColor={currentColor}
            text="See all messages"
            borderRadius="10px"
            width="full"
          />
        </div>
            </div>
            
        </div>
    )

}

export default Chat;