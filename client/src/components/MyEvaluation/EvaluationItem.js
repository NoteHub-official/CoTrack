import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TodoList from "../Todo/TodoList";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Rating from "@mui/material/Rating";
import Card from "@mui/material/Card";
import Spacer from "../ui/Spacer";
import Chip from "@mui/material/Chip";
import DateIcon from "@mui/icons-material/CalendarToday";
import CommentList from "./CommentList";
const EvaluationItem = (props) => {
  const { weekDate, avgRating, tasks, comments } = props;
  console.log(weekDate, avgRating, tasks, comments);
  return (
    <Paper elevation={3} sx={{ width: "100%", mb: 5 }}>
      <Grid container alignItems="center" sx={{ py: 1.4 }}>
        <Grid item>
          <Typography
            component="div"
            align="left"
            sx={{ pl: 3, fontSize: "1.3em", fontWeight: 450 }}
          >
            Tasks
          </Typography>
        </Grid>
        <Spacer />
        <Grid item>
          <Chip
            color="primary"
            icon={<DateIcon />}
            label={weekDate}
            sx={{ padding: 2, fontSize: "1em", fontWeight: 450, mr: 3 }}
            size="small"
          />
        </Grid>
      </Grid>
      <Divider />
      <Grid
        container
        width="100%"
        height="100%"
        spacing={0}
        alignItems="center"
        justifyContent="center"
        sx={{ my: 2, px: 3 }}
      >
        <Card variant="outlined">
          <Grid item>
            <TodoList readOnly showComplete todos={tasks} />
          </Grid>
        </Card>
      </Grid>
      <Divider />
      <Grid container alignItems="center" sx={{ py: 1.4 }}>
        <Grid item>
          <Typography
            component="div"
            align="left"
            sx={{ pl: 3, fontSize: "1.3em", fontWeight: 450 }}
          >
            Evaluations
          </Typography>
        </Grid>
        <Spacer />
        <Grid item>
          <Rating
            max={10}
            value={avgRating}
            readOnly
            sx={{ padding: 0, mr: 3 }}
          />
        </Grid>
      </Grid>
      <Divider />

      <Grid
        container
        width="100%"
        height="100%"
        spacing={0}
        alignItems="center"
        justifyContent="center"
        sx={{ my: 2, px: 3 }}
      >
        <Card variant="outlined" sx={{ mb: 2 }}>
          <Grid item>
            <CommentList comments={comments} />
          </Grid>
        </Card>
      </Grid>
    </Paper>
  );
};

export default EvaluationItem;
