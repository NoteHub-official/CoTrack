import React from "react";
import Grid from "@mui/material/Grid";
import Login from "../Login/Login";
const LoginPage = (props) => {
  return (
    <Grid
      container
      sx={{
        display: "flex",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2a2a2b",
      }}
    >
      <Grid item>
        <Login />
      </Grid>
    </Grid>
  );
};

export default LoginPage;
