import "./App.css";
// useState to replace need for props usage
import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import Root from "./components/Root";
import Header from "./components/Header";
import Home from "./components/Home";
import Folders from "./components/Folders";
import Settings from "./components/Settings";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path={"/"} exact component={Home}></Route>
        <Route path={"/home"} component={Home}></Route>
        <Route path={"/folders"} component={Folders}></Route>
        <Route path={"/settings"} component={Settings}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;

// <Header /> used to be <Root />
