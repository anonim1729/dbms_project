import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; // Import Link
import axios from 'axios';
import { Star, BookOpen, Users, Clock, GraduationCap, ChevronLeft } from 'lucide-react';

const InstructorProfile = () => {
  const { email } = useParams();
  const [instructor, setInstructor] = useState(null);
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [instructorRes, coursesRes, statsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/users/instructors/${email}`),
          axios.get(`http://localhost:5000/api/courses/instructor/${email}`),
          axios.get(`http://localhost:5000/api/reviews/instructor/${email}`)
        ]);

        setInstructor(instructorRes.data);
        setCourses(coursesRes.data);
        setStats(statsRes.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load instructor profile');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [email]);

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={20}
        className={`${i < fullStars ? 'text-yellow-400 fill-current' : ''} 
          ${halfStar && i === fullStars ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
/>
    ));
  };

  if (loading) return <div className="text-center py-12">Loading profile...</div>;
  if (error) return <div className="text-center py-12 text-red-500">{error}</div>;
  if (!instructor) return <div className="text-center py-12">Instructor not found</div>;

  return (
    <div className="relative min-h-screen bg-gray-50 py-8">
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 px-4 py-2 bg-white shadow-sm rounded-lg hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-blue-200"
        >
          <ChevronLeft className="h-6 w-6 text-gray-600 group-hover:text-blue-700 transition-colors" />
          <span className="text-gray-700 font-medium group-hover:text-blue-700 transition-colors">
            Back
          </span>
        </button>
      </div>
      <div className="max-w-6xl mx-auto px-4">
        {/* Instructor Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center text-4xl font-bold text-blue-600">
              {instructor.f_name[0]}{instructor.l_name[0]}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {instructor.f_name} {instructor.l_name}
              </h1>
              <p className="text-gray-600 mb-4">{instructor.email}</p>
              <div className="flex items-center justify-center md:justify-start gap-4">
                <div className="flex items-center gap-1 text-gray-600">
                  <GraduationCap size={20} />
                  <span>{stats.total_students || 0} students</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <BookOpen size={20} />
                  <span>{courses.length} courses</span>
                </div>
                <div className="flex items-center gap-1">
                  {renderRatingStars(stats.average_rating || 0)}
                  <span className="text-gray-600">({stats.total_ratings || 0})</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Published Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <Link key={course.course_id} to={`/courses/${course.course_id}`} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <img
                  src={course.thumbnail}
                  alt={course.course_name}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{course.course_name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users size={16} />
                      <span>{course.enrollment_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{course.total_duration} mins</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-400" />
                      <span>{course.average_rating?.toFixed(1) || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {courses.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No courses published yet
            </div>
          )}
        </div>

        {/* Statistics Section */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{stats.total_courses || 0}</div>
              <div className="text-gray-600">Courses</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{stats.total_students || 0}</div>
              <div className="text-gray-600">Students</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {stats.average_rating?.toFixed(1) || 'N/A'}
              </div>
              <div className="text-gray-600">Avg Rating</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{stats.total_reviews || 0}</div>
              <div className="text-gray-600">Reviews</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfile;
