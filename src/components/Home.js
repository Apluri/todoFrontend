// useState to replace need for props usage
import React from "react";
import TodoList from "./TodoList";
import { useHistory } from "react-router-dom";

const Home = ({ todos, handleDelete, closeNav, navSize, postTaskHandler }) => {
  let history = useHistory();
  let wrapperFunction = () => {
    closeNav();
    history.push("/add");
  };
  return (
    <div className="content">
      <div className={navSize === "100%" ? "blur" : ""}>
        <TodoList
          todos={todos}
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
