import React, { useState, useEffect } from "react";
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

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import axios from "axios";
const TodoItem = ({
  todo,
  handleOnUpdate,
  readOnly,
  showComplete,
  assignmentIcon,
  setNewTask,
  handleOnDelete,
  handleOnCreate,
  taskListId,
  disableSubcontent,
}) => {
  // showComplete will only make affect when readOnly is true
  const { content, completed, subcontent, index, newTask, id } = todo;

  const [edit, setEditValue] = useState(newTask ? 1 : 0);
  const [localNewTask, setLocalNewTask] = useState(newTask ? 1 : 0);

  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const [localContent, setLocalContent] = useState(content);
  const [localSubContent, setLocalSubContent] = useState(subcontent);
  // const [localId, setLocalId] = useState(id);
  const [localCompleted, setLocalCompleted] = useState(completed);

  const { access } = useSelector(selectCurrentUser);

  const postNewTaskAsync = async (content) => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL_API}/task_items/`,
      {
        task_list: taskListId,
        content,
      },
      {
        headers: {
          Authorization: `JWT ${access}`,
        },
      }
    );
    //setLocalContent(data.content);
    //setLocalSubContent(data.subcontent);
    //setLocalId(data.id);
    handleOnCreate(data);
  };

  const patchExistingTaskAsync = async (id, reverseCompleted) => {
    const payload = localSubContent
      ? {
          content: localContent,
          subcontent: localSubContent,
          //completed: completed,
          completed: reverseCompleted ? !localCompleted : localCompleted,
        }
      : {
          content: localContent,
          //completed: completed,
          completed: reverseCompleted ? !localCompleted : localCompleted,
        };

    const { data } = await axios.patch(
      `${process.env.REACT_APP_API_URL_API}/task_items/${id}/`,
      payload,
      {
        headers: {
          Authorization: `JWT ${access}`,
        },
      }
    );
    setLocalContent(data.content);
    setLocalSubContent(data.subcontent);
    setLocalCompleted(data.completed);
    handleOnUpdate(
      {
        content: localContent,
        subcontent: localSubContent,
        completed: localCompleted,
      },
      index
    );
  };

  const deleteExistingTaskAsync = async (id) => {
    await axios.delete(
      `${process.env.REACT_APP_API_URL_API}/task_items/${id}/`,
      {
        headers: {
          Authorization: `JWT ${access}`,
        },
      }
    );
  };

  const keyPressTask = (e) => {
    if (e.keyCode === 13) {
      setEditValue(0);
      if (localNewTask) {
        setLocalNewTask(0);
        setNewTask(0);
        postNewTaskAsync(e.target.value);
      } else {
        patchExistingTaskAsync(id);
      }
      // handleOnUpdate(
      //   { content: localContent, subcontent: localSubContent },
      //   index
      // );
    }
  };
  const keyPressNote = (e) => {
    if (e.keyCode === 13) {
      setEditValue(0);
      patchExistingTaskAsync(id);
      // handleOnUpdate(
      //   { content: localContent, subcontent: localSubContent },
      //   index
      // );
    }
  };

  const clickHandler = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const deleteClickHandler = () => {
    deleteExistingTaskAsync(id);
    handleOnDelete(id);
  };

  const handleClickAway = () => {
    setOpenMenu(false);
  };

  const buttonClickHandler = (event) => {
    patchExistingTaskAsync(id, 1);
    //setLocalCompleted(!localCompleted);
    //handleOnComplete(index);
  };

  // useEffect(() => {
  //   setLocalContent(content);
  //   setLocalSubContent(subcontent);
  //   setLocalCompleted(completed);
  // }, [content, completed, subcontent, id]);

  const determineColor = () => {
    if (readOnly && !showComplete) {
      return "warning";
    } else {
      return localCompleted ? "success" : "disabled";
    }
  };
  const buttonColor = determineColor();

  return (
    <Grid sx={{ width: "100%", height: "auto" }}>
      <ListItem
        secondaryAction={
          readOnly ? null : (
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={deleteClickHandler}
            >
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
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
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
              value={localSubContent}
              onChange={(e) => setLocalSubContent(e.target.value)}
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
                primary={localContent}
                secondary={
                  localSubContent && !disableSubcontent ? localSubContent : null
                }
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
