import React,{createContext,useContext,useState ,useEffect} from 'react'
import {getAll as getAllSousSousCategorie} from '../../../service/sousSousCategorie.service'
import {getAll as getAllForniseur} from '../../../service/forniseur.service'
import {getAll as getAllMarque} from '../../../service/marque.service'
import useTextInput from '../../../hooks/textInput'
import useImagesInput from '../../../hooks/imagesInput'
import {create,getAll as getAllProduit,deleteById}from '../../../service/produit'
import{isEmpty,isNumber,isDouble}from "../../../validateur/validator"

const StateContext = createContext();
const NavSechma = [
    {
      label: "Dashbored",
      link: "dashbored",
    },
    {
      label: "produit",
      link: "dashbored/produit",
    },
  ];
  const Error={
    name:"",
    prix:"",
    tva:"",
    quantity:"",
    categorie:"",
    forniseur:"",
    marque:"",
  }
  const ErrorDescription ={
    title:"",
    body:""
  }
export const ContextProviderProduit  =({children}) => {
    const [openNewForm,setOpenNewForm]=useState(false)
    const [openProduit,setOpenProdui]=useState(false)
    const [nav,setNav]=useState(NavSechma)
    const [error,setError]=useState(Error)
    const [errorDescription,setErrorDescription]=useState(ErrorDescription)
    const [formValidDescription ,setFormValidDescription ]=useState(false)
    const [addClicked,setAddClicked]=useState(false)
    const [formValid,setFormValid]=useState(false)
    const [saveClicked,setSaveClicked]=useState(false)
    const [categorie,setCategorie]=useState([])
    const [forniseur,setForniseur]=useState([])
    const [marque,setMarque]=useState([])
    const [Produit,setProduit]=useState([])
    const [Produits,setProduits]=useState([])
    const [categorieSelect,bindcategorieSelect,resetcategorieSelect,setcategorieSelect,] = useTextInput("");
    const [forniseurSelect,bindForniseurSelect,resetForniseurSelect,setForniseurSelect,] = useTextInput("");
    const [marqueSelect,bindmarqueSelect,resetmarqueSelect,setmarqueSelect,] = useTextInput("");
    const [name,bindName,resetName,setName,] = useTextInput("");
    const [prix,bindPrix,resetPrix,setPrix,] = useTextInput("");
    const [tva,bindTva,resetTva,srtTva,] = useTextInput("");
    const [quantity,bindQuantity,resetQuantity,setQuantity,] = useTextInput("");
    const [titelDescription,bindtitelDescription,resettitelDescription,settitelDescription,] = useTextInput("");
    const [bodyDescription,bindbodyDescription,resetbodyDescription,setbodyDescription,] = useTextInput("");
    const [description,setDescription,] = useState([]);
    const [clickedUpdateDescription,setClickedUpdateDescription,] = useState(false);
    const [indexDescription,setIndexDescription,] = useState('');
    const[file,image,imageName, bindimage, resetimage,]=useImagesInput()

    const resetForm =()=>{
        resetcategorieSelect()
        resetForniseurSelect()
        resetmarqueSelect()
        resetName()
        resetPrix()
        resetQuantity()
        resetTva()
        setDescription(l=>[])
        setClickedUpdateDescription(false)
        resettitelDescription()
        resetbodyDescription()
        setIndexDescription("")
        resetimage()
        setSaveClicked(false)
        
    }


    useEffect(()=>{
        getCategorie();
        getForniseur();
        getMarque();
        findAllProduit();

    },[])

    useEffect(()=>{
        setError((l)=>({...l,name:isEmpty(name)?"Name is required":""}))

    },[name])
    useEffect(()=>{
        setError((l)=>({...l,prix:isEmpty(prix)?"Prix is required":isDouble(prix)?"":"Prix must double number"}))

    },[prix])
    useEffect(()=>{
        setError((l)=>({...l,tva:isEmpty(tva)?"Tva is required":isDouble(tva)?"":"Tva must double number"}))


    },[tva])
    useEffect(()=>{
        setError((l)=>({...l,quantity:isEmpty(quantity)?"quantity is required":isNumber(quantity)?"":"Quantity must number"}))
      

    },[quantity])
    useEffect(()=>{
        setError((l)=>({...l,categorie:isEmpty(categorieSelect)?"categorie is required":""}))

    },[categorieSelect])
    useEffect(()=>{
        setError((l)=>({...l,forniseur:isEmpty(forniseurSelect)?"forniseur is required":""}))

    },[forniseurSelect])
    useEffect(()=>{
       
        setError((l)=>({...l,marque:isEmpty(marqueSelect)?"marque is required":""}))

    },[marqueSelect])

    useEffect(()=>{
        setErrorDescription((l)=>({...l,title:isEmpty(titelDescription)?"titel is required":""}))

    },[titelDescription])
    useEffect(()=>{
        setErrorDescription((l)=>({...l,body:isEmpty(bodyDescription)?"description is required":""}))

    },[bodyDescription])

    useEffect(()=>{
        if(isEmpty(titelDescription)||isEmpty(bodyDescription)){
            setFormValidDescription(false)
        }else{
            setFormValidDescription(true)
        }
    },[errorDescription])

    useEffect(()=>{
     
       resettitelDescription()
        resetbodyDescription()
        setClickedUpdateDescription(false)
        setIndexDescription('')
        setAddClicked(false)
        setFormValidDescription(false)
    },[description])

    useEffect(()=>{
        console.log(error)
        if(isEmpty(name)||isEmpty(tva)||isEmpty(prix)||isEmpty(quantity)||isEmpty(categorieSelect)||isEmpty(forniseurSelect)||isEmpty(marqueSelect)){
            setFormValid(false)
        }else if(isDouble(prix)||isDouble(tva)||isNumber(quantity)){
            setFormValid(true)

        }else{
            setFormValid(false)
        }
      
    },[error])


    const openCloseForm=()=>{
        setOpenNewForm(!openNewForm)
    }

    const openDetailProduit =(item)=>{
        setProduit(item)
        setOpenProdui(true)
    }
    const pushDescription =()=>{
        setAddClicked(true)
        var item={
            title:titelDescription,
            description:bodyDescription
        }
        if(formValidDescription)
        setDescription((l)=>[...l,item])
    }
    const removeDescription =(_)=>{
        var newarray = description.filter(item=>item!==_)
        setDescription((l)=>newarray)
    }
    const updateDescriptionCliked =(_,i)=>{
        setClickedUpdateDescription(true)
        setIndexDescription(i)
        settitelDescription(_.title)
        setbodyDescription(_.description)
     
      
    }
    const updateDescription =()=>{
        console.log(indexDescription)
        setAddClicked(true)
        if(formValidDescription){
            var newArray = description.map((item,index)=>{
                if(index===indexDescription){
                    return{...item,title:titelDescription,description:bodyDescription}
                }
                return item;
            })
            console.log(newArray)
            setDescription((l)=>newArray)
            
        }
       
      
    }
    const getCategorie = async () =>{
        await getAllSousSousCategorie()
                .then((result)=>{
                    setCategorie(result.categories)
                 

                }).catch((error)=>{

                })
    }
    const getForniseur= async () =>{
        await getAllForniseur()
                .then((result)=>{
                    setForniseur(result.data.data)

                }).catch((error)=>{
                    
                })
    }
    const getMarque = async () =>{
        await getAllMarque()
                .then((result)=>{
                    setMarque(result.data.data)
                   
                }).catch((error)=>{
                    
                })
    }

    const createProduit = async()=>{
        console.log(true)
        console.log(description)
        setSaveClicked(true) 
        console.log(formValid)

        if(formValid){
            await create(name,prix,quantity,tva,categorieSelect,marqueSelect,forniseurSelect,description,image,function (progressEvent){
                const {loaded,total}=progressEvent;
                let precent = Math.floor((loaded*100)/total);
                console.log(precent)
            })
                    .then((result)=>{
                        findAllProduit()
                        resetForm()
    
                    }).catch((error)=>{
                        console.log(error.response.data.message)
                        if(error.response.data.message==="exist"){
                            setError((l)=>({...l,name:"Name is Exist"}))
    
                        }
    
                    })
        }
      

    }

    const findAllProduit =async()=>{
        await getAllProduit()
            .then((result)=>{
                console.log(result)
                setProduits(result.data.result)

            }).catch((error)=>{
                setProduits([])

            })
    }

    const deleteProduitById = async (id)=>{
        await deleteById(id)
                .then((result)=>{
                    console.log(result)
                    findAllProduit()

                }).catch((error)=>{
                    console.log(error)

                })
    }

return(
  <StateContext.Provider value={{Produit,openProduit,openDetailProduit,deleteProduitById,Produits,openNewForm,openCloseForm,resetForm,addClicked,errorDescription,saveClicked,error,description,file,bindimage,nav,categorie,forniseur,marque,bindcategorieSelect,bindForniseurSelect,bindmarqueSelect,bindName,bindPrix,bindQuantity,bindTva,bindtitelDescription,bindbodyDescription,pushDescription,removeDescription,updateDescription,updateDescriptionCliked,clickedUpdateDescription,createProduit}}>
    {children}
  </StateContext.Provider>  )
}

export const UseStateContextProduit= ()=>useContext(StateContext)


/*

    Décrire une personne, c'est parler de son physique et de son caractère. 
    Parler du physique d'une personne, c'est indiquer ses traits physiques.
    Parler du caractère d'une personne, c'est indiquer sa manière d'être. 
    Pour tout cela, il y a plusieurs adjectifs qui ont une forme masculine et une forme féminine.

*/