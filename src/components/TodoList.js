import React from "react";
const TodoList = ({ todos, handleDelete }) => {
  let sqlDateToDateString = (d) => {
    let temp;
    d == null ? (temp = "") : (temp = new Date(d).toDateString());
    return temp;
  };

  return (
    <div>
      <h1 className="todo-items">Things to do:</h1>
      {todos.map((todo) => (
        <div className="todo-item" key={todo.id}>
          <div> {todo.title} </div>
          <div> {sqlDateToDateString(todo.deadline)} </div>
          <div>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
