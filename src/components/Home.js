// useState to replace need for props usage
import React from "react";
import TodoList from "./TodoList";
import { useHistory } from "react-router-dom";
import { Icon } from "@material-ui/core";

const Home = ({
  todos,
  folders,
  handleDelete,
  closeNav,
  postTaskHandler,
  setSelectedTask,
  sortTodosHandler,
}) => {
  let history = useHistory();
  let wrapperFunction = () => {
    closeNav();
    history.push("/add");
  };
  return (
    <>
      <TodoList
        selectFolder={null}
        todos={todos}
        folders={folders}
        handleDelete={handleDelete}
        postTaskHandler={postTaskHandler}
        setSelectedTask={setSelectedTask}
        sortTodosHandler={sortTodosHandler}
      />

      <div className="add-btn">
        <Icon
          classes
          className="fa fa-plus-circle"
          style={{ fontSize: 100 }}
          onClick={() => wrapperFunction()}
        />
      </div>
    </>
  );
};

export default Home;
