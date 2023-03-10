import React from "react";
import ReactDOM from "react-dom";

import "./BackDrop.css";

const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <div className="back-drop" onClick={props.onClick}></div>,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrop;
