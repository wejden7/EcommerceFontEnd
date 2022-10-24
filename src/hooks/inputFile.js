import { useState } from "react";
export default function useFilesInput(multiple) {
    const [url, setUrl] = useState([]);
    const [file, setFile] = useState([]);
  const reset = () => {
    setUrl([]);
    setFile([]);
  };
  const deleteByIndex = (index) =>{
    
    const newFile = file.filter((_,i)=>i!== index)
    const newUrl = url.filter((_,i)=>i!== index)
    console.log(newFile)
    setUrl(newUrl)
    setFile(newFile)

  }
  const bind = {
    file,
    onChange: (e) => {
      if(!multiple){
        setFile(l=>[]);
        setUrl(l=>[]);
      }

        for (let item of e.target.files){
          
                setFile(l=>[...l,item]);
                const url = URL.createObjectURL(item);
                setUrl(l=>[...l,url]);
            
        }
        
          e.target.value = null;
    },
  };
  return [url,file, bind, reset,deleteByIndex,setUrl,setFile];
}

