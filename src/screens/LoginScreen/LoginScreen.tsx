import { Grid } from "@mui/material";
import {
  OnboardingComponent,
  AuthenticationFormComponent,
  StyledBackground,
} from "../../components";
import * as Yup from "yup";
import phoneRegExp from "../../constants/phoneRegExp";

const LoginValidationSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(phoneRegExp, "Could not validate phone number")
    .required("Phone Number is required"),
  password: Yup.string().required("Please enter your password"),
});

const fields = [
  {
    label: "Your Phone Number",
    name: "phone",
    placeholder: "+254",
    type: "number",
  },
  {
    label: "Enter Pasword",
    name: "password",
    placeholder: "Enter Password",
    type: "password",
  },
];

const initalValues = {
  phone: "",
  password: "",
};

const requestOptions = {
  method: "post",
  context: "login",
  isAuthenticated: false,
  endpoint: "/auth/login/",
};

export default function LoginScreen() {
  return (
    <div>
      <Grid container>
        <Grid item xs={12} lg={6}>
          <OnboardingComponent />
        </Grid>
        <Grid item xs={12} lg={6}>
          <StyledBackground backgroundImage>
            <AuthenticationFormComponent
              validationSchema={LoginValidationSchema}
              context="login"
              fields={fields}
              initialValues={initalValues}
              options={requestOptions}
              title={"Sign In"}
              subtitle={"New user? Create Account"}
              btnText={"Login"}
            />
          </StyledBackground>
        </Grid>
      </Grid>
    </div>
  );
}
