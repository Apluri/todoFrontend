import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { Icon } from "@material-ui/core";

const Folders = ({
  todos,
  folders,
  handleDelete,
  postTaskHandler,
  setSelectedTask,
  sortTodosHandler,
  handleFolderDelete,
  postFolderHandler,
}) => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  //dropdown
  const dropdownRef = useRef(null);
  const [folderListActive, setFolderListActive] = useState(false);
  // handle outside clicks
  const closeFolderList = useRef();
  const [folderCurrInput, setFolderCurrInput] = useState("");

  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    const handleClick = (e) => {
      // outside click
      if (!closeFolderList.current.contains(e.target)) {
        if (folderListActive) {
          setFolderListActive(!folderListActive);
        }
      }
    };
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [folderListActive]);
  const addFolderWrapper = (folder) => {
    submitFolder();
    setIsActive(!isActive);
  };
  const submitFolder = () => {
    const newFolder = {
      name: folderCurrInput,
    };
    postFolderHandler(newFolder);
  };
  return (
    <div className="content">
      <div className="dropdown-menu-container" ref={closeFolderList}>
        <div className="folders-folder-icon">
          <Icon
            className="fa fa-folder-open"
            onClick={() => setFolderListActive(!folderListActive)}
          />
          {selectedFolder !== null
            ? ` ${selectedFolder.name}`
            : " No folder selected"}
        </div>

        <br />

        <div className="folders">
          <nav
            ref={dropdownRef}
            className={`menu ${folderListActive ? "active" : "inactive"}`}
          >
            <ul>
              <li>
                <p>Create Folder</p>
                <div className="folder-title-and-icon">
                  <form>
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
                    <div className="folders-title-and-icon">
                      <button
                        className="folders-btn"
                        onClick={() => setSelectedFolder(folder)}
                      >
                        {folder.name}
                      </button>
                      <div className="folders-trash">
                        <Icon
                          className="fa fa-trash"
                          onClick={() => handleFolderDelete(folder.id)}
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </div>
            </ul>
          </nav>
        </div>
      </div>
      <TodoList
        selectedFolder={selectedFolder}
        todos={todos}
        folders={folders}
        handleDelete={handleDelete}
        postTaskHandler={postTaskHandler}
        setSelectedTask={setSelectedTask}
        sortTodosHandler={sortTodosHandler}
      />
    </div>
  );
};

export default Folders;
