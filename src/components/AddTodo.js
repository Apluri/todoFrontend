import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Calendar from "react-calendar";

const AddTodo = ({ todos, setTodos, navSize, postTaskHandler }) => {
  // title
  const [currInput, setCurrInput] = useState("");
  // description
  const [dCurrInput, setDCurrInput] = useState(null);
  // calendar
  const [value, onChange] = useState(null);
  // dropdown
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);
  // handle clicks when clicked outside select folder
  const closeFolder = useRef();
  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  const handleClick = (e) => {
    if (closeFolder.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    if (isActive) {
      setIsActive(!isActive);
    }
  };

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

  // function to close dropdownmenu on outside-clicks

  // here we could send task to sql server and then fetch tasks again
  // currently recreating todos state
  const handleSubmit = (e) => {
    // prevent reload?
    e.preventDefault();

    // create new task and post it
    const newTodo = {
      title: currInput,
      description: dCurrInput, // add logic here
      deadline: value === null ? null : tzoffset(value),
      folder: "Default", // add logic here
    };
    postTaskHandler(newTodo);

    // set input to empty when submitting -is this needed? works without
    setCurrInput("");
    //setDCurrInput("");

    // redirect to homepage after submit
    history.push("/home");
  };

  return (
    <div className="content">
      <div className={navSize === "100%" ? "blur" : ""}>
        <div className="add-todo">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Task title"
              value={currInput}
              onChange={(e) => setCurrInput(e.target.value)}
            />
            <button>Add</button>
          </form>
          <form onSubmit={handleSubmit}>
            <div className="description-box">
              <textarea
                type="text"
                placeholder="Task description (optional)"
                value={dCurrInput}
                onChange={(e) => setDCurrInput(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className="dropdown-menu-container" ref={closeFolder}>
          Folder selected:
          <br />
          <button onClick={onClick} className="folder-button-trigger">
            Select folder
          </button>
          <div className="folders">
            <nav
              ref={dropdownRef}
              className={`menu ${isActive ? "active" : "inactive"}`}
            >
              <ul>
                <li>Create folder</li>
                <li>example</li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="date-selection-show">
          Date selected: {value === null ? "nothing" : value.toDateString()}
        </div>
        <div className="calendar-container">
          <Calendar value={null} locale={"en-EN"} onChange={onChange} />
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
