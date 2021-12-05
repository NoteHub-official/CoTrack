import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@mui/material/Hidden";
import EvaluationForm from "./EvaluationForm";
import AssignedEvaluationItem from "./AssignedEvaluationItem";

const useStyles = makeStyles((theme) => ({
  itemContainer: {
    "&::-webkit-scrollbar": {
      width: 0,
      background: "transparent",
    },
  },
}));

const GiveEvaluationPage = () => {
  const receivedEvaluations = [
    {
      name: "Shina Mashiro",
      date: "2021-01-01",
      role: "Backend",
      image: "https://i.pravatar.cc/120?img=1",
    },
    {
      name: "Brian Yin",
      date: "2021-01-01",
      role: "Frontend",
      image: "https://i.pravatar.cc/120?img=2",
    },
    {
      name: "Allen Gao",
      date: "2021-01-01",
      role: "What the heck",
      image: "https://i.pravatar.cc/120?img=3",
    },
    {
      name: "Peiran Wnag",
      date: "2021-01-01",
      role: "What the heck",
      image: "https://i.pravatar.cc/120?img=4",
    },
    {
      name: "其德隆东墙",
      date: "2021-01-01",
      role: "What the heck",
      image: "https://i.pravatar.cc/120?img=5",
    },
    {
      name: "其德隆东a",
      date: "2021-01-01",
      role: "What the heck",
      image: "https://i.pravatar.cc/120?img=5",
    },
    {
      name: "其德隆东b",
      date: "2021-01-01",
      role: "What the heck",
      image: "https://i.pravatar.cc/120?img=5",
    },
  ];

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleClick = (newValue) => {
    setValue(newValue);
  };

  return (
    <Grid
      container
      direction="row"
      style={{ maxHeight: "100vh" }}
      alignItems="flex-start"
    >
      <Hidden lgDown>
        <Grid item justifyContent="flex-start" style={{ maxHeight: "100vh" }}>
          <List
            sx={{ overflow: "auto", maxHeight: "100%", paddintg: 0, margin: 0 }}
          >
            {receivedEvaluations.map((evaluation, index) => (
              <Grid item key={index}>
                <AssignedEvaluationItem
                  name={evaluation.name}
                  date={evaluation.date}
                  role={evaluation.role}
                  image={evaluation.image}
                  handleClick={handleClick}
                />
                <Divider />
              </Grid>
            ))}
          </List>
        </Grid>
        <Divider orientation="vertical" variant="middle" flexItem />
      </Hidden>
      <Grid item flexGrow={1} style={{ maxHeight: "100%" }}>
        <EvaluationForm />
      </Grid>
    </Grid>
  );
};

export default GiveEvaluationPage;
