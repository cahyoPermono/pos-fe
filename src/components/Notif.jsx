import { Snackbar } from "@material-ui/core";
import React from "react";

import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Notif = (props) => {

  const handleCloseNotif = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    props.setOpenNotif(false);
  };

  return (
    <Snackbar
      open={props.openNotif}
      autoHideDuration={3000}
      onClose={handleCloseNotif}
    >
      <Alert onClose={handleCloseNotif} severity={props.message.status}>
        {props.message.message}
      </Alert>
    </Snackbar>
  );
};

export default Notif;
