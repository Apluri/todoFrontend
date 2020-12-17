// useState to replace need for props usage
import React from "react";

const Settings = ({ deleteAllTasks, deleteAllFolders }) => {
  const wrapper = () => {
    deleteAllTasks();
    deleteAllFolders();
  };

  return (
    <div className="content">
      <div className="settings">
        <button onClick={() => deleteAllTasks()}>Delete all tasks</button>

        <button onClick={() => deleteAllFolders()}>Delete all folders</button>

        <button onClick={() => wrapper()}>Full reset</button>
      </div>
    </div>
  );
};

export default Settings;
