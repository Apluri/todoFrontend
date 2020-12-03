import React from "react";

const Layout = (props) => (
  <div className="content">
    <div className={props.navSize === "100%" ? "blur" : ""}>
      {props.children}
    </div>
  </div>
);

export default Layout;
