import React, { useState } from "react";
import TodoList from "./TodoList";

const Folders = ({ todos, folders, handleDelete, postTaskHandler }) => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  return (
    <>
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
    </>
  );
};

export default Folders;
