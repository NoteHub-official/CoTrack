import TodoList from "../Todo/TodoList";
import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
const LandingPage = () => {
  return (
    <Grid
      container
      width="100%"
      height="100%"
      spacing={0}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <TodoList />
      </Grid>
    </Grid>
  );
};

export default LandingPage;
