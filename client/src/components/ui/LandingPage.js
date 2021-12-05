import TodoList from "../Todo/TodoList";
import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
const LandingPage = () => {
  const todos = [
    {
      task: "Learn Do I need to take CS 361 as I already have MATH461? Can I take other advanced composition class other than those in CS major? Learn Do I need to take CS 361 as I already have MATH461? Can I take other advanced composition class other than those in CS major? Learn Do I need to take CS 361 as I already have MATH461? Can I take other advanced composition class other than those in CS major? Learn Do I need to take CS 361 as I already have MATH461? Can I take other advanced composition class other than those in CS major?",
      completed: true,
      secondary: "2 days left",
    },
    { task: "Learn Redux", completed: false, secondary: "Redux is awesome" },
    { task: "Learn GraphQL", completed: false },
  ];

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
        <TodoList todos={todos} />
      </Grid>
    </Grid>
  );
};

export default LandingPage;
