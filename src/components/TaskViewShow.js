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
    <div className="show-container">
      <Icon className="fa fa-trash" onClick={() => deleteWrapper()} />
      <button onClick={() => deleteWrapper()}>Delete</button>
      <Icon className="fa fa-edit" onClick={() => toggleMode()} />
      <button onClick={() => toggleMode()}>Edit</button>

      <div className="show-title">
        <h2>{selectedTask.title}</h2>
      </div>
      <div className="show-description">{selectedTask.description}</div>
      <Icon className="fa fa-folder-open" />
      <div className="show-folder">
        {selectedTask.folder_id === null
          ? ""
          : renderFolder(selectedTask.folder_id)}
      </div>
      <Icon className="fa fa-calendar" />
      <div className="show-deadline">
        {" "}
        {selectedTask.deadline === null
          ? ""
          : new Date(selectedTask.deadline).toDateString()}
      </div>
    </div>
  );
};

export default TaskViewShow;
