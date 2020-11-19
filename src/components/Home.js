// useState to replace need for props usage
import React from "react";
import TodoList from "./TodoList";
import { useHistory } from "react-router-dom";

const Home = ({ todos, handleDelete, closeNav, navSize }) => {
  let history = useHistory();
  let wrapperFunction = () => {
    closeNav();
    history.push("/add");
  };
  return (
    <div className="content">
      <div className={navSize === "100%" ? "blur" : ""}>
        <TodoList todos={todos} handleDelete={handleDelete} />
      </div>

      <button
        className="add-btn"
        style={{ backgroundColor: "red" }}
        onClick={() => wrapperFunction()}
        //onClick={() => history.push("/add")}
      >
        Add task
      </button>
    </div>
  );
};

export default Home;
