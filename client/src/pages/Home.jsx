import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from 'axios';
import '../index.css';

const Home = () => {
  const [topCourses, setTopCourses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const coursesRes = await axios.get('http://localhost:5000/api/courses', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTopCourses(coursesRes.data.slice(0, 5));

        const reviewsRes = await axios.get('http://localhost:5000/api/reviews', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setReviews(reviewsRes.data.slice(0, 6));

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to Wisdomize</h1>
          <p className="text-xl mb-8 max-w-2xl">
            Your gateway to the best online learning experience. Unlock knowledge, enhance skills, and grow with our expert-led courses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/courses" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors text-center font-semibold"
            >
              Explore Courses
            </Link>
            <Link 
              to="/my-learning" 
              className="border-2 border-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors text-center"
            >
              My Learning
            </Link>
          </div>
        </div>
      </section>

      {/* Top Courses Carousel */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Top Courses</h2>
          <Carousel 
            showArrows={true}
            showThumbs={false}
            autoPlay={true}
            infiniteLoop={true}
            interval={3000}
            showStatus={false}
            centerMode={true}
            centerSlidePercentage={33.33}
            renderArrowPrev={(clickHandler, hasPrev) => (
              <button
                onClick={clickHandler}
                className="absolute top-1/2 left-0 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transform -translate-y-1/2"
                aria-label="Previous course"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            renderArrowNext={(clickHandler, hasNext) => (
              <button
                onClick={clickHandler}
                className="absolute top-1/2 right-0 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transform -translate-y-1/2"
                aria-label="Next course"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          >
            {topCourses.map(course => (
              <div key={course.course_id} className="px-2 h-full">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col">
                  <img 
                    src={course.thumbnail} 
                    alt={course.course_name} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-2">{course.course_name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">{course.description}</p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-blue-600 font-medium">
                        {course.enrollment_count} enrolled
                      </span>
                      <Link 
                        to={`/courses/${course.course_id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        View Course
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Student Reviews</h2>
          <Carousel
            showArrows={true}
            showThumbs={false}
            autoPlay={true}
            infiniteLoop={true}
            interval={4000}
            showStatus={false}
            centerMode={true}
            centerSlidePercentage={50}
            renderArrowPrev={(clickHandler, hasPrev) => (
              <button
                onClick={clickHandler}
                className="absolute top-1/2 left-0 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transform -translate-y-1/2"
                aria-label="Previous review"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            renderArrowNext={(clickHandler, hasNext) => (
              <button
                onClick={clickHandler}
                className="absolute top-1/2 right-0 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transform -translate-y-1/2"
                aria-label="Next review"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          >
            {reviews.map(review => (
              <div key={review.id} className="px-2 h-full">
                <div className="bg-gray-50 p-6 rounded-xl h-full">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                      {review.user_email?.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold">{review.user_email}</p>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <span 
                            key={i} 
                            className={`text-xl ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.review}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Contributors Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Contributors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  J
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">John Doe</h3>
                  <p className="text-gray-600">Lead Developer</p>
                </div>
              </div>
              <p className="text-gray-700">Responsible for backend development and system architecture.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  S
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold">Sarah Smith</h3>
                  <p className="text-gray-600">Frontend Developer</p>
                </div>
              </div>
              <p className="text-gray-700">Responsible for UI/UX design and frontend implementation.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;