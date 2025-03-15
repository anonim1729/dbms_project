// src/pages/Unauthorized.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Access Denied</h1>
      <p className="text-lg text-gray-600 mb-8">
        You don't have permission to access this page
      </p>
      <Link 
        to="/" 
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default Unauthorized;