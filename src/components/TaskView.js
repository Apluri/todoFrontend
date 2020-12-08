import React from "react";
import { useHistory } from "react-router-dom";

const TaskView = ({ folders, selectedTask }) => {
  const history = useHistory();
  const redirect = () => {
    history.push("/");
  };
  const checkIfNull = (argument) => {
    return argument === null ? true : false;
  };
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

  return checkIfNull(selectedTask) ? (
    <> {redirect()}</>
  ) : (
    <>
      <h2>{selectedTask.title}</h2>
      <form>
        <div className="description-box">
          <textarea
            type="text"
            placeholder={
              checkIfNull(selectedTask.description) ? "enter description" : ""
            }
            value={
              checkIfNull(selectedTask.description)
                ? ""
                : selectedTask.description
            }
          />
        </div>
      </form>
      <button>save</button>
      <br />
      <>
        Task deadline:{" "}
        {checkIfNull(selectedTask.deadline)
          ? "No date selected"
          : sqlDateToDateString(selectedTask.deadline)}
      </>
      <button>edit</button>
    </>
  );
};

export default TaskView;
