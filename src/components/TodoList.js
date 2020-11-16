import React from "react";
const TodoList = ({ todos, handleDelete }) => {
  return (
    <div>
      <h1>List:</h1>
      {todos.map((todo) => (
        <div className="todo-item" key={todo.id}>
          <div> {todo.task} </div>
          <div>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
