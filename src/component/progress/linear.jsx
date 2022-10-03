import React from 'react'
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
const Linear = ({loding,value})=>(loding && (
    <Box
      className=" w-full "
      sx={{ display: "flex", alignItems: "center" }}
    >
      <Box sx={{ width: "100%" }}>
        <LinearProgress variant="determinate" value={value} />
      </Box>
    </Box>
  ))


export default Linear;