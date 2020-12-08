// useState to replace need for props usage
import React from "react";
import TodoList from "./TodoList";
import { useHistory } from "react-router-dom";

const Home = ({
  todos,
  folders,
  handleDelete,
  closeNav,
  postTaskHandler,
  taskSelection,
}) => {
  let history = useHistory();
  let wrapperFunction = () => {
    closeNav();
    history.push("/add");
  };
  return (
    <>
      <TodoList
        selectFolder={null}
        todos={todos}
        folders={folders}
        handleDelete={handleDelete}
        postTaskHandler={postTaskHandler}
        taskSelection={taskSelection}
      />

      <button className="add-btn" onClick={() => wrapperFunction()}>
        Add task
      </button>
    </>
  );
};

export default Home;
