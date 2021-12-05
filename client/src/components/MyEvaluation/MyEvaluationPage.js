import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import TodoList from "../Todo/TodoList";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import Spacer from "../ui/Spacer";
import EvaluationItem from "./EvaluationItem";
const MyEvaluationPage = () => {
  const data = [
    {
      weekDate: "10/19/2021",
      tasks: [
        {
          task: "Task 1: Eat alot of food",
          completed: true,
          secondary: "2 days left",
        },
        {
          task: "Learn Redux",
          completed: false,
          secondary: "Redux is awesome",
        },
        { task: "Learn GraphQL", completed: false },
      ],
      avgRating: 6,
      comments: [
        {
          comment: "Eat hot123123pothot123123pothot123123pothot123123pothot123123pothot123123pot",
          rating: 1,
        },
        {
          comment: "Eat ho12312312213tpot",
          rating: 2,
        },
        {
          comment: "Eat ho123123123123213tpot",
          rating: 3,
        },
      ],
    },
    {
      weekDate: "10/10/2021",
      tasks: [
        {
          task: "Task 1: Eat alot of food",
          completed: true,
          secondary: "2 days left",
        },
        {
          task: "Learn Redux",
          completed: false,
          secondary: "Redux is awesome",
        },
        { task: "Learn GraphQL", completed: false },
      ],
      avgRating: 4,
      comments: [
        {
          comment: "Eat hotpot",
          rating: 4,
        },
        {
          comment: "Eat hotpot",
          rating: 5,
        },
        {
          comment: "Eat hotpot",
          rating: 6,
        },
      ],
    },
    {
      weekDate: "10/1/2021",
      tasks: [
        {
          task: "Task 1: Eat alot of food",
          completed: true,
          secondary: "2 days left",
        },
        {
          task: "Learn Redux",
          completed: false,
          secondary: "Redux is awesome",
        },
        { task: "Learn GraphQL", completed: false },
      ],
      avgRating: 1,
      comments: [
        {
          comment: "Eat hotpot123",
          rating: 7,
        },
        {
          comment: "Eat hotpo444t",
          rating: 8,
        },
        {
          comment: "Eat hot123123pot",
          rating: 10,
        },
      ],
    },
  ];
  console.log(data);
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
          <InsertEmoticonIcon
            color="primary"
            sx={{ height: "70px", width: "70px" }}
          />
          {data.map((item, index) => (
            <EvaluationItem
              key={index}
              weekDate={item.weekDate}
              avgRating={item.avgRating}
              tasks={item.tasks}
              comments={item.comments}
            />
          ))}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default MyEvaluationPage;
