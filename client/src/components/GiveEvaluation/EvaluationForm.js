import React from "react";
import HoverRating from "./HoverRating";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Spacer from "../ui/Spacer";
const EvaluationForm = (props) => {
  const name = "Kuke";
  return (
    <React.Fragment>
      <Grid
        xs={12}
        container
        direction="column"
        spacing={3}
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h4" gutterBottom align="left">
            Do you like to work with {name} ?
          </Typography>
          <HoverRating />

          <Typography variant="h4" gutterBottom align="left">
            Any Comment for me?
          </Typography>
          <TextField
            id="outlined-multiline-static"
            fullWidth
            label="Comment"
            multiline
            rows={4}
            defaultValue="Good work~"
          />
        </Grid>
        <Grid item></Grid>
      </Grid>
    </React.Fragment>
  );
};

export default EvaluationForm;
