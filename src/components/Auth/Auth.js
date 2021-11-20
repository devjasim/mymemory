import React, { Fragment, useState } from "react";
import styles from "./authStyles";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import Input from "./Input";
import { GoogleLogin } from "react-google-login";
import Icon from "./Icon";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { signin, signup } from "../../actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const classes = styles();

  const dispatch = useDispatch();

  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const [formData, setFormData] = useState(initialState);

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const googleSuccess = (res) => {
    console.log(res);
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });

      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = () => {
    console.log("GOOGLE Sign In was unsuccessfull. Try again later");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography variant="h5">
          {" "}
          {isSignup ? "Sign Up" : "Sign In"}{" "}
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <Fragment>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  type="text"
                  autofocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  type="text"
                  half
                />
              </Fragment>
            )}

            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />

            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />

            {isSignup && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>

          <GoogleLogin
            clientId="732960774937-9dm36clu457k26uugmlg0c1vluold56h.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                fullWidth
                color="primary"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Login With Google
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {" "}
                {isSignup
                  ? "Already have an account ? Sign In"
                  : "Don't have an account? Sign Up"}{" "}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
