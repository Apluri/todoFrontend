import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import Root from "./components/Root";
import Header from "./components/Header";
import Home from "./components/Home";
import Folders from "./components/Folders";
import Settings from "./components/Settings";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { example1: ["lol", 123], example2: "kissa" };
    console.log(props);
    console.log(this.state);
  }

  render() {
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
  }
}

export default App;

// <Header /> used to be <Root />
