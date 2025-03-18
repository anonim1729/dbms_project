import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext"; // Ensure correct path
import { InstructorsProvider } from "./context/InstructorsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <InstructorsProvider>
        <App />
      </InstructorsProvider>
    </AuthProvider>
  </BrowserRouter>
);
