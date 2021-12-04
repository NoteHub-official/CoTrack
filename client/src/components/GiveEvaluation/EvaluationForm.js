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
          <ThumbUpOffAltIcon
            color="primary"
            sx={{ height: "70px", width: "70px" }}
          />
          <ThumbDownOffAltIcon
            color="secondary"
            sx={{ height: "70px", width: "70px" }}
          />
          <Paper elevation={3} sx={{ width: "100%" }}>
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
                <TodoList readOnly />
              </Grid>
            </Grid>
          </Paper>
          <Typography variant="h5" gutterBottom align="left">
            Do you like to work with {name} ?
          </Typography>
          <Box mt={5}>
            <HoverRating />
          </Box>
          <Typography variant="h5" gutterBottom align="left">
            Any Comment for {name}?
          </Typography>
          <TextField
            id="outlined-multiline-static"
            fullWidth
            label="Comment"
            multiline
            rows={4}
            defaultValue="Good work~"
          />
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
