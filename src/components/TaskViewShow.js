import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const TaskViewShow = ({ folders, selectedTask }) => {
  return (
    <>
      {selectedTask.title}
      <br />
      {selectedTask.description}
      <br />
      {selectedTask.deadline}
    </>
  );
};

export default TaskViewShow;
