// React entry point that mounts the app and global styles.
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

/**
 * React entrypoint for the SPA.
 */

// Render the App component inside the root element.
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
