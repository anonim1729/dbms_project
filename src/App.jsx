import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import './App.css'

// import Courses from "./pages/Courses";
// import EnrolledCourses from "./pages/EnrolledCourses";
// import Login from "./pages/Login";
// import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route path="courses" element={<Courses />} />
          <Route path="my_learning" element={<EnrolledCourses />} /> */}
        </Route>
        {/* <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
