import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "@mui/material";
import { useEffect } from "react";

interface SnackBarComponentInterface {
  toggle: any;
  message: string;
  severity: any;
  open: boolean;
}

export default function SnackBarComponent({
  open,
  toggle,
  severity,
  message,
}: SnackBarComponentInterface) {
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={toggle}
        message={message}
        // action={action}
      >
        <Alert onClose={toggle} severity={severity} sx={{ width: "100%" }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </div>
  );
}
