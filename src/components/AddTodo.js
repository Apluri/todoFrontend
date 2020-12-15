import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Calendar from "react-calendar";
import { Icon } from "@material-ui/core";

const AddTodo = ({
  todos,
  setTodos,
  folders,
  navSize,
  postTaskHandler,
  postFolderHandler,
}) => {
  // title
  const [currInput, setCurrInput] = useState("");
  // description
  const [dCurrInput, setDCurrInput] = useState("");
  // folder
  const [taskFolderId, setTaskFolderId] = useState(null);
  const [folderCurrInput, setFolderCurrInput] = useState("");
  // for showing currently selected folder
  const [folderNamePrint, setFolderNamePrint] = useState("");
  // calendar
  const [value, onChange] = useState(null);
  // dropdown
  const dropdownRef = useRef(null);

  const [isActive, setIsActive] = useState(false);
  //calendar dropdown
  const [calendarActive, setCalendarActive] = useState(false);

  // handle clicks when clicked outside select folder
  const closeFolder = useRef();
  const calendarRef = useRef();
  const folderWrapper = () => {
    if (calendarActive) {
      setCalendarActive(!calendarActive);
    }
    setIsActive(!isActive);
  };
  useEffect(() => {
    const handleClick = (e) => {
      // outside click
      if (!closeFolder.current.contains(e.target)) {
        if (isActive) {
          setIsActive(!isActive);
        }
      }
      if (!calendarRef.current.contains(e.target)) {
        if (calendarActive) {
          setCalendarActive(!calendarActive);
        }
      }
    };
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [isActive, calendarActive]);

  // wrapper function for closing dropdown
  // creating a folder or selecting existing
  const addFolderWrapper = (folder) => {
    isNaN(folder.id) ? submitFolder() : setTaskFolderId(folder.id);
    setFolderNamePrint(folder.name);
    setIsActive(false);
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
      folder_id: taskFolderId,
    };
    postTaskHandler(newTodo);

    // set input to empty when submitting -is this needed? works without
    setCurrInput("");
    //setDCurrInput("");

    // redirect to homepage after submit
    history.push("/");
  };

  // handles folder creation & post
  const submitFolder = () => {
    const newFolder = {
      name: folderCurrInput,
    };
    postFolderHandler(newFolder);
  };
  return (
    <>
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
        <div>
          <Icon
            classes
            className="fa fa-folder-open"
            onClick={() => folderWrapper()}
          />
          {folderNamePrint == "" ? "No folder selected" : folderNamePrint}
        </div>
        <div className="folders">
          <nav
            ref={dropdownRef}
            className={`menu ${isActive ? "active" : "inactive"}`}
          >
            <ul>
              <li>
                Create Folder
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Folder title"
                    value={folderCurrInput}
                    onChange={(e) => setFolderCurrInput(e.target.value)}
                  ></input>
                </form>
                <Icon
                  className="fa fa-plus-square"
                  onClick={() => submitFolder()}
                />
              </li>
              <div>
                {folders.map((folder) => (
                  <li key={folder.id}>
                    <button
                      className="folders-btn"
                      onClick={() => addFolderWrapper(folder)}
                    >
                      {folder.name}
                    </button>
                  </li>
                ))}
              </div>
            </ul>
          </nav>
        </div>
        <div className="date-selection-show">
          <Icon
            className="fa fa-calendar"
            onClick={() => setCalendarActive(!calendarActive)}
          />
          {value === null ? "No date selected" : value.toDateString()}
        </div>
        <div className="calendar-container" ref={calendarRef}>
          <nav
            ref={calendarRef}
            className={`menu ${calendarActive ? "active" : "inactive"}`}
          >
            <Calendar value={null} locale={"en-EN"} onChange={onChange} />
          </nav>
        </div>
      </div>
    </>
  );
};

export default AddTodo;
/*
<div className="date-selection-show">
        <Icon
          className="fa fa-calendar"
          onClick={setCalendarActive(!calendarActive)}
        />
        {value === null ? "No date selected" : value.toDateString()}
      </div>
      <div className="calendar-container" ref={calendarRef}>
        <div className={`menu ${calendarActive ? "active" : "inactive"}`}>
          <Calendar value={null} locale={"en-EN"} onChange={onChange} />
        </div>
      </div>
*/
