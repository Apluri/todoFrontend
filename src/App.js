import "./App.css";
// useState to replace need for props usage
import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import Root from "./components/Root";
import Header from "./components/Header";
import Home from "./components/Home";
import Folders from "./components/Folders";
import Settings from "./components/Settings";
import AddTodo from "./components/AddTodo";

const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, task: "Mee toihi" },
    { id: 2, task: "Tiskaa" },
  ]);
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => <Home {...props} todos={todos} />}
        />
        <Route
          path="/home"
          render={(props) => <Home {...props} todos={todos} />}
        />
        <Route path={"/folders"} component={Folders}></Route>
        <Route path={"/settings"} component={Settings}></Route>
        <Route path={"/add"} component={AddTodo}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;

// <Header /> used to be <Root />
// <Route path={"/"} exact component={Home}></Route>
