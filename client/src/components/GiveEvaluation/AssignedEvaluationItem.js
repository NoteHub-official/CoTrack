import * as React from "react";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@material-ui/core/Button";

import Spacer from "../ui/Spacer";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const useStyles = makeStyles((theme) => ({
  typography: {
    minWidth: "12em",
    maxWidth: "12em",
    minHeight: "2em",
    maxHeight: "2em",
  },
  button: {
    color: theme.palette.primary.main,
    fontFamily: "Arial",
    fontSize: "1rem",
    fontWeight: "bold",
  },
}));

export default function AssignedEvaluationItem(props) {
  const { name, date, role, image, handleClick } = props;
  const classes = useStyles();
  return (
    <Paper sx={{ p: 2, margin: "auto", maxWidth: 500, flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item>
          <Img alt="complex" src={image} />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                className={classes.typography}
              >
                {name}
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                component="div"
                minWidth="12em"
                maxWidth="12em"
                minHeight="4em"
                maxHeight="4em"
              >
                {date}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {role}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  color="green"
                  align="center"
                >
                  Completed
                </Typography>
              </Grid>
              <Grid item>
                <Spacer />
              </Grid>
              <Grid item>
                <Button className={classes.button} onClick={handleClick}>
                  Evaluate
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
