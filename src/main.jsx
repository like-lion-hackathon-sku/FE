// src/main.jsx
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const rootEl = document.getElementById("root");

if (!rootEl) {
  throw new Error("Root element with id='root' not found");
}

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>
);
