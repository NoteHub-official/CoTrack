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
  // const receivedEvaluations = [
  //   {
  //     name: "Shina Mashiro",
  //     date: "2021-01-01",
  //     role: "Backend",
  //     image: "https://i.pravatar.cc/120?img=1",
  //   },
  //   {
  //     name: "Brian Yin",
  //     date: "2021-01-01",
  //     role: "Frontend",
  //     image: "https://i.pravatar.cc/120?img=2",
  //   },
  //   {
  //     name: "Allen Gao",
  //     date: "2021-01-01",
  //     role: "What the heck",
  //     image: "https://i.pravatar.cc/120?img=3",
  //   },
  //   {
  //     name: "Peiran Wnag",
  //     date: "2021-01-01",
  //     role: "What the heck",
  //     image: "https://i.pravatar.cc/120?img=4",
  //   },
  //   {
  //     name: "其德隆东墙",
  //     date: "2021-01-01",
  //     role: "What the heck",
  //     image: "https://i.pravatar.cc/120?img=5",
  //   },
  //   {
  //     name: "其德隆东a",
  //     date: "2021-01-01",
  //     role: "What the heck",
  //     image: "https://i.pravatar.cc/120?img=5",
  //   },
  //   {
  //     name: "其德隆东b",
  //     date: "2021-01-01",
  //     role: "What the heck",
  //     image: "https://i.pravatar.cc/120?img=5",
  //   },
  // ];
  const [receivedEvaluations, setReceivedEvaluations] = React.useState([]);

  const [value, setValue] = React.useState(0);

  const { access } = useSelector(selectCurrentUser);

  useEffect(() => {
    const fetchEvaluationAsync = async () => {
      axios
        .get(`${process.env.REACT_APP_API_URL_API}/assigned_evals/?week=${1}`, {
          headers: {
            Authorization: `JWT ${access}`,
          },
        })
        .then((res) => {
          setReceivedEvaluations(res.data);
        });
    };
    fetchEvaluationAsync();
  }, [access]);

  const setCompleted = (id) => {
    const newReceivedEvaluations = receivedEvaluations.map((evaluation) => {
      if (evaluation.id === id) {
        return { ...evaluation, completed: true };
      }
      setReceivedEvaluations(newReceivedEvaluations);
    });
  };
  
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
            {receivedEvaluations.map((evaluation, index) => {
              const {
                evaluated_user: { username, role, image },
                completed,
                created_at,
              } = evaluation;

              return (
                <Grid item key={index}>
                  <AssignedEvaluationItem
                    index={index}
                    name={username}
                    date={created_at}
                    role={role}
                    image={image}
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
          name={
            receivedEvaluations[value]
              ? receivedEvaluations[value].evaluated_user.username
              : "Unknown"
          }
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
