import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { Star, BookOpen, Clock } from "lucide-react";

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
        const res = await axios.get(`http://localhost:5000/api/enrollment/enhanced/${user.email}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!Array.isArray(res.data)) {
          setError("Invalid response format");
          setLoading(false);
          return;
        }

        setEnrolledCourses(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load enrolled courses");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [user]);

  if (loading) return <div className="flex items-center justify-center h-screen text-lg">Loading...</div>;
  if (error) return <div className="flex items-center justify-center h-screen text-lg text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">My Learning</h1>

        {enrolledCourses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">You haven't enrolled in any courses yet.</p>
            <Link
              to="/courses"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <div
                key={course.course_id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6"
              >
                <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
                  <img
                    src={course.thumbnail || "/course-placeholder.jpg"}
                    alt={course.course_name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/course-placeholder.jpg";
                    }}
                  />
                </div>

                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {course.course_name}
                  </h2>
                  <p className="text-gray-500 text-sm">{course.instructor_email}</p>
                </div>

                <div className="flex items-center gap-3 text-gray-600 text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <BookOpen size={18} className="text-blue-500" />
                    <span>{course.video_count} lessons</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={18} className="text-green-500" />
                    <span>{course.total_duration} mins</span>
                  </div>
                </div>

                <Link
                  to={`/mylearning/${course.course_id}`}
                  state={{ course }}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium"
                >
                  Continue Learning →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;