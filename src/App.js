import "./App.scss";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import axios from "axios";

// local components
import Header from "./components/Header";
import Home from "./components/Home";
import Folders from "./components/Folders";
import Settings from "./components/Settings";
import AddTodo from "./components/AddTodo";
import LeftNav from "./components/LeftNav";

const App = () => {
  // simulates tasklist fetched from backend
  let url = "";
  const useLocalHost = true; // change this to true if u want to use localHost, make sure to start your localhost server then
  useLocalHost
    ? (url = "http://localhost:8080/api/")
    : (url = "https://tamk-4a00ez62-3001-group04.herokuapp.com/api/");

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(url + "/tasks");
      setTodos(response.data);
    } catch (e) {
      console.log(e);
    }
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

      fetchTasks(); // Fetch tasks again after a successful post request
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
    fetchTasks();
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
  // deletes task by given id from state
  // TODO change this to delete from sql server

  return (
    <BrowserRouter>
      <Header handleNavSizeChange={HandleNavSizeChange} />
      <LeftNav navSize={navSize} handleNavSizeChange={HandleNavSizeChange} />

      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>

        <Route
          path="/home"
          render={(props) => (
            <Home
              {...props}
              todos={todos}
              handleDelete={handleDelete}
              closeNav={CloseNav}
              navSize={navSize}
              postTaskHandler={postTaskHandler}
            />
          )}
        />
        <Route path={"/folders"} component={Folders} />
        <Route path={"/settings"} component={Settings} />
        <Route
          path="/add"
          render={(props) => (
            <AddTodo
              {...props}
              todos={todos}
              setTodos={setTodos}
              navSize={navSize}
              postTaskHandler={postTaskHandler}
            />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
