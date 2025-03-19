import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { Star } from "lucide-react";

const EnrolledCourse = () => {
  const { enrolledCourseId } = useParams();
  const location = useLocation();
  const { user } = useAuth();
  const [course, setCourse] = useState(location.state?.course || null);
  const [videos, setVideos] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/courses/${enrolledCourseId}`);
        setCourse(res.data);
      } catch (err) {
        console.error("Failed to load course details.");
      }
    };

    const fetchVideos = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/course-videos/${enrolledCourseId}`);
        setVideos(res.data);
      } catch (err) {
        console.error("Failed to load videos.");
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/reviews/${enrolledCourseId}`);
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
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{course.course_name}</h1>
        <p className="text-gray-700">{course.description}</p>

        {/* Course Videos */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800">Course Videos</h2>
          {videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {videos.map((video) => (
                <div key={video.video_url} className="bg-white rounded-xl shadow-md p-4">
                  <h3 className="text-lg font-medium">{video.title}</h3>

                  {/* Embed YouTube/Vimeo if the link contains their domains */}
                  {video.video_url.includes("youtube.com") || video.video_url.includes("vimeo.com") ? (
                    <iframe
                      className="w-full h-60 rounded-md mt-2"
                      src={video.video_url.replace("watch?v=", "embed/")}
                      title={video.title}
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video controls className="w-full h-60 rounded-md mt-2">
                      <source src={video.video_url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-2">No videos available for this course.</p>
          )}
        </div>

        {/* Reviews Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">Reviews</h2>
          {reviews.length > 0 ? (
            <div className="mt-4 space-y-4">
              {reviews.map((review, index) => (
                <div key={index} className="bg-white p-4 rounded-md shadow-md">
                  <p className="font-semibold">{review.user_email}</p>
                  <div className="flex items-center gap-1 text-yellow-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-gray-600">{review.review}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-2">No reviews yet.</p>
          )}

          {!hasReviewed && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Leave a Review</h3>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full p-3 border rounded-md mt-2"
                rows="3"
                placeholder="Write your review here..."
              ></textarea>
              <div className="flex items-center gap-2 mt-2">
                <label className="text-gray-700">Rating:</label>
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => setRating(num)}
                    className={`p-1 ${rating >= num ? "text-yellow-500" : "text-gray-300"}`}
                  >
                    <Star size={20} fill="currentColor" />
                  </button>
                ))}
              </div>
              <button
                onClick={handleReviewSubmit}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Submit Review
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourse;
