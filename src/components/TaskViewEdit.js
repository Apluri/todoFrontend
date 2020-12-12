import React, { useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";

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
  // title
  const [currInput, setCurrInput] = useState(selectedTask.title);

  // description
  const [dCurrInput, setDCurrInput] = useState(selectedTask.description);

  // calendar
  const [calendarValue, setCalendarValue] = useState(
    selectedTask.deadline === null ? null : new Date(selectedTask.deadline)
  );

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

  //folder
  const [taskFolderId, setTaskFolderId] = useState(selectedTask.folder_id);
  const [folderCurrInput, setFolderCurrInput] = useState("");
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
  const addFolderWrapper = (folder) => {
    isNaN(folder.id) ? submitFolder() : setTaskFolderId(folder.id);
    setIsActive(false);
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
    <>
      <button onClick={() => wrapper()}>save</button>
      <form>
        <input
          type="text"
          placeholder="Task title"
          value={currInput}
          onChange={(e) => setCurrInput(e.target.value)}
        />
      </form>
      <br />
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
        Folder selected:{" "}
        {taskFolderId == null ? "nothing" : renderFolder(taskFolderId)}
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
      </div>
      Date selected:{" "}
      {calendarValue === null && selectedTask.deadline === null
        ? "nothing"
        : calendarValue === null && selectedTask.deadline !== null
        ? new Date(selectedTask.deadline).toDateString()
        : calendarValue.toDateString()}
      <div className="calendar-container">
        <Calendar
          value={calendarValue}
          locale={"en-EN"}
          onChange={setCalendarValue}
        />
      </div>
      <button onClick={() => deleteWrapper()}>Delete task</button>
    </>
  );
};

export default TaskViewEdit;
