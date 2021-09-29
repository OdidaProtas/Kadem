import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import useStyles from "./OtpVerificationForm.styles";
import OtpInput from "react-otp-input";
import { LoadingBtnComponent, LogoComponent } from "..";
import { Button } from "@mui/material";
import { useAxiosRequest } from "../../hooks";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
};

interface OtpVerificationFormInterface {
  open: boolean;
  toggle: any;
  phone: any;
  snackBarHandler: any;
  handleError: any;
}

export default function OtpVerificationForm({
  open,
  toggle,
  phone,
  snackBarHandler,
  handleError,
}: OtpVerificationFormInterface) {
  const classes = useStyles();
  const [state, setState] = useState({ otp: "" });
  const [err, setError] = useState(false);
  const handleChange = (otp: any) => setState({ otp } as any);
  const history = useHistory();

  const { processRequest, data, loading, error } = useAxiosRequest();

  const requestOptions: any = {
    method: "post",
    context: "registration",
    isAuthenticated: false,
    endpoint: "/auth/verify/",
  };

  const payload = {
    code: state.otp,
    phone: phone,
  };

  const handleSuccess = () => history.push("/login");

  const handleSubmit = () => {
    if (state.otp.length === 6) {
      processRequest({
        ...requestOptions,
        payload: payload,
        errorHandler: handleError,
        successHandler: handleSuccess,
      });
    } else {
      setError(true);
    }
  };

  const resendOptions: any = {
    method: "post",
    context: "registration",
    isAuthenticated: false,
    endpoint: "/auth/verify/",
    payload: {
      phone: phone,
    },
  };

  const requestResendOptions = () => {
    processRequest({ ...resendOptions, toggleSnackBar: snackBarHandler });
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={toggle}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} className={classes.root}>
            <div className={classes.logoContainer}>
              <LogoComponent />
            </div>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Verify phone number
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              A six digit code has been sent to your number. Please Verify the
              code to continue
            </Typography>
            <div className={classes.formContainer}>
              <OtpInput
                value={state.otp}
                onChange={handleChange}
                numInputs={6}
                separator={<span>-</span>}
                inputStyle={inputStyles}
              />
            </div>
            {loading ? (
              <div className={classes.loadingBtnContainer}>
                <LoadingBtnComponent />
              </div>
            ) : (
              <Button
                variant="contained"
                fullWidth
                size="small"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            )}

            <div className={classes.resendOtpBtn}>
              <ResetOtpBtn resend={requestResendOptions} />
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

const inputStyles = {
  height: "50px",
  width: "50px",
};

interface ResendBtnInterface {
  resend: any;
}

const ResetOtpBtn = ({ resend }: ResendBtnInterface) => {
  const [state, setState] = useState(60);

  const { processRequest, data, loading, error } = useAxiosRequest();

  const requestOptions: any = {
    method: "post",
    context: "registration",
    isAuthenticated: false,
    endpoint: "/auth/verify/resend/",
  };

  const payload = {
    phone: "",
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (state > 0) {
        setState((prevState) => prevState - 1);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [state]);

  const handleResend = () => {
    resend();
  };

  return (
    <Button onClick={handleResend} fullWidth size="small" disabled={state > 0}>
      {state > 0 ? `Resend in ${state} Seconds` : "Resend Code"}
    </Button>
  );
};
