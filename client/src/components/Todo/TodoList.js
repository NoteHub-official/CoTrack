import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";

import TodoItem from "./TodoItem";
const TodoList = (props) => {
  const todos = [
    { task: "Learn React", completed: true, secondary: "2 days left" },
    { task: "Learn Redux", completed: false, secondary: "Redux is awesome" },
    { task: "Learn GraphQL", completed: false },
  ];
  const { readOnly } = props;
  const [todoItems, setTodoItems] = React.useState(todos);

  const handleOnUpdate = (newValue, index) => {
    todoItems[index].task = newValue.task;
    todoItems[index].secondary = newValue.secondary;
    setTodoItems([...todoItems]);
  };
  const handleOnComplete = (index) => {
    todos[index].completed = !todos[index].completed;

    todoItems[index].completed = !todoItems[index].completed;
    setTodoItems([...todoItems]);
  };
  return (
    <Box>
      <List>
        {todoItems.map((todo, index) => (
          <TodoItem
            readOnly={readOnly}
            key={index}
            todo={{ index, ...todo }}
            handleOnUpdate={handleOnUpdate}
            handleOnComplete={handleOnComplete}
          />
        ))}
      </List>
    </Box>
  );
};

export default TodoList;
