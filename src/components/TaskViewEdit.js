import React, { useState } from "react";
import Calendar from "react-calendar";

const TaskViewEdit = ({ folders, selectedTask, postTaskHandler }) => {
  // title
  const [currInput, setCurrInput] = useState(selectedTask.title);

  // description
  const [dCurrInput, setDCurrInput] = useState(selectedTask.description);

  // calendar
  const [calendarValue, setCalendarValue] = useState(
    selectedTask.deadline === null ? null : new Date(selectedTask.deadline)
  );

  //folder

  return (
    <>
      <form>
        <input
          type="text"
          placeholder="Task title"
          value={currInput}
          onChange={(e) => setCurrInput(e.target.value)}
        />
      </form>
      <br />
      <form>
        <div className="description-box">
          <textarea
            type="text"
            placeholder="Task description (optional)"
            value={dCurrInput}
            onChange={(e) => setDCurrInput(e.target.value)}
          />
        </div>
      </form>
      <br />
      Folder selected: <br />
      Date selected:{" "}
      {calendarValue === null && selectedTask.deadline === null
        ? "nothing"
        : calendarValue === null && selectedTask.deadline !== null
        ? new Date(selectedTask.deadline).toDateString()
        : calendarValue.toDateString()}
      <div className="calendar-container">
        <Calendar
          value={calendarValue}
          locale={"en-EN"}
          onChange={setCalendarValue}
        />
      </div>
      <button>Delete task</button>
    </>
  );
};

export default TaskViewEdit;
