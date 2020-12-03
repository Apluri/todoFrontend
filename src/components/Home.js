// useState to replace need for props usage
import React from "react";
import TodoList from "./TodoList";
import { useHistory } from "react-router-dom";

const Home = ({
  todos,
  folders,
  handleDelete,
  closeNav,
  navSize,
  postTaskHandler,
}) => {
  let history = useHistory();
  let wrapperFunction = () => {
    closeNav();
    history.push("/add");
  };
  return (
    <div className="content">
      <div className={navSize === "100%" ? "blur" : ""}>
        <TodoList
          selectFolder={null}
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

export default Home;
