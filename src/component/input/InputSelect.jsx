import React from "react";
import {isEmpty} from '../../validateur/validator'
import {Image } from '../'
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MessageError = ({msg})=> <p className="text-right h-4 text-xs text-red-500">{msg}</p>

const Error =({submit,value,titel})=>{
  if(submit)
    if(isEmpty(value))
      return <MessageError msg={`${titel} is Required`}/>
      return <MessageError msg=""/>;

}

const InputSelect = ({ titel, bind, data, value , submit, search }) => {
  console.log(data)
  return (
    <FormControl className="border w-full rounded" size="small">
      <Select
        placeholder={titel}
        className="bg-white mb-1"
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        displayEmpty
        {...bind}
        MenuProps={MenuProps}
      >
        {search ? (
          <MenuItem key={1} value="All">
            All
          </MenuItem>
        ) : (
          <MenuItem disabled={true} value="null">
            <p className="text-gray-400">{titel}</p>
          </MenuItem>
        )}
        {data.map((name) => (
          <MenuItem key={name._id} value={name._id}>
            <div className="flex items-center">
              {(name.icon || name.logo) && (
                <Image
                  src={
                    name.icon
                      ? "/icons/" + name.icon
                      : name.logo
                      ? "/logos/" + name.logo
                      : ""
                  }
                  alt="icon"
                 w={4}
                 h={4}
                />
              )}
             <p className="ml-4 tracking-wider">{name.name || name.label}</p> 
            </div>
          </MenuItem>
        ))}
      </Select>
      <Error submit={submit} value={value} titel={titel} />
    </FormControl>
  );
};

export default InputSelect;
