import { useState } from "react";
import {isNumber} from '../validateur/validator'
export default function useNumberInput({initialValue,max}) {
  const [value, setValue] = useState(initialValue);
  const reset = () => {
    setValue(initialValue);
  };
  const bind = {
    value,
    onChange: (e) => {
        const number = e.target.value;
        if(isNumber(number)&& number.length<=max){
            setValue(number);
        }
      
    },
  };
  return [value, bind, reset, setValue];
}
