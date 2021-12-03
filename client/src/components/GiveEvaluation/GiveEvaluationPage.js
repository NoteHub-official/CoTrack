import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";

import EvaluationForm from "./EvaluationForm";
import AssignedEvaluationItem from "./AssignedEvaluationItem";

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
  ];

  const [value, setValue] = React.useState(0);
  const handleClick = (newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Grid container justifyContent="flex-start" component={Box}>
        <Grid item>
          <Grid
            container
            direction="column"
            spacing={2}
            style={{ maxHeight: "100vh", overflow: "auto" }}
          >
            <List>
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
        </Grid>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Grid item>
          <EvaluationForm />
        </Grid>
      </Grid>
    </Box>
  );
};

export default GiveEvaluationPage;
