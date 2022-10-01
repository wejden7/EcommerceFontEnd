import { useState } from "react";
export default function useImagesInput() {
    const [file, setFile] = useState([]);
    const [image, setimage] = useState([]);
    const [imageName, setimageName] = useState([]);
  const reset = () => {
    setFile([]);
    setimage([]);
    setimageName([])
  };
  const bind = {
    image,
    onChange: (e) => {
        console.log(e.target.files)
        for (let item of e.target.files){
          
                setimage(l=>[...l,item]);
                setimageName(l=>[...l,item.name]);
                const file = URL.createObjectURL(item);
                setFile(l=>[...l,file]);
            
        }
        
          e.target.value = null;
    },
  };
  return [file,image,imageName, bind, reset,];
}