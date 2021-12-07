import React, { useEffect } from "react";
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
import axios from "axios";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selectors";

const MyEvaluationPage = () => {
  const [myEvaluations, setmyEvaluations] = React.useState([]);

  const { access } = useSelector(selectCurrentUser);

  useEffect(() => {
    const fetchMyEvaluationAsync = async () => {
      axios
        .get(`${process.env.REACT_APP_API_URL_API}/received_evals/`, {
          headers: {
            Authorization: `JWT ${access}`,
          },
        })
        .then((res) => {
          setmyEvaluations(res.data);
        });
    };
    fetchMyEvaluationAsync();
  }, [access]);

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
          {myEvaluations.map((item, index) => (
            <EvaluationItem
              key={index}
              weekDate={`Week ${item.week} ⏰${item.created_at}`}
              tasks={item.tasks}
              evaluations={item.evaluations}
            />
          ))}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default MyEvaluationPage;
