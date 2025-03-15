import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const CourseManagementLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 px-4 py-2 bg-white shadow-sm rounded-lg hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-blue-200"
        >
          <ChevronLeft className="h-6 w-6 text-gray-600 group-hover:text-blue-700 transition-colors" />
          <span className="text-gray-700 font-medium group-hover:text-blue-700 transition-colors">
            Back
          </span>
        </button>
      </div>

      <div className="max-w-6xl mx-auto pt-20 pb-12 px-6">
        <Outlet />
      </div>
    </div>
  );
};

export default CourseManagementLayout;