/*
import React from "react";
import TodoList from "./TodoList";

const Folders = (todos, folders, handleDelete, postTaskHandler) => {
  //
  console.log(handleDelete);
  return <div className="content"></div>;
};

export default Folders;
*/

// useState to replace need for props usage
import React, { useState } from "react";
import TodoList from "./TodoList";
import { useHistory } from "react-router-dom";

const Folders = ({
  todos,
  folders,
  handleDelete,
  closeNav,
  navSize,
  postTaskHandler,
}) => {
  const [selectFolder, setSelectFolder] = useState(1);
  let history = useHistory();
  let wrapperFunction = () => {
    closeNav();
    history.push("/add");
  };
  return (
    <div className="content">
      <div className={navSize === "100%" ? "blur" : ""}>
        <TodoList
          selectFolder={selectFolder}
          todos={todos}
          folders={folders}
          handleDelete={handleDelete}
          postTaskHandler={postTaskHandler}
        />
      </div>

      <button className="add-btn" onClick={() => wrapperFunction()}>
        Add task
      </button>
    </div>
  );
};

export default Folders;
