import React, { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

const InstructorsContext = createContext();

export function InstructorsProvider({ children }) {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/instructors');
        
        setInstructors(response.data);
      } catch (err) {
        setError('Failed to fetch instructors');
      } finally {
        setLoading(false);
      }
    };
    fetchInstructors();
  }, []);

  return (
    <InstructorsContext.Provider value={{ instructors, loading, error }}>
      {children}
    </InstructorsContext.Provider>
  );
}

export const useInstructors = () => useContext(InstructorsContext);