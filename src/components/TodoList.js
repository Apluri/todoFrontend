import React from "react";
import { Checkbox } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const TodoList = ({
  selectedFolder,
  todos,
  sortTodosHandler,
  folders,
  handleDelete,
  postTaskHandler,
  setSelectedTask,
}) => {
  // for redirecting into taskview.js
  //const [selectedTask, setSelectedTask] = useState(null);
  let history = useHistory();
  let wrapperFunction = (todo) => {
    setSelectedTask(todo);

    history.push("/task");
  };
  // pass value here to print spesific folder
  const checkIfPrint = (id) => {
    return selectedFolder === null || selectedFolder === undefined
      ? true
      : selectedFolder.id === id
      ? true
      : false;
  };
  const handleChange = (event, task) => {
    // post check
    const editedTask = { ...task };
    editedTask.isDone = !editedTask.isDone;
    postTaskHandler(editedTask);

    //setChecked(event.target.checked);
  };

  // Function to convert the sql-date to preferred string with prefixed zeros
  let sqlDateToDateString = (d) => {
    if (d !== null) {
      let temp = new Date(d);
      let dateFormat = `${("0" + temp.getDate()).slice(-2)} - ${(
        "0" +
        (temp.getMonth() + 1)
      ).slice(-2)}`;
      return dateFormat;
    } else {
      return "";
    }
  };

  /*
  const renderFolder = (id) => {
    if (folders.length === 0) return null;
    return folders[folders.map((item) => item.id).indexOf(id)].name;
  };
  */
  return (
    <>
      <h1>Things to do:</h1>
      <div className="task-title">
        <ul>
          <li> Sort By: </li>
          <li>
            <button
              onClick={(e) => {
                sortTodosHandler("title");
              }}
            >
              title
            </button>
          </li>
          <li>
            <button
              onClick={(e) => {
                sortTodosHandler("deadline");
              }}
            >
              date
            </button>
          </li>
          <li>
            <button
              onClick={(e) => {
                sortTodosHandler("isDone");
              }}
            >
              status
            </button>
          </li>
          <li>
            <button
              onClick={(e) => {
                sortTodosHandler("timeCreated");
              }}
            >
              time created
            </button>
          </li>
        </ul>
      </div>
      {todos.map(
        (todo) =>
          checkIfPrint(todo.folder_id) && (
            <div className="todo-item" key={todo.id}>
              <div className={todo.isDone ? "task-done" : ""}>
                <button
                  className="todo-title-button"
                  onClick={() => wrapperFunction(todo)}
                >
                  {todo.title}
                </button>
              </div>
              <div> {sqlDateToDateString(todo.deadline)} </div>
              <div>
                <Checkbox
                  checked={Boolean(todo.isDone)}
                  onChange={(e) => handleChange(e, todo)}
                  color="default"
                  inputProps={{ "aria-label": "checkbox with default color" }}
                />
              </div>
              <div>
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
              </div>
            </div>
          )
      )}
    </>
  );
};

export default TodoList;
