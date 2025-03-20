import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { User, BookOpen, Compass, LogOut } from "lucide-react";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user?.f_name}</h1>
            <p className="text-gray-400 mt-1">Your learning dashboard</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 transition-colors"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-850 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-indigo-500/20 rounded-xl flex items-center justify-center">
              <User size={32} className="text-indigo-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                {user?.f_name} {user?.l_name}
              </h2>
              <p className="text-gray-400 mt-1">{user?.email}</p>
              {user?.ph_no && (
                <p className="text-gray-400 text-sm mt-1">Phone: {user?.ph_no}</p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/mylearning"
            className="group bg-gray-800 hover:bg-gray-700 rounded-xl p-6 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-500/20 rounded-lg">
                <BookOpen size={24} className="text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Enrolled Courses</h3>
                <p className="text-gray-400 text-sm mt-1">
                  Continue your learning journey
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/courses"
            className="group bg-gray-800 hover:bg-gray-700 rounded-xl p-6 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Compass size={24} className="text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Explore Courses</h3>
                <p className="text-gray-400 text-sm mt-1">
                  Discover new learning opportunities
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Additional Info */}
        <div className="bg-gray-800/50 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-gray-400 mb-2">Account Details</h3>
          <div className="space-y-2">
            <p className="flex justify-between items-center">
              <span className="text-gray-400">Account Type:</span>
              <span className="font-medium">{user?.account_type.toUpperCase()}</span>
            </p>
            {user?.dob && (
              <p className="flex justify-between items-center">
                <span className="text-gray-400">Date of Birth:</span>
                <span>{new Date(user.dob).toLocaleDateString()}</span>
              </p>
            )}
            <p className="flex justify-between items-center">
              <span className="text-gray-400">Gender:</span>
              <span>{user?.gender.toUpperCase()}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;