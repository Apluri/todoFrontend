import React from "react";

const Layout = (props) => (
  <div className={props.navSize === "100%" ? "blur" : ""}>{props.children}</div>
);

export default Layout;
