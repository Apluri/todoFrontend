import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";

const Folders = ({
  todos,
  folders,
  handleDelete,
  postTaskHandler,
  setSelectedTask,
}) => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  //dropdown
  const dropdownRef = useRef(null);
  const [folderListActive, setFolderListActive] = useState(false);
  // handle outside clicks
  const closeFolderList = useRef();
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

  return (
    <>
      <div className="dropdown-menu-container" ref={closeFolderList}>
        Folder selected:
        {selectedFolder !== null
          ? ` ${selectedFolder.name}`
          : " No folder selected"}
        <br />
        <button
          onClick={() => setFolderListActive(!folderListActive)}
          className="folder-button-trigger"
        >
          Select folder
        </button>
        <div className="folders">
          <nav
            ref={dropdownRef}
            className={`menu ${folderListActive ? "active" : "inactive"}`}
          >
            <ul>
              {folders.map((folder) => (
                <li key={folder.id}>
                  <button
                    className="folders-btn"
                    onClick={() => setSelectedFolder(folder)}
                  >
                    {folder.name}
                  </button>
                </li>
              ))}
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
      />
    </>
  );
};

export default Folders;
