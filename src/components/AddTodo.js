import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Calendar from "react-calendar";

const AddTodo = ({ todos, setTodos, navSize }) => {
  //date selected: {value === null ? "" : value.toString()}
  const [currInput, setCurrInput] = useState("");
  const [value, onChange] = useState(null);
  const [taskContent] = useState("");
  // for redirecting
  let history = useHistory();

  // handle timezone offset for sql-date conversion
  // takes Date.object as an argument
  let tzoffset = (v) => {
    let offSet = v.getTimezoneOffset() / 60;
    if (offSet < 0) {
      offSet = offSet - offSet * 2;
    }
    v.setHours(offSet);
    v = v.toISOString().split("T")[0];
    return v;
  };

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
          date selected: {value === null ? "nothing" : value.toDateString()}
        </div>
        <div className="calendar-container">
          <Calendar value={null} locale={"en-EN"} onChange={onChange} />
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
//new Date(tzoffset(value))
//value.toDateString()
//value.getTimezoneOffset() / 60;
//value.setHours(tzoffset(value)),value.toISOString().split("T")[0]
//console.log(tzoffset(value)),
//console.log(new Date(tzoffset(value)))
