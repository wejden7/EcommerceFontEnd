
export const isEmail=(_)=>{
    var validRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
        if(_.toLowerCase().match(validRegex)){
           return true
        }else{
           return false
        }

    

}

export const  isNumberPhone=(_)=>{
    var validRegex =/^\(?([0-9]{2})\)?([0-9]{3})([0-9]{3})$/;
  
        if(_.match(validRegex)){
           return true
          
        }else{
            return false
        }
       
}

export const  isDouble=(_)=>{
  var validRegex =/^[0-9]+\.?[0-9]*?$/;

      if(_.match(validRegex)){
         return true
        
      }else{
          return false
      }
     
}
export const  isNumber=(_)=>{
  var validRegex =/^[0-9]*$/;

      if(_.match(validRegex)){
         return true
        
      }else{
          return false
      }
     
}

export const isEmpty =(_)=>{
  if(_.length===0){
    return true;
  }
  return false
}

export const isEmptyFile =(_)=>{
  if(!_){
    return true;
  }
  return false
}