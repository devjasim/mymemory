import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import styles from "./authStyles";

const Input = ({
  half,
  name,
  handleChange,
  autofocus,
  type,
  label,
  handleShowPassword,
}) => {
  const classes = styles();
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        autoFocus={autofocus}
        type={type}
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment edge="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : ""
        }
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
      />
    </Grid>
  );
};

export default Input;
