import React from "react";
import ReactDOM from "react-dom/client";
import { AuthContextProvider } from "./context/auth-context";

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
// We will wrap Provider around the whole app
root.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
