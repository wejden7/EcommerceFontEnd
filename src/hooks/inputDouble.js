import { useState } from "react";
import {isDouble} from '../validateur/validator'
export default function useDoubleInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  const reset = () => {
    setValue(initialValue);
  };
  const bind = {
    value,
    onChange: (e) => {
        const number = e.target.value;
        if(isDouble(number)||number===""){
            setValue(number);
        }
      
    },
  };
  return [value, bind, reset, setValue];
}
