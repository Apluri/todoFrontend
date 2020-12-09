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
  setSelectedTask,
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
        setSelectedTask={setSelectedTask}
      />

      <button className="add-btn" onClick={() => wrapperFunction()}>
        Add task
      </button>
    </>
  );
};

export default Home;
