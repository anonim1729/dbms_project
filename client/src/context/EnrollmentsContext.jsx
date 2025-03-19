import React,{ createContext, useState } from 'react';

export const EnrollmentsContext = createContext();

export const EnrollmentsProvider = ({ children }) => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const enroll = async (email, courseId) => {
    const res = await fetch("/api/enrollment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, courseId }),
    });
    if (res.ok) {
      setEnrolledCourses((prev) => [...prev, courseId]);
    }
  };

  return (
    <EnrollmentsContext.Provider value={{ enrolledCourses, enroll }}>
      {children}
    </EnrollmentsContext.Provider>
  );
};