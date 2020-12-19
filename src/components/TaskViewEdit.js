import React, { useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";
import { Icon } from "@material-ui/core";

const TaskViewEdit = ({
  folders,
  selectedTask,
  setSelectedTask,
  postTaskHandler,
  postFolderHandler,
  toggleMode,
  handleDelete,
  redirect,
}) => {
  // date conversion to sql
  let tzoffset = (v) => {
    let offSet = v.getTimezoneOffset() / 60;
    if (offSet < 0) {
      offSet = offSet - offSet * 2;
    }
    v.setHours(offSet);
    v = v.toISOString().split("T")[0];
    return v;
  };
  // title
  const [currInput, setCurrInput] = useState(selectedTask.title);

  // description
  const [dCurrInput, setDCurrInput] = useState(selectedTask.description);

  // calendar
  const [calendarValue, setCalendarValue] = useState(
    selectedTask.deadline === null ? null : new Date(selectedTask.deadline)
  );

  //folder
  const [taskFolderId, setTaskFolderId] = useState(selectedTask.folder_id);
  const [folderCurrInput, setFolderCurrInput] = useState("");
  // dropdown

  const [isActive, setIsActive] = useState(false);
  const [calendarActive, setCalendarActive] = useState(false);
  // handle clicks when clicked outside select folder
  const closeFolder = useRef(null);
  const calendarRef = useRef(null);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClick = (e) => {
      // outside click
      if (!closeFolder.current.contains(e.target)) {
        if (isActive) {
          setIsActive(!isActive);
        }
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
    setIsActive(false);
  };
  const folderWrapper = () => {
    if (calendarActive) {
      setCalendarActive(!calendarActive);
    }
    setIsActive(!isActive);
  };
  const handleSubmit = () => {
    // prevent reload?
    //e.preventDefault();

    // edit task and post it
    const editedTask = { ...selectedTask };
    editedTask.id = selectedTask.id;
    editedTask.title = currInput;
    editedTask.description = dCurrInput;
    editedTask.deadline =
      calendarValue === null ? null : tzoffset(calendarValue);
    editedTask.folder_id = taskFolderId;
    setSelectedTask(editedTask);
    postTaskHandler(editedTask);

    // set input to empty when submitting -is this needed? works without
    setCurrInput("");
    //setDCurrInput("");
    toggleMode();
    // redirect to homepage after submit
    // history.push("/");
  };

  // handles folder creation & post
  const submitFolder = () => {
    const newFolder = {
      name: folderCurrInput,
    };
    postFolderHandler(newFolder);
  };
  const renderFolder = (id) => {
    if (folders.length === 0) return null;
    return folders[folders.map((item) => item.id).indexOf(id)].name;
  };
  const wrapper = () => {
    handleSubmit();
    toggleMode();
  };
  const deleteWrapper = () => {
    handleDelete(selectedTask.id);
    redirect();
  };
  return (
    <div className="content">
      <div className="edit-container">
        <div className="icons">
          <Icon className="fa fa-trash" onClick={() => deleteWrapper()} />
          <Icon className="fa fa-save" onClick={() => wrapper()} />
        </div>
        <hr />
        <form>
          <input
            type="text"
            placeholder="Task title"
            value={currInput}
            onChange={(e) => setCurrInput(e.target.value)}
          />
        </form>
        <hr />
        <form>
          <div className="description-box">
            <textarea
              type="text"
              placeholder="Task description (optional)"
              value={dCurrInput}
              onChange={(e) => setDCurrInput(e.target.value)}
            />
          </div>
        </form>
        <br />
        <div className="dropdown-menu-container" ref={closeFolder}>
          <div className="edit-folder-icon">
            <Icon
              className="fa fa-folder-open"
              onClick={() => folderWrapper()}
            />
            {taskFolderId == null
              ? "No folder selected"
              : renderFolder(taskFolderId)}
          </div>

          <br />
          <div className="folders">
            <nav
              ref={dropdownRef}
              className={`menu ${isActive ? "active" : "inactive"}`}
            >
              <ul>
                <li>
                  <p>Create folder</p>
                  <div className="folder-title-and-icon">
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
                      onClick={() => addFolderWrapper()}
                    />
                  </div>
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
          <hr />

          <div className="edit-calendar-icon">
            <Icon
              className="fa fa-calendar"
              onClick={() => setCalendarActive(!calendarActive)}
            />
            {calendarValue === null && selectedTask.deadline === null
              ? "No date selected"
              : calendarValue === null && selectedTask.deadline !== null
              ? new Date(selectedTask.deadline).toDateString()
              : calendarValue.toDateString()}
          </div>

          <div className="calendar-container">
            <nav
              ref={calendarRef}
              className={`menu ${calendarActive ? "active" : "inactive"}`}
            >
              <Calendar
                value={calendarValue}
                locale={"en-EN"}
                onChange={setCalendarValue}
              />
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskViewEdit;
