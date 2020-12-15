import React, { useState } from "react";
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
  const [itemsToPrint, setItemsToPrint] = useState([3, 1, 5]);
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
      let dateFormat = `${("0" + temp.getDate()).slice(-2)}.${(
        "0" +
        (temp.getMonth() + 1)
      ).slice(-2)}.`;
      return dateFormat;
    } else {
      return "";
    }
  };

  // prints sql table names as titles
  const printTitles = () => {
    let arr;
    todos[0] !== undefined ? (arr = [...Object.keys(todos[0])]) : (arr = null);
    if (arr) {
      return (
        <ul>
          {itemsToPrint.map((index) => {
            switch (index) {
              case 1:
                return <li> Title</li>;
              case 2:
                return <li> Description</li>;
              case 3:
                return <li> Status</li>;
              case 4:
                return <li> Creation time</li>;
              case 5:
                return <li> Deadline</li>;
              case 6:
                return <li> Folder</li>;
              default:
                return <li>{arr[index]}</li>;
            }
          })}
        </ul>
      );
    }
    return <li>Missing titles</li>;
  };

  const printTodos = () => {
    const renderColumns = (todo) => {
      return (
        <>
          {itemsToPrint.map((index) => {
            switch (index) {
              case 1:
                return renderTitle(todo);
              case 2:
                return <div> {renderDescription(todo)}</div>;
              //case 3:
              //  return <div>{renderIsDone(todo)}</div>;
              case 4:
                return <div> {todo.timeCreated}</div>; // should not be used outside testing
              case 5:
                return <div>{renderDeadLine(todo)}</div>;

              case 6:
                return <div> {renderFolder(todo.folder_id)}</div>;
              default:
                return <> </>;
            }
          })}
        </>
      );
    };
    const renderTitle = (todo) => {
      return (
        <div className={todo.isDone ? "task-done" : "task-test"}>
          {todo.title}
        </div>
      );
    };
    const renderDescription = (todo) => {
      return <>{todo.description} </>;
    };
    const renderDeadLine = (todo) => {
      return <> {sqlDateToDateString(todo.deadline)} </>;
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
        <>
          <Checkbox
            checked={Boolean(todo.isDone)}
            onChange={(e) => handleChange(e, todo)}
            color="default"
            inputProps={{ "aria-label": "checkbox with default color" }}
          />
        </>
      );
    };

    return (
      <>
        {todos.map(
          (todo) =>
            checkIfPrint(todo.folder_id) && (
              <div className="todo-item" key={todo.id}>
                <div>{renderIsDone(todo)} </div>
                <div
                  className="clickable-area"
                  onClick={() => wrapperFunction(todo)}
                >
                  {renderColumns(todo)}
                </div>
                <div>{renderDeleteButton(todo)}</div>
              </div>
            )
        )}
      </>
    );
  };

  return <div className="todos"> {printTodos()}</div>;
};

export default TodoList;
