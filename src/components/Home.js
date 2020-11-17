// useState to replace need for props usage
import React from "react";
import TodoList from "./TodoList";
import { useHistory } from "react-router-dom";

const Home = ({ todos, handleDelete }) => {
  let history = useHistory();
  return (
    <div className="home-container">
      <div className="left-sidebar">left:D sidebar:D</div>
      <div className="home-content">
        <h1>Home</h1>
        <TodoList todos={todos} handleDelete={handleDelete} />
        <button className="add-btn" onClick={() => history.push("/add")}>
          Add task{" "}
        </button>
      </div>

      <div className="right-sidebar">right:D</div>
    </div>
  );
};

export default Home;
