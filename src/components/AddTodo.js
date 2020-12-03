import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Calendar from "react-calendar";
import FolderList from "./FolderList";

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
  // calendar
  const [value, onChange] = useState(null);
  // dropdown
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  // handle clicks when clicked outside select folder
  const closeFolder = useRef();
  useEffect(() => {
    const handleClick = (e) => {
      // outside click
      if (!closeFolder.current.contains(e.target)) {
        if (isActive) {
          setIsActive(!isActive);
        }
      }
    };
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [isActive]);

  // wrapper function for closing dropdown
  // creating a folder or selecting existing
  const addFolderWrapper = (id) => {
    isNaN(id) ? submitFolder() : setTaskFolderId(id);
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
        Folder selected:
        <br />
        <button
          onClick={() => setIsActive(!isActive)}
          className="folder-button-trigger"
        >
          Select folder
        </button>
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
                <button onClick={addFolderWrapper}>Add</button>
              </li>
              <div>
                {folders.map((folder) => (
                  <li key={folder.id}>
                    <button onClick={() => addFolderWrapper(folder.id)}>
                      {folder.name}
                    </button>
                  </li>
                ))}
                <FolderList folders={folders} />
              </div>
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
    </>
  );
};

export default AddTodo;
