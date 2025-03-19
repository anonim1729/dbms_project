import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import CreateCategory from "./pages/CreateCategory";
import CourseManagement from "./pages/CourseManagement.jsx";
import CreateCourse from "./pages/CreateCourse.jsx";
import AddVideos from "./pages/AddVideos.jsx";
import Unauthorized from "./pages/Unauthorized";
import PrivateRoute from "./routes/PrivateRoute";
import Courses from "./pages/Courses.jsx";
import Course from "./pages/Course.jsx";
import Layout from "./layouts/Layout.jsx";
import MyLearning from "./pages/MyLearning.jsx";
import CourseManagementLayout from "./layouts/CourseManagementLayout"
import InstructorsPage from "./pages/Instructors.jsx";
import InstructorProfile from "./pages/InstructorProfile.jsx";
import EnrolledCourse from "./pages/EnrolledCourse.jsx";

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Instructors" element={<InstructorsPage/>} />
        <Route path="/instructors/:email" element={<InstructorProfile />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Private Routes - Authenticated Users */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Admin-only Routes */}
        <Route
          path="/categories"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <Categories />
            </PrivateRoute>
          }
        />
        <Route
          path="/categories/create"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <CreateCategory />
            </PrivateRoute>
          }
        />

        {/* Courses Routes */}
        <Route path="/courses" element={<Layout />}>
          <Route index element={<Courses />} />
          <Route path=":courseid" element={<Course />} /> {/* Fixed dynamic route */}
        </Route>

        {/*My Learning*/}
        <Route path='/mylearning' element={<Layout/>}>
        <Route index element={<MyLearning/>}/>
        <Route path=":enrolledCourseId" element={<EnrolledCourse />} />
        </Route>
        {/* Course Management Routes for Instructors */}
        <Route
          path="/course-management"
          element={
            <PrivateRoute allowedRoles={["instructor"]}>
              <CourseManagementLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<CourseManagement />} />
          <Route path="create_course" element={<CreateCourse />} />
          <Route path="create_course/add_videos" element={<AddVideos />} />
        </Route>
      </Routes>
      <Footer />
    </AuthProvider>
  );
}
