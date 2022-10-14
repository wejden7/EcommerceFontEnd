import { useState } from "react";
export default function useFilesInput(multiple) {
    const [url, setUrl] = useState([]);
    const [file, setFile] = useState([]);
  const reset = () => {
    setUrl([]);
    setFile([]);
  };
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
  return [url,file, bind, reset,setUrl,setFile];
}

/*import { useState } from "react";
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
}*/