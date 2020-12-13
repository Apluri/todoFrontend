import "./App.scss";
import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import axios from "axios";

// local components
import Header from "./components/Header";
import Home from "./components/Home";
import Folders from "./components/Folders";
import Settings from "./components/Settings";
import AddTodo from "./components/AddTodo";
import LeftNav from "./components/LeftNav";
import Layout from "./components/Layout";
import TaskView from "./components/TaskView";

const App = () => {
  // simulates tasklist fetched from backend
  let url = "";
  const [queryArgs, setQueryArgs] = useState("?sorted=asc&by=title");
  const sortAscending = useRef(true);

  const useLocalHost = false; // change this to true if u want to use localHost, make sure to start your localhost server then
  useLocalHost
    ? (url = "http://localhost:8080/api")
    : (url = "https://tamk-4a00ez62-3001-group04.herokuapp.com/api");

  const [todos, setTodos] = useState([]);
  const [folders, setFolders] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryArgs]);

  const searchData = async (str) => {
    // fetch all in case of null
    str === null ? setQueryArgs("") : setQueryArgs(`?search=${str}`);
  };
  const changeSort = (table) => {
    let order;
    console.log(sortAscending.current);
    sortAscending.current ? (order = "asc") : (order = "desc");
    sortAscending.current = !sortAscending.current;
    setQueryArgs(`?sorted=${order}&by=${table}`);
  };
  const fetchData = () => {
    const fetchTable = async (table, query = "") => {
      const response = await axios.get(url + "/" + table + query);
      //console.log(response.data);
      return response.data;
    };

    Promise.all([fetchTable("tasks", queryArgs), fetchTable("folders")])
      .then((data) => {
        setTodos(data[0]);
        setFolders(data[1]);
      })
      .catch((e) => console.log(e));
  };

  const postTaskHandler = async (task) => {
    try {
      if (task.id !== undefined) {
        await axios.post(url + `/tasks/${task.id}`, {
          ...task,
        });
      } else {
        await axios.post(url + "/tasks", {
          ...task,
        });
      }

      fetchData(); // Fetch tasks again after a successful post request
    } catch (e) {
      console.log(e);
    }
  };

  const postFolderHandler = async (folder) => {
    try {
      await axios.post(url + `/folders`, { ...folder });
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (id) => {
    const res = await axios.delete(url + "/tasks/" + id);
    // 204 = ok no content
    if (res.status !== 204) {
      console.log("error while deleting");
      console.log(res);
    }
    fetchData();
  };
  const handleFolderDelete = async (id) => {
    const res = await axios.delete(url + "/folders/" + id);
    if (res.status !== 204) {
      console.log("error while deleting");
      console.log(res);
    }
    fetchData();
  };
  const [navSize, setNavSize] = useState("0px");
  let smallScreen = useMediaQuery({ query: "(max-width: 900px)" });
  const CloseNav = () => {
    if (smallScreen) {
      setNavSize("0px");
    }
  };
  const HandleNavSizeChange = () => {
    smallScreen
      ? setNavSize(navSize === "100%" ? "0%" : "100%")
      : setNavSize(navSize === "300px" ? "0px" : "300px");
  };

  return (
    <BrowserRouter>
      <Header searchData={searchData} />
      <LeftNav navSize={navSize} handleNavSizeChange={HandleNavSizeChange} />
      <Layout navSize={navSize}>
        <Switch>
          <Route exact path="/">
            <Home
              todos={todos}
              folders={folders}
              handleDelete={handleDelete}
              closeNav={CloseNav}
              navSize={navSize}
              postTaskHandler={postTaskHandler}
              setSelectedTask={setSelectedTask}
              changeSort={changeSort}
            />
          </Route>

          <Route path="/folders">
            <Folders
              todos={todos}
              folders={folders}
              handleDelete={handleDelete}
              closeNav={CloseNav}
              navSize={navSize}
              postTaskHandler={postTaskHandler}
              setSelectedTask={setSelectedTask}
              changeSort={changeSort}
              handleFolderDelete={handleFolderDelete}
            />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/add">
            <AddTodo
              todos={todos}
              folders={folders}
              setTodos={setTodos}
              navSize={navSize}
              postTaskHandler={postTaskHandler}
              postFolderHandler={postFolderHandler}
            />
          </Route>
          <Route path="/task">
            <TaskView
              folders={folders}
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
              postTaskHandler={postTaskHandler}
              postFolderHandler={postFolderHandler}
              todos={todos}
              handleDelete={handleDelete}
            />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
