import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Calendar from "react-calendar";

const AddTodo = ({ todos, setTodos, navSize }) => {
  const [currInput, setCurrInput] = useState("");
  const [value, onChange] = useState(null);
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
      deadline: value === null ? null : value.toString(),
    });
    setTodos(newTodos);

    // set input to empty when submitting
    setCurrInput("");

    // redirect to homepage after submit
    history.push("/home");
  };
  return (
    <div className="content">
      <div className={navSize === "100%" ? "blur" : ""}>
        <div className="add-todo">
          <h1> New task</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="test"
              placeholder="Task title"
              value={currInput}
              onChange={(e) => setCurrInput(e.target.value)}
            />
            <button>Add</button>
          </form>
        </div>
        <div className="date-selection-show">
          date selected: {value === null ? "" : value.toString()}
        </div>
        <div className="calendar-container">
          <Calendar value={null} locale={"en-EN"} onChange={onChange} />
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
