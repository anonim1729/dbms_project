import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Course = () => {
  const { courseid } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/courses/${courseid}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCourse(response.data);
      } catch (err) {
        setError("Failed to fetch course details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseid]);

  if (loading) return <div className="text-center py-8 text-xl">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!course) return <div className="text-center py-8 text-red-500">Course not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <img src={course?.thumbnail} alt={course?.course_name} className="w-full h-60 object-cover rounded-md mb-6" />
        <h1 className="text-3xl font-bold mb-4">{course?.course_name}</h1>
        <p className="text-gray-700 mb-4">{course?.description}</p>
        <div className="text-lg font-semibold text-blue-600 mb-2">Instructor: {course?.instructor}</div>
        <div className="text-gray-600">Enrollment: {course?.enrollment_count} students</div>
      </div>
    </div>
  );
};

export default Course;
