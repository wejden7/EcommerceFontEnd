import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
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
const InputSelect = ({ titel, bind, data, error, SubmitCliked, search }) => {
  return (
    <FormControl className="border w-full rounded" size="small">
      <Select
        placeholder={titel}
        className="bg-white "
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
          <MenuItem disabled={true} value="">
            <em className="text-gray-400">{titel}</em>
          </MenuItem>
        )}
        {data.map((name) => (
          <MenuItem key={name._id} value={name._id}>
            <div className="flex items-center">
              {(name.icon || name.logo) && (
                <img
                  src={
                    name.icon
                      ? "https://shope7.herokuapp.com/icons/" + name.icon
                      : name.logo
                      ? "https://shope7.herokuapp.com/logos/" + name.logo
                      : ""
                  }
                  alt="icon"
                  className="w-4 h-4 mr-2 text-white"
                />
              )}
              {name.name || name.label}
            </div>
          </MenuItem>
        ))}
      </Select>
      {SubmitCliked && (
        <p className="text-right text-xs text-red-500">{error}</p>
      )}
    </FormControl>
  );
};

export default InputSelect;
