import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Star, Clock, BookOpen, User,ChevronLeft } from "lucide-react";

const Course = () => {
  const { user } = useAuth();
  const { courseid } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const token = localStorage.getItem("token");
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        // Fetch course details
        const courseRes = await axios.get(`http://localhost:5000/api/courses/${courseid}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Fetch enrollment status
        const enrollmentRes = await axios.get(
          `http://localhost:5000/api/enrollment/check/${user?.email}/${courseid}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Fetch reviews
        const reviewsRes = await axios.get(
          `http://localhost:5000/api/reviews/${courseid}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setCourse(courseRes.data);
        setIsEnrolled(enrollmentRes.data?.isEnrolled || false);
        setReviews(reviewsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseid, user]);

  const handleEnrollment = async () => {
    if (!user) return navigate("/login");
    
    try {
      await axios.post(
        "http://localhost:5000/api/enrollment",
        { email: user.email, course_id: courseid },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/mylearning/${courseid}`);
    } catch (err) {
      console.error("Enrollment failed:", err);
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="relative min-h-screen bg-gray-50 py-8 px-4">
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
      <div className="max-w-4xl mx-auto">
        {/* Course Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={course?.thumbnail || "/placeholder-course.jpg"}
              alt={course?.course_name}
              className="w-full md:w-64 h-48 object-cover rounded-lg"
            />
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4">{course?.course_name}</h1>
              
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <h4>Instructor:</h4>
                  <span>{course?.instructor_email}</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <BookOpen size={18} />
                  <span>{course?.video_count} Lessons</span>
                </div>
                
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock size={18} />
                  <span>{course?.total_duration} Minutes</span>
                </div>
              </div>

              <button
                onClick={isEnrolled ? () => navigate(`/mylearning/${courseid}`) : handleEnrollment}
                className={`w-full md:w-auto px-6 py-3 rounded-lg font-semibold ${
                  isEnrolled 
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isEnrolled ? "Continue Learning" : "Enroll Now"}
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mt-8">
          <h2 className="text-2xl font-bold mb-6">Student Reviews</h2>
          
          {reviews.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No reviews yet</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <div 
                  key={review.user_email} 
                  className="bg-gray-50 rounded-lg p-4 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="font-medium text-blue-600">
                        {review.user_email[0].toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{review.user_email}</h4>
                      <div className="flex items-center gap-1 text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className={i < review.rating ? "fill-current" : "text-gray-300"}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 pl-2">{review.review}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Course;