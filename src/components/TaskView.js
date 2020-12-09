import React from "react";
import { useHistory } from "react-router-dom";

const TaskView = ({ folders, selectedTask }) => {
  const history = useHistory();
  const redirect = () => {
    history.push("/");
  };

  /* :DD
  const checkIfNull = (argument) => {
    return argument === null ? true : false;
  };
  */
  let sqlDateToDateString = (d) => {
    if (d !== null) {
      let temp = new Date(d);
      let dateFormat = `${("0" + temp.getDate()).slice(-2)} - ${(
        "0" +
        (temp.getMonth() + 1)
      ).slice(-2)}`;
      return dateFormat;
    } else {
      return "";
    }
  };

  return !selectedTask ? (
    <> {redirect()}</>
  ) : (
    <>
      <h2>{selectedTask.title}</h2>
      <form>
        <div className="description-box">
          <textarea
            type="text"
            placeholder="Task description (optional)"
            value={selectedTask.description ? selectedTask.description : ""}
            onChange={(e) => console.log(e)}
          />
        </div>
      </form>
      <button>save</button>
      <br />
      <div>
        Task deadline:
        {!selectedTask.deadline
          ? "No date selected"
          : sqlDateToDateString(selectedTask.deadline)}
      </div>
      <button>edit</button>
    </>
  );
};

export default TaskView;
