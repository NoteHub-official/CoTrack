import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@mui/material/Hidden";
import EvaluationForm from "./EvaluationForm";
import AssignedEvaluationItem from "./AssignedEvaluationItem";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  itemContainer: {
    "&::-webkit-scrollbar": {
      width: 0,
      background: "transparent",
    },
  },
}));

const GiveEvaluationPage = () => {
  const [receivedEvaluations, setReceivedEvaluations] = React.useState([]);

  const [value, setValue] = React.useState(0);

  const { access } = useSelector(selectCurrentUser);

  useEffect(() => {
    const fetchEvaluationAsync = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_API}/current_week/`,
        {
          headers: {
            Authorization: `JWT ${access}`,
          },
        }
      );
      axios
        .get(
          `${process.env.REACT_APP_API_URL_API}/assigned_evals/?week=${response.data}`,
          {
            headers: {
              Authorization: `JWT ${access}`,
            },
          }
        )
        .then((res) => {
          setReceivedEvaluations(res.data);
        });
    };
    fetchEvaluationAsync();
  }, [access]);

  const setCompleted = (id, rating, content) => {
    const newReceivedEvaluations = receivedEvaluations.map((evaluation) => {
      if (evaluation.id === id) {
        evaluation.completed = true;
        evaluation.rating = rating;
        evaluation.content = content;
      }
      return evaluation;
    });
    setReceivedEvaluations(newReceivedEvaluations);
  };

  const handleClick = (newValue) => {
    setValue(newValue);
  };
  const determineName = () => {
    if (!receivedEvaluations[value]) {
      return "Unknown";
    }
    return receivedEvaluations[value].evaluated_user.first_name
      ? receivedEvaluations[value].evaluated_user.username
      : receivedEvaluations[value].evaluated_user.username;
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
            {receivedEvaluations.map((evaluation, index) => {
              const {
                evaluated_user,
                completed,

                created_at,
              } = evaluation;
              const { role, photo, username, first_name, last_name } =
                evaluated_user;
              return (
                <Grid item key={index}>
                  <AssignedEvaluationItem
                    index={index}
                    name={
                      first_name && last_name
                        ? `${first_name} ${last_name}`
                        : username
                    }
                    date={created_at}
                    role={role}
                    image={photo}
                    handleClick={handleClick}
                    completed={completed}
                  />
                  <Divider />
                </Grid>
              );
            })}
          </List>
        </Grid>
        <Divider orientation="vertical" variant="middle" flexItem />
      </Hidden>

      <Grid item flexGrow={1} style={{ maxHeight: "100%" }}>
        <EvaluationForm
          taskList={
            receivedEvaluations[value]
              ? receivedEvaluations[value].task_list
              : []
          }
          initContent={
            receivedEvaluations[value]
              ? receivedEvaluations[value].content
              : null
          }
          initRating={
            receivedEvaluations[value] ? receivedEvaluations[value].rating : 0
          }
          name={determineName()}
          evaluationId={
            receivedEvaluations[value] ? receivedEvaluations[value].id : -1
          }
          setCompleted={setCompleted}
        />
      </Grid>
    </Grid>
  );
};

export default GiveEvaluationPage;
