import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Course = () => {
  const { user } = useAuth();
  const { courseid } = useParams(); 
  const token = localStorage.getItem("token");

  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/courses",{
          headers: { Authorization: `Bearer ${token}` }
        });
        const foundCourse = response.data.find((c) => String(c.course_id) === String(courseid));

        if (foundCourse) {
          setCourse(foundCourse);
          setIsEnrolled(foundCourse.isEnrolled === 1);
        } else {
          setCourse(null);
        }
      } catch (err) {
        setError("Failed to fetch course data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseid]);

  const handleEnroll = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/enrollment",
        { email: user.email, course_id: courseid },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIsEnrolled(true);
      setCourse((prev) => ({ ...prev, isEnrolled: 1 })); // Update local state
    } catch (err) {
      setError("Failed to enroll.");
    }
  };

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;
  if (!course) return <div className="text-center text-red-500">Course not found.</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6 border">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.course_name}</h1>
        <p className="text-gray-600 mb-4">{course.description}</p>

        <div className="mb-4">
          <span className="text-gray-500 font-semibold">Instructor:</span>{" "}
          <span className="text-gray-800">{course.instructor_name}</span>
        </div>

        <button
          onClick={handleEnroll}
          disabled={isEnrolled}
          className={`w-full py-3 rounded-lg font-semibold transition ${
            isEnrolled
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isEnrolled ? "Already Enrolled" : "Enroll Now"}
        </button>

        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Course;
