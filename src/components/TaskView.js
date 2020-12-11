import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TaskViewEdit from "./TaskViewEdit";
import TaskViewShow from "./TaskViewShow";

const TaskView = ({ folders, selectedTask, postTaskHandler }) => {
  const history = useHistory();
  const redirect = () => {
    history.push("/");
  };
  const [editMode, setEditMode] = useState(false);

  const wrapperFunction = () => {
    if (editMode) {
      console.log("update function here");
    }
    setEditMode(!editMode);
  };

  return !selectedTask ? (
    <> {redirect()}</>
  ) : editMode ? (
    <>
      <button onClick={() => wrapperFunction()}>save</button>
      <br />
      <TaskViewEdit
        folders={folders}
        selectedTask={selectedTask}
        postTaskHandler={postTaskHandler}
      />
    </>
  ) : (
    <>
      <button onClick={() => wrapperFunction()}>edit</button>
      <br />
      <TaskViewShow folders={folders} selectedTask={selectedTask} />
    </>
  );
};

export default TaskView;
