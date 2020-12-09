import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TaskViewEdit from "./TaskViewEdit";
import TaskViewShow from "./TaskViewShow";

const TaskView = ({ folders, selectedTask }) => {
  const history = useHistory();
  const redirect = () => {
    history.push("/");
  };
  const [editMode, setEditMode] = useState(false);

  return !selectedTask ? (
    <> {redirect()}</>
  ) : editMode ? (
    <>
      <TaskViewEdit folders={folders} selectedTask={selectedTask} />
      <button onClick={() => setEditMode(!editMode)}>save</button>
    </>
  ) : (
    <>
      <TaskViewShow folders={folders} selectedTask={selectedTask} />
      <button onClick={() => setEditMode(!editMode)}>edit</button>
    </>
  );
};

export default TaskView;
