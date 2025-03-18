import { useInstructors } from "../context/InstructorsContext";
import { Link } from "react-router-dom";
import { Star, BookOpen, Search } from "lucide-react";
import React, { useState } from "react";

const Instructors = () => {
  const { instructors, loading, error } = useInstructors();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInstructors = instructors.filter((instructor) =>
    `${instructor.f_name} ${instructor.l_name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
    instructor.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-700 text-lg">
        Loading instructors...
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-lg">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Meet Our Instructors
        </h1>

        {/* Search Bar */}
        <div className="mb-8 relative max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Search instructors..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search
            className="absolute left-4 top-3.5 text-gray-500"
            size={20}
          />
        </div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInstructors.map((instructor) => (
            <div
              key={instructor.email}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-lg font-semibold text-blue-600">
                  {instructor.f_name[0]}
                  {instructor.l_name[0]}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {instructor.f_name} {instructor.l_name}
                  </h2>
                  <p className="text-gray-500 text-sm">{instructor.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-600 text-sm mb-4">
                <div className="flex items-center gap-1">
                  <BookOpen size={18} className="text-blue-500" />
                  <span>{instructor.course_count} courses</span>
                </div>
              </div>

              <Link
                to={`/instructors/${instructor.email}`}
                className="text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium"
              >
                View Profile →
              </Link>
            </div>
          ))}
        </div>

        {/* Empty State Message */}
        {filteredInstructors.length === 0 && (
          <div className="flex flex-col items-center justify-center text-gray-500 py-16">
            <p className="text-lg font-medium">No instructors found</p>
            <p className="mt-2 text-sm">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Instructors
