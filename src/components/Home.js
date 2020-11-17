// useState to replace need for props usage
import React from "react";
import TodoList from "./TodoList";

const Home = ({ todos, handleDelete }) => {
  console.log(todos);
  return (
    <div className="home-container">
      <div className="left-sidebar">left:D sidebar:D</div>
      <div className="home-content">
        <h1>Home</h1>
        <TodoList todos={todos} handleDelete={handleDelete} />
      </div>

      <div className="right-sidebar">right:D</div>
    </div>
  );
};

export default Home;
