import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import AuthPages from "./AuthPages";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthPages />
  </BrowserRouter>
);
