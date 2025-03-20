import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Star } from "lucide-react";

const EnrolledCourse = () => {
  const { enrolledCourseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState(location.state?.course || null);
  const [videos, setVideos] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve the token
  
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/courses/${enrolledCourseId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCourse(res.data);
      } catch (err) {
        if (err.response?.data?.login === false) {
          navigate("/login");
        }
        console.error("Failed to load course details.");
      }
    };
  
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/course-videos/${enrolledCourseId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setVideos(res.data);
      } catch (err) {
        console.error("Failed to load videos.");
      }
    };
  
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/reviews/${enrolledCourseId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setReviews(res.data);
        if (res.data.some((r) => r.user_email === user.email)) setHasReviewed(true);
      } catch (err) {
        console.error("Failed to load reviews.");
      }
    };
  
    if (!course) {
      fetchCourse();
    }
    fetchVideos();
    fetchReviews();
    setLoading(false);
  }, [enrolledCourseId, user, course]);
  

  const handleReviewSubmit = async () => {
    if (!reviewText.trim()) {
      alert("Review cannot be empty.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/reviews", {
        course_id: enrolledCourseId,
        user_email: user.email,
        review: reviewText,
        rating,
      });

      setReviews([...reviews, { user_email: user.email, review: reviewText, rating }]);
      setHasReviewed(true);
      setReviewText("");
    } catch (error) {
      console.error("Failed to submit review:", error);
      alert("Failed to submit review");
    }
  };

  if (loading)
    return <div className="flex items-center justify-center h-screen text-lg">Loading...</div>;

  if (!course)
    return <div className="flex items-center justify-center h-screen text-lg text-red-500">Course not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Course Hero Section */}
      <div className="bg-gray-500 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Thumbnail */}
            <div className="w-full md:w-2/5 lg:w-1/3">
              <img
                src={course.thumbnail || "/course-placeholder.jpg"}
                alt={course.course_name}
                className="w-full h-64 object-cover rounded-xl shadow-lg"
                onError={(e) => {
                  e.target.src = "/course-placeholder.jpg";
                }}
              />
            </div>

            {/* Course Info */}
            <div className="flex-1 space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                {course.course_name}
              </h1>
              <p className="text-lg text-gray-300">{course.description}</p>
              <div className="flex items-center gap-2 text-sm">
                <span className="bg-gray-800 px-3 py-1 rounded-full">
                  Instructor: {course.instructor_email}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Videos Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Course Content</h2>
          {videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div key={video.video_url} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="aspect-video bg-gray-100">
                    {video.video_url.includes("youtube.com") || video.video_url.includes("vimeo.com") ? (
                      <iframe
                        className="w-full h-full"
                        src={video.video_url.replace("watch?v=", "embed/")}
                        title={video.title}
                        allowFullScreen
                      />
                    ) : (
                      <video controls className="w-full h-full">
                        <source src={video.video_url} type="video/mp4" />
                      </video>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900">{video.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-500">No videos available yet</p>
            </div>
          )}
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Student Reviews</h2>
            <div className="flex items-center gap-2">
              <Star className="text-yellow-500" size={20} />
              <span className="text-gray-600">
                {reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length || 0}/5
              </span>
            </div>
          </div>

          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {reviews.map((review, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-gray-700">{review.user_email}</p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={i < review.rating ? "text-yellow-500" : "text-gray-300"}
                          fill={i < review.rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">{review.review}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No reviews yet. Be the first to review!</p>
          )}

          {/* Review Form */}
          {!hasReviewed && (
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Write a Review</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        onClick={() => setRating(num)}
                        className={`p-2 rounded-md ${
                          rating >= num
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <Star size={20} fill="currentColor" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Review</label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows="4"
                    placeholder="Share your experience with this course..."
                  />
                </div>

                <button
                  onClick={handleReviewSubmit}
                  className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Review
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourse;
