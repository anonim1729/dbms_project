import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCourse } from '../context/CoursesContext';
import { Star, Search, BookOpen, Clock } from 'lucide-react';

const Courses = () => {
  const { courses, setCourses } = useCourse();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Fetch courses with ratings
        const coursesResponse = await axios.get('http://localhost:5000/api/courses', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCourses(coursesResponse.data);

        // Fetch categories
        const categoriesResponse = await axios.get('http://localhost:5000/api/categories', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCategories(categoriesResponse.data);

      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.course_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                          course.category_name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderRatingStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={18}
        className={index < Math.round(rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}
      />
    ));
  };

  if (loading) return <div className="text-center py-8 text-xl">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">Available Courses</h2>
        
        {/* Search and Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-3.5 text-gray-500" size={20} />
          </div>
          
          <select
            className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category.category_name} value={category.category_name}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div 
              key={course.course_id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6"
            >
              <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
                <img
                  src={course.thumbnail || "/course-placeholder.jpg"}
                  alt={course.course_name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {course.category_name}
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-2">{course.course_name}</h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-4">{course.description}</p>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {renderRatingStars(course.average_rating || 0)}
                    <span className="ml-1">({course.enrolled_count || 0} enrolled)</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen size={18} className="text-blue-500" />
                  <span>{course.video_count} lessons</span>
                </div>
              </div>

              <Link
                to={`/courses/${course.course_id}`}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center transition-colors"
              >
                View Course
              </Link>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No courses found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;