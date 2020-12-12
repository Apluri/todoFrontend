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
    <>
      <button onClick={() => toggleMode()}>edit</button>
      {selectedTask.folder_id === null
        ? ""
        : renderFolder(selectedTask.folder_id)}
      {selectedTask.title}
      <br />
      {selectedTask.description}
      <br />
      {selectedTask.deadline === null
        ? ""
        : new Date(selectedTask.deadline).toDateString()}
      <br />
      <button onClick={() => deleteWrapper()}>Delete task</button>
    </>
  );
};

export default TaskViewShow;
