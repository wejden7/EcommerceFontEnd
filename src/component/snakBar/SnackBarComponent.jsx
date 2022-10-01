import React,{useState} from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import {UseStateContext} from '../../contexts/contextProvider'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBarComponent = ()=>{
   const {handleCloseSnackbar,openSnackbar, severitySnackbar, messageSnackbar} = UseStateContext()
    return (
        <div>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={severitySnackbar}
            sx={{ width: "100%" }}
          >
            {messageSnackbar}
          </Alert>
        </Snackbar>
      </div>
    )

} 

export default SnackBarComponent;