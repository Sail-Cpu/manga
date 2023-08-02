import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/style.scss";
import { UserContextProvider } from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserContextProvider>
    <App />
  </UserContextProvider>
);
