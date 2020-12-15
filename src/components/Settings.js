// useState to replace need for props usage
import React from "react";
import { Icon } from "@material-ui/core";

const Settings = ({
  deleteAllTasks,
  deleteAllFolders,
  sortAscending,
  sortTodosHandler,
  setSortAscending,
  currSort,
}) => {
  const wrapper = () => {
    deleteAllTasks();
    deleteAllFolders();
  };
  const printPrettierSelectedSort = (currSort) => {
    switch (currSort) {
      case "title":
        return "Title";
      case "timeCreated":
        return "Time created";
      case "isDone":
        return "Status";
      case "deadline":
        return "Deadline";
      default:
        return "Error!";
    }
  };
  const renderSort = () => {
    return (
      <div className="sort">
        <p>Sort by</p>
        <div className="dropdown">
          <button className="dropbtn">
            {printPrettierSelectedSort(currSort)}
          </button>
          <div className="dropdown-content">
            <button onClick={() => sortTodosHandler("title")}>Title</button>
            <button onClick={() => sortTodosHandler("timeCreated")}>
              Time created
            </button>
            <button onClick={() => sortTodosHandler("deadline")}>
              Deadline
            </button>
            <button onClick={() => sortTodosHandler("isDone")}>Status</button>
          </div>
        </div>
        <div className="arrow">
          <Icon
            className={sortAscending ? "fa fa-arrow-up" : "fa fa-arrow-down"}
            onClick={() => {
              setSortAscending(!sortAscending);
              sortTodosHandler(currSort);
            }}
          />
        </div>
      </div>
    );
  };
  return (
    <div className="settings">
      {renderSort()}
      <br />

      <button onClick={() => deleteAllTasks()}>Delete all tasks</button>
      <br />
      <button onClick={() => deleteAllFolders()}>Delete all folders</button>
      <br />
      <button onClick={() => wrapper()}>Full reset</button>
    </div>
  );
};

export default Settings;
