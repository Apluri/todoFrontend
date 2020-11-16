import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const AddTodo = ({ todos, setTodos }) => {
  const [currInput, setCurrInput] = useState("");
  // for redirecting
  let history = useHistory();

  // here we could send task to sql server and then fetch tasks again
  // currently recreating todos state
  const handleSubmit = (e) => {
    // prevent reload?
    e.preventDefault();

    // create copy of existing todos, update todos with the copy
    const newTodos = [...todos].concat({
      id: Math.floor(Math.random() * 10000),
      task: currInput,
    });
    setTodos(newTodos);

    // set input to empty when submitting
    setCurrInput("");

    // redirect to homepage after submit
    history.push("/home");
  };
  return (
    <div className="add-todo">
      <h1>AddTodo</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={currInput}
          onChange={(e) => setCurrInput(e.target.value)}
        />
        <button>Add</button>
      </form>
    </div>
  );
};

export default AddTodo;