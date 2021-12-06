import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import TextField from "@mui/material/TextField";
import TodoMenu from "./TodoMenu";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
const TodoItem = ({
  todo,
  handleOnComplete,
  handleOnUpdate,
  readOnly,
  showComplete,
  assignmentIcon,
  setNewTask,
}) => {
  // showComplete will only make affect when readOnly is true
  const { task, completed, secondary, index, newTask } = todo;

  const [edit, setEditValue] = useState(newTask ? 1 : 0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const keyPressTask = (e) => {
    if (e.keyCode === 13) {
      setEditValue(0);
      if (newTask) {
        console.log("newtask");
        setNewTask(0);
      }
      handleOnUpdate({ task: e.target.value, secondary }, index);
    }
  };
  const keyPressNote = (e) => {
    if (e.keyCode === 13) {
      setEditValue(0);
      handleOnUpdate({ task, secondary: e.target.value }, index);
    }
  };

  const clickHandler = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleClickAway = () => {
    setOpenMenu(false);
  };

  const buttonClickHandler = (event) => {
    handleOnComplete(index);
  };

  const determineColor = () => {
    if (readOnly && !showComplete) {
      return "warning";
    } else {
      return completed ? "success" : "disabled";
    }
  };
  const buttonColor = determineColor();

  return (
    <Grid sx={{ width: "100%", height: "auto" }}>
      <ListItem
        secondaryAction={
          readOnly ? null : (
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          )
        }
      >
        <ListItemIcon onClick={readOnly ? null : buttonClickHandler}>
          <IconButton aria-label="complete">
            {assignmentIcon ? (
              <AssignmentIcon fontSize="large" color={buttonColor} />
            ) : (
              <CheckCircleOutlineIcon fontSize="large" color={buttonColor} />
            )}
          </IconButton>
        </ListItemIcon>
        {edit === 1 && (
          <Grid
            sx={{
              maxWidth: "100%",
            }}
            item
            flexGrow={1}
          >
            <TextField
              fullWidth
              id="filled-basic"
              label="Task"
              variant="filled"
              multiline
              defaultValue={task}
              onKeyDown={keyPressTask}
            />
          </Grid>
        )}
        {edit === 2 && (
          <Grid
            sx={{
              maxWidth: "100%",
            }}
            item
            flexGrow={1}
          >
            <TextField
              fullWidth
              id="filled-basic"
              label="Note"
              variant="filled"
              defaultValue={secondary}
              onKeyDown={keyPressNote}
            />
          </Grid>
        )}
        {edit === 0 && (
          <ClickAwayListener onClickAway={handleClickAway}>
            <ListItemButton
              onClick={readOnly ? null : clickHandler}
              sx={{ maxWidth: "100%" }}
            >
              <ListItemText
                component={Button}
                primary={task}
                secondary={secondary && !readOnly ? secondary : null}
              />
            </ListItemButton>
          </ClickAwayListener>
        )}
        <TodoMenu
          open={openMenu}
          anchorEl={anchorEl}
          setEditValue={setEditValue}
          handleClose={handleClickAway}
        />
      </ListItem>
      <Divider />
    </Grid>
  );
};

export default TodoItem;
