import React from "react";
import { Checkbox, Icon } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const TodoList = ({
  selectedFolder,
  todos,
  folders,
  handleDelete,
  postTaskHandler,
  setSelectedTask,
}) => {
  // numbers represents indexes of todo tasks
  let history = useHistory();
  let wrapperFunction = (todo) => {
    setSelectedTask(todo);
    history.push("/task");
  };
  // pass value here to print spesific folder only
  const checkIfPrint = (id) => {
    return selectedFolder === null || selectedFolder === undefined
      ? true
      : selectedFolder.id === id
      ? true
      : false;
  };
  const handleChange = (task) => {
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
      let dateFormat = `${("0" + temp.getDate()).slice(-2)}.${(
        "0" +
        (temp.getMonth() + 1)
      ).slice(-2)}.`;
      return dateFormat;
    } else {
      return "";
    }
  };

  const printTodos = () => {
    const renderTitle = (todo) => {
      return (
        <div className={todo.isDone ? "task-done" : "task"}>{todo.title}</div>
      );
    };
    const renderDescription = (todo) => {
      return <>{todo.description} </>;
    };
    const renderDeadLine = (todo) => {
      return (
        <div className="dead-line"> {sqlDateToDateString(todo.deadline)} </div>
      );
    };

    const renderFolder = (id) => {
      if (folders.length === 0 || id === null) return null;
      return folders[folders.map((item) => item.id).indexOf(id)].name;
    };
    const renderDeleteButton = (todo) => {
      return (
        <>
          <Icon className="fa fa-trash" onClick={() => handleDelete(todo.id)} />
        </>
      );
    };
    const renderIsDone = (todo) => {
      return (
        <Checkbox
          className="check-box"
          checked={Boolean(todo.isDone)}
          onChange={(e) => handleChange(todo)}
          inputProps={{ "aria-label": "checkbox with default color" }}
        />
      );
    };

    return (
      <>
        {todos.map(
          (todo) =>
            checkIfPrint(todo.folder_id) && (
              <>
                <hr />
                <div className="todo-item" key={todo.id}>
                  <div>{renderIsDone(todo)} </div>
                  <div
                    className="clickable-area"
                    onClick={() => wrapperFunction(todo)}
                  >
                    {renderTitle(todo)}
                    {renderDeadLine(todo)}
                  </div>
                  <div>{renderDeleteButton(todo)}</div>
                </div>
              </>
            )
        )}
      </>
    );
  };

  return <div className="todos"> {printTodos()}</div>;
};

export default TodoList;
