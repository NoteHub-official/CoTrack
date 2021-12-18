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
    minWidth: "8em",
    maxWidth: "8em",
    minHeight: "2em",
    maxHeight: "2em",
  },
  button: {
    color: theme.palette.primary.main,
    fontFamily: "Arial",
    fontSize: "0.8em",
    fontWeight: "bold",
  },
}));

export default function AssignedEvaluationItem(props) {
  const { name, date, role, image, handleClick, completed, index } = props;
  const classes = useStyles();

  const clickHandler = () => {
    handleClick(index);
  };
  return (
    <Paper sx={{ p: 2, maxWidth: 500, flexGrow: 1 }} elevation={0}>
      <Grid container spacing={2} direction="row" justifyContent="center">
        <Grid item>
          {image ? (
            <Img alt="complex" src={image} sx={{ borderRadius: 50, width: 80 }} />
          ) : (
            <div
              style={{
                width: 40,
                height: 40,
                backgroundColor: "#1fb6ff",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" color="white">
                {name[0].toUpperCase()}
              </Typography>
            </div>
          )}
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs>
            <Grid item container xs>
              <Grid item>
                <Typography gutterBottom variant="subtitle1" className={classes.typography}>
                  {name}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container>
              <Typography variant="body2" gutterBottom>
                {date}
              </Typography>
            </Grid>
            <Grid item container>
              <Typography variant="body2" color="text.secondary">
                {role}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              justifyContent="space-between"
              direction="column"
              sx={{ height: "100%" }}
            >
              <Grid item>
                {completed ? (
                  <Typography gutterBottom variant="subtitle1" color="green" align="center">
                    Completed
                  </Typography>
                ) : (
                  <Typography gutterBottom variant="subtitle1" color="red" align="center">
                    Incompleted
                  </Typography>
                )}
              </Grid>
              <Grid item>
                <Button
                  className={classes.button}
                  onClick={clickHandler}
                  variant="outlined"
                  color="primary"
                  size="small"
                >
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
