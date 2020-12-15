import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TaskViewEdit from "./TaskViewEdit";
import TaskViewShow from "./TaskViewShow";

const TaskView = ({
  folders,
  selectedTask,
  setSelectedTask,
  postTaskHandler,
  postFolderHandler,
  handleDelete,
}) => {
  const history = useHistory();
  const redirect = () => {
    history.push("/");
  };
  const [editMode, setEditMode] = useState(false);
  const toggleMode = () => {
    setEditMode(!editMode);
  };

  return !selectedTask ? (
    <> {redirect()}</>
  ) : editMode ? (
    <div className="content">
      <br />
      <TaskViewEdit
        folders={folders}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        postTaskHandler={postTaskHandler}
        postFolderHandler={postFolderHandler}
        toggleMode={toggleMode}
        handleDelete={handleDelete}
        redirect={redirect}
      />
    </div>
  ) : (
    <div className="content">
      <br />
      <TaskViewShow
        folders={folders}
        selectedTask={selectedTask}
        toggleMode={toggleMode}
        handleDelete={handleDelete}
        redirect={redirect}
      />
    </div>
  );
};

export default TaskView;
