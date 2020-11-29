import React from "react";
import { Checkbox } from "@material-ui/core";

const TodoList = ({ todos, handleDelete, postTaskHandler }) => {
  const handleChange = (event, task) => {
    // post check
    const editedTask = { ...task };
    editedTask.isDone = !editedTask.isDone;
    postTaskHandler(editedTask);
    //setChecked(event.target.checked);
  };

  let sqlDateToDateString = (d) => {
    let temp;
    d == null ? (temp = "") : (temp = new Date(d).toDateString());
    return temp;
  };

  return (
    <div>
      <h1 className="todo-items">Things to do:</h1>
      {todos.map((todo) => (
        <div className="todo-item" key={todo.id}>
          <div> {todo.title} </div>
          <div> {sqlDateToDateString(todo.deadline)} </div>
          <div>
            <Checkbox
              checked={Boolean(todo.isDone)}
              onChange={(e) => handleChange(e, todo)}
              color="default"
              inputProps={{ "aria-label": "checkbox with default color" }}
            />
          </div>
          <div>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
