import React from "react";

const TaskView = ({ folders, selectedTask }) => {
  console.log(selectedTask);
  console.log(folders);
  const checkIfNull = () => {
    return selectedTask === null ? "" : selectedTask;
  };
  return (
    <>
      <h2>{checkIfNull().title}</h2>
      <form>
        <div className="description-box">
          <textarea type="text" value={checkIfNull().description} />
        </div>
      </form>
      <button>save</button>
      <br />
      <>
        Task deadline:{" "}
        {checkIfNull().deadline === null
          ? "No date selected"
          : checkIfNull().deadline}
      </>
      <button>edit</button>
    </>
  );
};

export default TaskView;
