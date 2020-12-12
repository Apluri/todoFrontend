import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const TaskViewShow = ({ folders, selectedTask, toggleMode }) => {
  return (
    <>
      <button onClick={() => toggleMode()}>edit</button>
      {selectedTask.title}
      <br />
      {selectedTask.description}
      <br />
      {selectedTask.deadline === null
        ? ""
        : new Date(selectedTask.deadline).toDateString()}
      <br />
      <button>Delete task</button>
    </>
  );
};

export default TaskViewShow;
