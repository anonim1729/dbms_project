// ReviewContext.js
import React,{ createContext, useState } from 'react';

export const ReviewsContext = createContext();

export const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async (courseId) => {
    const res = await fetch(`/api/reviews/${courseId}`);
    const data = await res.json();
    setReviews(data);
  };

  return (
    <ReviewsContext.Provider value={{ reviews, fetchReviews }}>
      {children}
    </ReviewsContext.Provider>
  );
};