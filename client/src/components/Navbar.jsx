import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/react.svg"

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isNavOpen, setNavOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Navigation items for both desktop and mobile
  const navItems = [
    "Home",
    "Courses",
    "Instructors",
    "myLearning",
    ...(user?.account_type === 'admin' ? ['Categories'] : []),
    ...(user?.account_type === 'instructor' ? ['Course Management'] : []),
  ];

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-8" />
          <span className="text-2xl font-bold">Wisdomize</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-6 text-lg">
          {navItems.map((item) => (
            <li key={item}>
              <Link 
                to={
                  item === 'Course Management' 
                    ? "/course-management" 
                    : `/${item.toLowerCase()}`
                } 
                className="hover:text-indigo-400 transition"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen(!isDropdownOpen)} 
                className="flex items-center gap-2 p-2 rounded-full bg-indigo-700 hover:bg-indigo-600 transition"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
                  {user.f_name.charAt(0).toUpperCase()}
                </div>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white text-gray-900 rounded-lg shadow-lg overflow-hidden z-50">
                  <div className="px-4 py-3 border-b">
                    <p className="font-semibold">{user.f_name} {user.l_name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <ul>
                    <li><Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-200">Dashboard</Link></li>
                    <li>
                      <button 
                        onClick={logout} 
                        className="block w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white"
                      >
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex gap-4">
              <Link to="/login" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg">Login</Link>
              <Link to="/register" className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg">Register</Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setNavOpen(!isNavOpen)} 
            className="md:hidden p-2"
          >
            {isNavOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isNavOpen && (
        <div className="md:hidden bg-gray-800 text-white">
          <ul className="flex flex-col gap-3 p-4">
            {navItems.map((item) => (
              <li key={item}>
                <Link 
                  to={
                    item === 'Course Management' 
                      ? "/course-management" 
                      : `/${item.toLowerCase()}`
                  } 
                  className="block py-2 text-center hover:bg-indigo-600 transition"
                  onClick={() => setNavOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
          {!user ? (
            <div className="flex flex-col items-center gap-3 p-4">
              <Link 
                to="/login" 
                className="w-full text-center py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg"
                onClick={() => setNavOpen(false)}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="w-full text-center py-2 bg-green-600 hover:bg-green-500 rounded-lg"
                onClick={() => setNavOpen(false)}
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 p-4">
              <button 
                onClick={() => {
                  logout();
                  setNavOpen(false);
                }} 
                className="w-full text-center py-2 bg-red-600 hover:bg-red-500 rounded-lg"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;