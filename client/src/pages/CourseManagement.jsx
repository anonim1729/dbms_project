import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Search, Filter, Trash2, Plus } from 'lucide-react';
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('newest');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log("Instructor email:", user.email);
        const response = await axios.get(`http://localhost:5000/api/courses/instructor/${user.email}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (Array.isArray(response.data)) {
          setCourses(response.data);
        } else {
          setError('Invalid response format');
        }
      } catch (err) {
        setError('Failed to fetch courses');
        if (err.response?.status === 401) logout();
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [logout]);

  const filteredCourses = courses
    .filter(course =>
      course.course_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) =>
      filter === 'newest' ?
        new Date(b.created_at) - new Date(a.created_at) :
        new Date(a.created_at) - new Date(b.created_at)
    );

  const deleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCourses(courses.filter(course => course.course_id !== courseId));
    } catch (err) {
      setError('Failed to delete course');
      if (err.response?.status === 401) logout();
    }
  };

  if (loading) return <div className="text-center py-8">Loading courses...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>

          <Link
            to="/course-management/create_course"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 border border-blue-700"
          >
            <Plus size={20} />
            Create New Course
          </Link>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-3.5 text-gray-500" size={20} />
          </div>

          <div className="relative">
            <select
              className="appearance-none pl-10 pr-8 py-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            <Filter className="absolute left-3 top-3.5 text-gray-500" size={20} />
            <div className="absolute right-3 top-3.5 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div
              key={course.course_id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out transform border-2 border-gray-200"
            >
              <img
                src={course.thumbnail || 'https://via.placeholder.com/300x150'}
                alt={course.course_name}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full border border-blue-200">
                    {course.category_name}
                  </span>
                  <button
                    onClick={(e) => {  // Prevent navigation when clicking the delete button
                      e.stopPropagation();
                      deleteCourse(course.course_id);
                    }}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <h3 className="text-xl font-semibold mb-2">{course.course_name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>{new Date(course.created_at).toLocaleDateString()}</span>
                  <span>{course.enrollment_count} students</span>
                </div>

                {/* Add Video Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`create_course/add_videos`, {
                      state: { courseId: course.course_id }
                    }); // Navigate to the add video route
                  }}
                  className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Add Video
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12 text-gray-600 border-2 border-gray-200 rounded-xl">
            <p className="text-lg font-medium">No courses found</p>
            <p className="mt-2">Try adjusting your search or create a new course</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseManagement;
