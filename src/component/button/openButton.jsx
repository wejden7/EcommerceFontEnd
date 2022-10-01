import React from 'react'
import Tooltip from "@mui/material/Tooltip";

const OpenButton = ({ title, customFunc, icon }) => {
    return(
        <Tooltip title={title} position="BottomCenter">
            <button
                type="button"
                onClick={customFunc}
                className="relative text-xl border  rounded p-1 bg-white text-blue-700   hover:bg-blue-700  hover:border-white hover:text-white"
            >
                {icon}
            </button>
            </Tooltip>
)
}


export default OpenButton