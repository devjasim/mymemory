import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  paper: {
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: ".5rem",
  },
  root: {
    "& .MuiTextField-root": {
      margin: ".4rem",
    },
  },
  avatar: {
    margin: ".2rem",
    backgroundColor: "#ff3d1e",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: "1rem",
  },
  submit: {
    margin: "1rem 0 1.5rem",
  },
  googleButton: {
    marginBottom: ".2rem",
  },
}));
