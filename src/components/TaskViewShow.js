import React, { useState } from "react";
import { useHistory } from "react-router-dom";

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
      <button onClick={() => toggleMode()}>edit</button>
      <div className="show-folder">Folder:</div>
      <div className="show-folder-content">
        {selectedTask.folder_id === null
          ? ""
          : renderFolder(selectedTask.folder_id)}
        <div className="show-title">Title</div>
        <div className="show-title-content">{selectedTask.title}</div>
      </div>

      <div className="show-description">Description:</div>
      <div className="show-description-content">{selectedTask.description}</div>
      <div className="show-deadline">Deadline:</div>
      <div className="show-deadline-content">
        {" "}
        {selectedTask.deadline === null
          ? ""
          : new Date(selectedTask.deadline).toDateString()}
      </div>

      <button onClick={() => deleteWrapper()}>Delete task</button>
    </div>
  );
};

export default TaskViewShow;
