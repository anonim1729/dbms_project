import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { User, Settings, LogOut } from "lucide-react";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user?.f_name}!</h1>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-indigo-500 text-white flex items-center justify-center rounded-full text-2xl font-semibold">
              {user?.f_name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-lg font-medium">{user?.f_name} {user?.l_name}</p>
              <p className="text-gray-400">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <Link to="/courses" className="bg-indigo-600 hover:bg-indigo-500 p-4 rounded-lg text-center transition">
            📚 View Courses
          </Link>
          <Link to="/settings" className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg text-center transition flex items-center justify-center gap-2">
            <Settings size={18} /> Settings
          </Link>
        </div>

        <button 
          onClick={logout} 
          className="mt-6 bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg flex items-center gap-2 transition"
        >
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
