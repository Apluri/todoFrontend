// useState to replace need for props usage
import React from "react";
import TodoList from "./TodoList";

const Home = ({ todos, handleDelete }) => {
  console.log(todos);
  return (
    <div className="home">
      <h1>Home</h1>

      <TodoList todos={todos} handleDelete={handleDelete} />
    </div>
  );
};

export default Home;
