// VideoContext.js
import React,{ createContext, useState } from 'react';

export const CourseVideosContext = createContext();

export const CourseVideosProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);

  const fetchVideos = async (courseId) => {
    const res = await fetch(`/api/course-videos/${courseId}`);
    const data = await res.json();
    setVideos(data);
  };

  return (
    <CourseVideosContext.Provider value={{ videos, fetchVideos }}>
      {children}
    </CourseVideosContext.Provider>
  );
};