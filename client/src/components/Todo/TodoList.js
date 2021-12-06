import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";

import TodoItem from "./TodoItem";
const TodoList = (props) => {
  const { todos, readOnly, showComplete, assignmentIcon, newTask, setNewTask } =
    props;
  const [todoItems, setTodoItems] = React.useState(todos);
  const handleOnUpdate = (newValue, index) => {
    todoItems[index].content = newValue.content;
    todoItems[index].secondary = newValue.secondary;
    setTodoItems([...todoItems]);
  };
  const handleOnComplete = (index) => {
    todoItems[index].completed = !todoItems[index].completed;
    setTodoItems([...todoItems]);
  };

  useEffect(() => {
    if (newTask) {
      let newOne = {
        newTask: 1,
        completed: false,
      };
      todoItems.push(newOne);
      setTodoItems([...todoItems]);
    }
  }, [newTask]);

  return (
    <Box>
      <List sx={{ width: 800, py: 0 }}>
        {todoItems.map((todo, index) => (
          <TodoItem
            readOnly={readOnly}
            key={index}
            showComplete={showComplete}
            todo={{ index, ...todo }}
            handleOnUpdate={handleOnUpdate}
            handleOnComplete={handleOnComplete}
            assignmentIcon={assignmentIcon}
            setNewTask={setNewTask}
          />
        ))}
      </List>
    </Box>
  );
};

export default TodoList;
