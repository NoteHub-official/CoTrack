import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";

import TodoItem from "./TodoItem";
const TodoList = (props) => {
  const {
    todos,
    readOnly,
    showComplete,
    assignmentIcon,
    newTask,
    setNewTask,
    setTasks,
    taskListId,
    disableSubcontent,
  } = props;

  const [todoItems, setTodoItems] = useState([]);
  const handleOnUpdate = (newValue, index) => {
    todoItems[index].content = newValue.content;
    todoItems[index].subcontent = newValue.subcontent;
    todoItems[index].completed = newValue.completed;
    setTodoItems([...todoItems]);
  };

  useEffect(() => {
    if (newTask) {
      const newOne = {
        newTask: 1,
        completed: false,
        content: "",
        subcontent: "",
      };
      todoItems.push(newOne);
      setTodoItems([...todoItems]);
    }
  }, [newTask]);

  useEffect(() => {
    setTodoItems(todos);
  }, [todos]);

  const handleOnDelete = (id) => {
    // delete from todoItems array according to the id attribute
    const newTodoItems = todoItems.filter((item) => item.id !== id);
    setTodoItems([...newTodoItems]);
    setTasks([...newTodoItems]);
  };

  const handleOnCreate = (item) => {
    todoItems[todoItems.length - 1] = item;
    setTasks([...todoItems]);
  };

  return (
    <Box>
      <List sx={{ width: 800, py: 0 }}>
        {todoItems instanceof Array &&
          todoItems.map((todo, index) => (
            <TodoItem
              readOnly={readOnly}
              disableSubcontent={disableSubcontent}
              key={todo.id}
              showComplete={showComplete}
              todo={{ index, ...todo }}
              handleOnUpdate={handleOnUpdate}
              handleOnDelete={handleOnDelete}
              handleOnCreate={handleOnCreate}
              assignmentIcon={assignmentIcon}
              setNewTask={setNewTask}
              taskListId={taskListId}
            />
          ))}
      </List>
    </Box>
  );
};

export default TodoList;
