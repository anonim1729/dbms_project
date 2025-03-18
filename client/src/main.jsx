import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
<<<<<<< HEAD
import { AuthProvider } from "./context/AuthContext"; 
=======
import { AuthProvider } from "./context/AuthContext"; // Ensure correct path
import { InstructorsProvider } from "./context/InstructorsContext";
>>>>>>> nandeesh

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <InstructorsProvider>
        <App />
      </InstructorsProvider>
    </AuthProvider>
  </BrowserRouter>
);
