import "./App.scss";
// useState to replace need for props usage
import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { useMediaQuery } from "react-responsive";

// import Root from "./components/Root";
import Header from "./components/Header";
import Home from "./components/Home";
import Folders from "./components/Folders";
import Settings from "./components/Settings";
import AddTodo from "./components/AddTodo";
import LeftNav from "./components/LeftNav";
const App = () => {
  // simulates tasklist fetched from backend
  const [todos, setTodos] = useState([
    { id: 1, task: "Mee toihi" },
    { id: 2, task: "Tiskaa" },
  ]);
  const [navSize, setNavSize] = useState("0px");
  let smallScreen = useMediaQuery({ query: "(max-width: 900px)" });
  const HandleNavSizeChange = () => {
    smallScreen
      ? setNavSize(navSize === "200px" ? "0px" : "200px")
      : setNavSize(navSize === "600px" ? "0px" : "600px");
  };
  // deletes task by given id from state
  // TODO change this to delete from sql server
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <BrowserRouter>
      <Header handleNavSizeChange={HandleNavSizeChange} />
      <LeftNav navSize={navSize} handleNavSizeChange={HandleNavSizeChange} />
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => (
            <Home {...props} todos={todos} handleDelete={handleDelete} />
          )}
        />
        <Route
          path="/home"
          render={(props) => (
            <Home {...props} todos={todos} handleDelete={handleDelete} />
          )}
        />
        <Route path={"/folders"} component={Folders} />
        <Route path={"/settings"} component={Settings} />
        <Route
          path="/add"
          render={(props) => (
            <AddTodo {...props} todos={todos} setTodos={setTodos} />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;

// <Header /> used to be <Root />
