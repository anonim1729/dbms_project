// UserContext.js
import React,{ createContext, useState } from 'react';

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);

  const fetchUserProfile = async (email) => {
    const res = await fetch(`/api/users/${email}`);
    const data = await res.json();
    setUserProfile(data);
  };

  return (
    <UsersContext.Provider value={{ userProfile, fetchUserProfile }}>
      {children}
    </UsersContext.Provider>
  );
};