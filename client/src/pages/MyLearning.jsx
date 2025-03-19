import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

const MyLearning = () => {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.email) return;
    const token = localStorage.getItem('token');
    const fetchEnrolledCourses = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/enrollment/${user.email}`,{
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!Array.isArray(res.data)) {
          setError("Invalid response format");
          setLoading(false);
          return;
        }

        const courseRequests = res.data.map((enrollment) =>
          axios.get(`http://localhost:5000/api/courses/${enrollment.course_id}`,{
            headers: { Authorization: `Bearer ${token}` }
          }).then((res) => res.data)
        );

        const courses = await Promise.all(courseRequests);
        setEnrolledCourses(courses);
      } catch (err) {
        console.error(err);
        setError("Failed to load enrolled courses");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [user]);
  if (loading)
    return <div className="flex items-center justify-center h-screen text-lg">Loading...</div>;
  if (error)
    return <div className="flex items-center justify-center h-screen text-lg text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">My Learning</h1>

        {enrolledCourses.length === 0 ? (
          <p className="text-lg text-gray-600 text-center">You have not enrolled in any courses yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <Link
                key={course.course_id}
                to={`/mylearning/${course.course_id}`}
                state={{ course }} // Passing the course details as a prop
                className="block bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
              >
                <img
                  src={course.thumbnail || "https://via.placeholder.com/300"} // Placeholder image
                  alt={course.name}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h2 className="text-xl font-semibold text-gray-900 mt-3">{course.name}</h2>
                <p className="text-sm text-gray-500">Instructor Email: {course.instructor_email}</p>
                <p className="text-gray-600 mt-2 line-clamp-2">{course.description}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;
