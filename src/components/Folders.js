import React, { useState } from "react";
import TodoList from "./TodoList";

const Folders = ({
  todos,
  folders,
  navSize,
  handleDelete,
  postTaskHandler,
}) => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  return (
    <div className="content">
      <div className={navSize === "100%" ? "blur" : ""}>
        {folders.map((folder) => (
          <button key={folder.id} onClick={() => setSelectedFolder(folder.id)}>
            {folder.name}
          </button>
        ))}
        <TodoList
          selectFolder={selectedFolder}
          todos={todos}
          folders={folders}
          handleDelete={handleDelete}
          postTaskHandler={postTaskHandler}
        />
      </div>
    </div>
  );
};

export default Folders;
