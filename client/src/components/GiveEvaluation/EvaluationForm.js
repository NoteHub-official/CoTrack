import React from "react";
import HoverRating from "./HoverRating";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@material-ui/core/Button";
import Box from "@mui/material/Box";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import TodoList from "../Todo/TodoList";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

const EvaluationForm = (props) => {
  const name = "Kuke";
  const tasks = [
    {
      task: "Learn ReactReactReactReactReactReactReactReact",
      completed: true,
      secondary: "2 days left",
    },
    { task: "Learn Redux", completed: false, secondary: "Redux is awesome" },
    { task: "Learn GraphQL", completed: false },
  ];
  const todos = [
    {
      task: "Llass other than those in CS major? Learn Do I need to take CS 361 as I already have MATH461? Can I take other advanced composition class other than those in CS major?",
      completed: true,
      secondary: "2 days left",
    },
    {
      task: "Learn earn Reduearn Redu",
      completed: false,
      secondary: "Redux is awesome",
    },
    { task: "Learn GraphQLGraphQLGraphQLGraphQL", completed: false },
  ];

  return (
    <React.Fragment>
      <Grid
        container
        direction="column"
        spacing={3}
        alignItems="center"
        justifyContent="center"
        sx={{ width: "100%" }}
      >
        <Grid item sx={{ minWidth: 500 }}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            sx={{ mb: 2 }}
          >
            <ThumbUpOffAltIcon
              color="primary"
              sx={{ height: "70px", width: "70px" }}
            />
            <ThumbDownOffAltIcon
              color="secondary"
              sx={{ height: "70px", width: "70px" }}
            />
          </Grid>

          <Paper elevation={3} sx={{ width: "100%", mb: 5 }}>
            <Typography
              component="div"
              align="left"
              sx={{ padding: 2, fontSize: "1.2em" }}
            >
              This week, {name} worked on following tasks:
            </Typography>
            <Divider />

            <Grid
              container
              width="100%"
              height="100%"
              spacing={0}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <TodoList readOnly todos={todos} assignmentIcon />
              </Grid>
            </Grid>
          </Paper>

          <Paper elevation={3} sx={{ width: "100%", mb: 5 }}>
            <Typography
              component="div"
              align="left"
              sx={{ padding: 2, fontSize: "1.2em" }}
            >
              Do you like to work with {name} ?
            </Typography>
            <Divider />
            <Grid
              container
              width="100%"
              height="100%"
              spacing={0}
              alignItems="center"
              justifyContent="center"
            >
              <HoverRating />
            </Grid>
          </Paper>

          <Paper elevation={3} sx={{ width: "100%" }}>
            <Typography
              component="div"
              align="left"
              sx={{ padding: 2, fontSize: "1.2em" }}
            >
              Do you have any comments for {name}?
            </Typography>
            <Grid
              container
              width="100%"
              height="100%"
              spacing={0}
              alignItems="center"
              justifyContent="center"
            >
              <TextField
                id="outlined-multiline-static"
                fullWidth
                label="Comment"
                multiline
                rows={4}
              />
            </Grid>
          </Paper>
          <Box
            sx={{
              mt: "2rem",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              height: 10,
              display: "flex",
              padding: 5,
            }}
          >
            <Button variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default EvaluationForm;
