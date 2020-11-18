import React from "react";
const TodoList = ({ todos, handleDelete }) => {
  console.log(todos);

  return (
    <div>
      <h1 className="todo-items">Things to do:</h1>
      {todos.map((todo) => (
        <div className="todo-item" key={todo.id}>
          <div> {todo.task} </div>
          <div> {todo.deadline} </div>
          <div>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
