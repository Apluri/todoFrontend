import React from "react";

const TaskView = ({ folders, selectedTask }) => {
  console.log(selectedTask);
  console.log(folders);
  return <>Selected task: {selectedTask.title}</>;
};

export default TaskView;
