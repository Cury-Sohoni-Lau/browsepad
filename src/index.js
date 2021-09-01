import React from "react";
import ReactDOM from "react-dom";
import Store from "./Store";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Store>
      <App />
    </Store>
  </React.StrictMode>,
  document.getElementById("root")
);
