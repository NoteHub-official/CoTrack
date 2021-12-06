import React, { useState, useEffect } from "react";
import HoverRating from "./HoverRating";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@material-ui/core/Button";
import Box from "@mui/material/Box";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import TodoList from "../Todo/TodoList";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import axios from "axios";

const EvaluationForm = (props) => {
  const {
    initContent,
    name,
    initRating,
    taskList,
    evaluationId,
    setCompleted,
  } = props;
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const { access } = useSelector(selectCurrentUser);

  const patchEvaluationAsync = async () => {
    axios
      .patch(
        `${process.env.REACT_APP_API_URL_API}/assigned_evals/${evaluationId}/`,
        {
          content,
          rating,
        },
        {
          headers: {
            Authorization: `JWT ${access}`,
          },
        }
      )
      .then((res) => {
        setContent(res.data.content);
        setRating(res.data.rating);
      });
  };

  const handleCompleteSuccess = () => {
    setCompleted(evaluationId);
    patchEvaluationAsync();
  };

  useEffect(() => {
    setContent(initContent);
    setRating(initRating);
  }, [initContent, initRating]);

  return (
    <React.Fragment>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <Grid item sx={{ minWidth: 500 }}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            sx={{ mb: 2 }}
          >
            <ThumbUpOffAltIcon
              color="primary"
              sx={{ height: "70px", width: "70px" }}
            />
            <ThumbDownOffAltIcon
              color="secondary"
              sx={{ height: "70px", width: "70px" }}
            />
          </Grid>

          <Paper elevation={3} sx={{ width: "100%", mb: 5 }}>
            <Typography
              component="div"
              align="left"
              sx={{ padding: 2, fontSize: "1.2em" }}
            >
              This week, {name} worked on following tasks:
            </Typography>
            <Divider />

            <Grid
              container
              width="100%"
              height="100%"
              spacing={0}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <TodoList readOnly todos={taskList} assignmentIcon />
              </Grid>
            </Grid>
          </Paper>

          <Paper elevation={3} sx={{ width: "100%", mb: 5 }}>
            <Typography
              component="div"
              align="left"
              sx={{ padding: 2, fontSize: "1.2em" }}
            >
              Do you like to work with {name} ?
            </Typography>
            <Divider />
            <Grid
              container
              width="100%"
              height="100%"
              spacing={0}
              alignItems="center"
              justifyContent="center"
            >
              <HoverRating rating={rating} setRating={setRating} />
            </Grid>
          </Paper>

          <Paper elevation={3} sx={{ width: "100%" }}>
            <Typography
              component="div"
              align="left"
              sx={{ padding: 2, fontSize: "1.2em" }}
            >
              Do you have any comments for {name}?
            </Typography>
            <Grid
              container
              width="100%"
              height="100%"
              spacing={0}
              alignItems="center"
              justifyContent="center"
            >
              <TextField
                id="outlined-multiline-static"
                fullWidth
                label="Comment"
                multiline
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Grid>
          </Paper>
          <Box
            sx={{
              mt: "2rem",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              height: 10,
              display: "flex",
              padding: 5,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleCompleteSuccess}
            >
              Save
            </Button>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default EvaluationForm;
