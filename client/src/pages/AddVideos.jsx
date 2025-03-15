import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Plus, Save, X } from 'lucide-react';

const AddVideos = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const courseId = location.state?.courseId;
  const [newVideos, setNewVideos] = useState([{ 
    title: '', 
    url: '', 
    description: '', 
    duration: '' 
  }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVideoChange = (index, field, value) => {
    const updatedVideos = [...newVideos];
    updatedVideos[index][field] = value;
    setNewVideos(updatedVideos);
  };

  const addVideoField = () => {
    setNewVideos([...newVideos, { 
      title: '', 
      url: '', 
      description: '', 
      duration: '' 
    }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Reset error message before starting

    try {
      const token = localStorage.getItem('token');

      // Loop through the new videos array and send each one separately
      for (const video of newVideos) {
        const { title, url, description, duration } = video;
        
        // Send video data to the server
        const response = await axios.post(
          `http://localhost:5000/api/course-videos/add`,
          { 
            video_url: url, // Ensure video_url matches the backend expectation
            course_id: courseId,
            title,
            description,
            duration: parseInt(duration),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.status === 201) {
          console.log(`Video "${title}" added successfully`);
        }
      }

      // After all videos are uploaded, reset the form
      setNewVideos([{ title: '', url: '', description: '', duration: '' }]);
      navigate(`/course-management}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save videos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Add Course Videos</h1>
          <button
            onClick={() => navigate(`/courses/${courseId}`)}
            className="text-gray-600 hover:text-gray-800"
          >
            Back to Course
          </button>
        </div>

        {error && <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}

        {/* Add New Videos Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-6">Add New Videos</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {newVideos.map((video, index) => (
              <div key={index} className="space-y-4 border-b pb-6 last:border-b-0">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video Title
                  </label>
                  <input
                    type="text"
                    value={video.title}
                    onChange={(e) => handleVideoChange(index, 'title', e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video URL
                  </label>
                  <input
                    type="url"
                    value={video.url}
                    onChange={(e) => handleVideoChange(index, 'url', e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={video.description}
                    onChange={(e) => handleVideoChange(index, 'description', e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-24"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={video.duration}
                    onChange={(e) => handleVideoChange(index, 'duration', e.target.value)}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={addVideoField}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <Plus size={18} />
                Add Another Video
              </button>
              
              <button 
                type="submit" 
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="animate-spin">↻</span>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save Videos
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVideos;
