import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Course = () => {
  const { courseid } = useParams();
  const [course, setCourse] = useState(null);
  const [videos, setVideos] = useState([]); // Store fetched videos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:5000/api/courses/${courseid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourse(response.data);
      } catch (err) {
        setError("Failed to fetch course details.");
      } finally {
        setLoading(false);
      }
    };

    const checkEnrollment = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:5000/api/enrollment/${courseid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.enrolled) {
          setEnrolled(true);
        }
      } catch (err) {
        console.error("Enrollment check failed", err);
      }
    };

    const fetchVideos = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/course-videos/${courseid}`);
        setVideos(response.data);
      } catch (err) {
        console.error("Failed to fetch videos", err);
      }
    };

    fetchCourse();
    checkEnrollment();
    fetchVideos();
  }, [courseid]);

  const handleEnroll = async () => {
    try {
      setEnrolling(true);
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/enrollment",
        { course_id: courseid },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEnrolled(true);
    } catch (err) {
      alert("Enrollment failed. Try again.");
    } finally {
      setEnrolling(false);
    }
  };

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
        <div className="text-gray-600 mb-4">Enrollment: {course?.enrollment_count} students</div>

        <button
          onClick={handleEnroll}
          disabled={enrolling || enrolled}
          className={`w-full py-2 text-white font-semibold rounded-md ${
            enrolled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {enrolled ? "Enrolled" : enrolling ? "Enrolling..." : "Enroll Now"}
        </button>

        {/* Video Section */}
        <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Course Videos</h2>
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {videos.map((video) => (
            <div key={video.id} className="bg-gray-100 p-4 rounded-md shadow">
              <h3 className="text-lg font-semibold mb-2">{video.title}</h3>

              {/* Embed YouTube/Vimeo if the link contains their domains */}
              {video.video_url.includes("youtube.com") || video.video_url.includes("vimeo.com") ? (
                <iframe
                  className="w-full h-60 rounded-md"
                  src={video.video_url.replace("watch?v=", "embed/")} // Converts YouTube watch URL to embed URL
                  title={video.title}
                  allowFullScreen
                ></iframe>
              ) : (
                // Direct video embedding for MP4
                <video controls className="w-full h-60 rounded-md">
                  <source src={video.video_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No videos available for this course.</p>
      )}
    </div>

      </div>
    </div>
  );
};

export default Course;
