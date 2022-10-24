import React,{memo,useState} from 'react'
import {useSelector,useDispatch} from "react-redux"
import {selectProduitById,deleteProduit} from '../../page/dashbored/pages/produit/produitSlice'
import {Image} from '../'
import {Link} from 'react-router-dom'
import {AiOutlineDelete,AiOutlineUnorderedList,AiOutlineEyeInvisible,AiOutlineEye} from "react-icons/ai"

const CardProduit = ({id})=>{
    const dispatch = useDispatch();
  
    const produit = useSelector((state)=>selectProduitById(state,id))

    const [visible,setVisible] = useState(false);
    const changesVisible = ()=>{
        console.log(visible)
        setVisible(!visible)
    }
    const deleteProduitFunction = () => {
        try {
          dispatch(
            deleteProduit({
              id: produit._id
            })
          ).unwrap();
    
         
        } catch (err) {
          console.error("Faild to save the post", err);
        }
      };
    console.log(produit)
    return(
        <div className='bg-white w-full '>
            <Image src={"/images/"+produit.images[0]?.url} alt={produit.name} h="52" w="full"/>
            <div className='grid gap-1 divide-y'>
                <div className='grid gap-1'>
                    <p className='font-medium text-blue-700 ml-2 mt-2 capitalize truncate tracking-wider'>{produit.name}</p>
                    <p className='text-end mr-2 font-bold text-red-500'>{produit.prix} <sub className='align-top text-gray-500 text-sx'>TND</sub> </p>
                </div>

                <div className='flex justify-around py-2 '>
                    <div className='text-lg hover:scale-125 hover:cursor-pointer hover:text-blue-500 ' onClick={changesVisible}>{visible ?< AiOutlineEye /> : <AiOutlineEyeInvisible/>}</div>
                    <div className='text-lg hover:scale-125 hover:cursor-pointer'><Link to={produit._id}><AiOutlineUnorderedList/></Link></div>
                    <div className='text-lg hover:scale-125 hover:cursor-pointer hover:text-red-500' onClick={deleteProduitFunction}><AiOutlineDelete/></div>
                </div>
            </div>
        </div>
    )

}

export default  CardProduit;