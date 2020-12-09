import React, { useState } from "react";
import Calendar from "react-calendar";

const TaskViewEdit = ({ folders, selectedTask }) => {
  const [value, setValue] = useState(null);

  return (
    <>
      <form>
        <input
          type="text"
          placeholder="Task title"
          value={selectedTask.title}
        />
      </form>
      <br />
      <form>
        <div className="description-box">
          <textarea
            type="text"
            placeholder="Task description (optional)"
            value={selectedTask.description ? selectedTask.description : ""}
          />
        </div>
      </form>
      <br />
      Date selected:{" "}
      {value === null && selectedTask.deadline === null
        ? "nothing"
        : value === null && selectedTask.deadline !== null
        ? new Date(selectedTask.deadline).toDateString()
        : value.toDateString()}
      <div className="calendar-container">
        <Calendar value={null} locale={"en-EN"} onChange={setValue} />
      </div>
    </>
  );
};

export default TaskViewEdit;
