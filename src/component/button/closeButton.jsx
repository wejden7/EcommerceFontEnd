import React from "react";
import Tooltip from "@mui/material/Tooltip";

const CloseButton = ({ title, customFunc, icon }) => {
  return (
    <Tooltip title={title} position="BottomCenter">
      <button
        type="button"
        onClick={customFunc}
        className="relative text-xl   rounded p-1 bg-white    hover:text-red-700  hover:border-white hover:text-white"
      >
        {icon}
      </button>
    </Tooltip>
  );
};

export default CloseButton;
