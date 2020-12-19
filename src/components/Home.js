// useState to replace need for props usage
import React from "react";
import TodoList from "./TodoList";
import SearchBar from "./SearchBar";
import Sort from "./Sort";

const Home = ({
  todos,
  folders,
  handleDelete,
  postTaskHandler,
  setSelectedTask,
  sortTodosHandler,
  searchData,
  sortAscending,
  setSortAscending,
  currSort,
}) => {
  return (
    <div className="content">
      <div className="sort-and-search">
        <Sort
          sortAscending={sortAscending}
          sortTodosHandler={sortTodosHandler}
          setSortAscending={setSortAscending}
          currSort={currSort}
        />
        <SearchBar searchData={searchData} />
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
