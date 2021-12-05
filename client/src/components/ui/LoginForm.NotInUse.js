import React from "react";
import Spacer from "./Spacer";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
const LoginForm = (props) => {
  return (
    <Paper
      elevation={7}
      sx={{
        position: "fixed",
        width: "30%",
        height: "30%",
        top: "9%",
        left: "2.5%",
        right: "2.5%",
        button: "10%",
      }}
    >
      <Grid
        container
        direction="column"
        spacing={0}
        alignItems="center"
        justifyContent="center"
        sx={{ width: "100%", height: "100%" }}
      >
        <Grid item>
          <Typography
            component="div"
            align="left"
            sx={{ pl: 3, fontSize: "1.3em", fontWeight: 450 }}
          >
            Login
          </Typography>
        </Grid>
        <Grid item>
          <TextField id="outlined-multiline-static" label="Username" />
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item>
          <TextField id="outlined-multiline-static" label="Password" />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LoginForm;
