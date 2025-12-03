import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// Routing is handled inside App.jsx using react-router-dom.
// Removed unused page imports to fix Vite import resolution error.

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);