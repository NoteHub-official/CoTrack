import TodoList from "../Todo/TodoList";
import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
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
  const weekNumber = 1;

  return (
    <Grid
      sx={{ margin: "auto" }}
      direction="column"
      container
      width="100%"
      height="100%"
      spacing={0}
      alignItems="center"
      justifyContent="center"
    >
      <Paper sx={{ my: 5 }} elevation={3}>
        <Grid item container alignSelf="flex-start" sx={{ ml: 3.5, my: 2 }}>
          <Typography align="center" sx={{ fontSize: "1.7em" }}>
            Week {weekNumber} Tasks
          </Typography>
        </Grid>
        <Divider />
        <Grid item>
          <TodoList todos={todos} />
        </Grid>
      </Paper>
      <Grid item>
        <Button variant="contained">
          <Typography align="center" sx={{ fontSize: "1.7em" }}>
            Add New Task
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
