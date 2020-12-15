// useState to replace need for props usage
import React from "react";
import TodoList from "./TodoList";
import { useHistory } from "react-router-dom";
import { Icon } from "@material-ui/core";
import SearchBar from "./SearchBar";
import Sort from "./Sort";

const Home = ({
  todos,
  folders,
  handleDelete,
  closeNav,
  postTaskHandler,
  setSelectedTask,
  sortTodosHandler,
  searchData,
  sortAscending,
  setSortAscending,
  currSort,
}) => {
  let history = useHistory();
  let wrapperFunction = () => {
    closeNav();
    history.push("/add");
  };
  return (
    <div className="content">
      <div className="list-functions">
        <Sort
          sortAscending={sortAscending}
          sortTodosHandler={sortTodosHandler}
          setSortAscending={setSortAscending}
          currSort={currSort}
        />
        <SearchBar searchData={searchData} />

        <div className="add-btn">
          <Icon
            className="fa fa-plus-square"
            onClick={() => wrapperFunction()}
          />
        </div>
      </div>
      <TodoList
        selectFolder={null}
        todos={todos}
        folders={folders}
        handleDelete={handleDelete}
        postTaskHandler={postTaskHandler}
        setSelectedTask={setSelectedTask}
      />
    </div>
  );
};

export default Home;
