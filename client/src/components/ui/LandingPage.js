import TodoList from "../Todo/TodoList";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import axios from "axios";
import { Navigate } from "react-router-dom";

const LandingPage = () => {
  const [weekNumber, setWeekNumber] = useState(0);
  const [newTask, setNewTask] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [taskListId, setTaskListId] = useState(0);
  const addNewTask = (e) => {
    setNewTask(1);
  };

  const { access } = useSelector(selectCurrentUser);

  useEffect(() => {
    const fetchTasksAsync = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL_API}/current_week/`, {
        headers: {
          Authorization: `JWT ${access}`,
        },
      });
      setWeekNumber(data);

      await axios
        .get(`${process.env.REACT_APP_API_URL_API}/received_evals/`, {
          headers: {
            Authorization: `JWT ${access}`,
          },
        })
        .then((res) => {
          const currentWeekEvaluations = res.data.filter((item) => {
            return item.week === data;
          }); //data is the week we just fetched
          if (currentWeekEvaluations.length > 0) {
            const { tasks, id } = currentWeekEvaluations[0];
            setTasks(tasks);
            setTaskListId(id);
          }
        });
    };
    fetchTasksAsync();
  }, [access]);

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
          <TodoList
            todos={tasks}
            setTasks={setTasks}
            newTask={newTask}
            setNewTask={setNewTask}
            taskListId={taskListId}
          />
        </Grid>
      </Paper>
      <Grid item>
        <Button variant="contained" onClick={addNewTask}>
          <Typography align="center" sx={{ fontSize: "1.7em" }}>
            Add New Task
          </Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

export default LandingPage;
