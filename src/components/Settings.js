// useState to replace need for props usage
import React from "react";
const Settings = ({ deleteAllTasks, deleteAllFolders }) => {
  const wrapper = () => {
    deleteAllTasks();
    deleteAllFolders();
  };
  return (
    <div className="settings">
      <br />
      <button onClick={() => deleteAllTasks()}>Delete all tasks</button>
      <br />
      <button onClick={() => deleteAllFolders()}>Delete all folders</button>
      <br />
      <button onClick={() => wrapper()}>Full reset</button>
    </div>
  );
};

export default Settings;
