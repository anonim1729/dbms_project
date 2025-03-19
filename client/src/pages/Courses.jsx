import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCourse } from '../context/CoursesContext';

const Courses = () => {
  const {courses,setCourses}=useCourse();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/courses', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCourses(response.data);
      } catch (err) {
        console.log(err)
        setError('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  console.log(courses);

  if (loading) return <div className="text-center py-8 text-xl">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">Available Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div 
            courseid={course.course_id}
            key={course.course_id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <img 
                src={course?.thumbnail || "default-thumbnail.jpg"} 
                alt={course?.course_name || "Course Thumbnail"} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{course?.course_name || "Untitled Course"}</h3>
                <p className="text-gray-600 line-clamp-2 mb-4">{course?.description || "No description available."}</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-medium">
                    {course?.enrolled ?? 0} enrolled
                  </span>
                  <Link 
                    to={`/courses/${course?.course_id || course?.id}`} 
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    View Course
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
