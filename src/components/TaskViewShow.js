import React, { useState } from "react";
import { Icon } from "@material-ui/core";

const TaskViewShow = ({
  folders,
  selectedTask,
  toggleMode,
  handleDelete,
  redirect,
}) => {
  const deleteWrapper = () => {
    handleDelete(selectedTask.id);
    redirect();
  };
  const renderFolder = (id) => {
    if (folders.length === 0) return null;
    return folders[folders.map((item) => item.id).indexOf(id)].name;
  };
  return (
    <div className="content">
      <div className="show-container">
        <div className="icons">
          <Icon className="fa fa-trash" onClick={() => deleteWrapper()} />
          <Icon className="fa fa-edit" onClick={() => toggleMode()} />
        </div>
        <hr />
        <div className="show-title">
          <h2>{selectedTask.title}</h2>
        </div>
        <hr />
        <div className="show-description">{selectedTask.description}</div>
        <hr />
        <div className="icon-and-name">
          <div className="show-folder-icon">
            <Icon className="fa fa-folder-open" />

            <div className="show-folder">
              {selectedTask.folder_id === null
                ? "No folder selected"
                : renderFolder(selectedTask.folder_id)}
            </div>
          </div>
        </div>
        <hr />
        <div className="icon-and-name">
          <div className="show-calendar-icon">
            <Icon className="fa fa-calendar" />
            <div className="show-deadline">
              {" "}
              {selectedTask.deadline === null
                ? "No date selected"
                : new Date(selectedTask.deadline).toDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskViewShow;
