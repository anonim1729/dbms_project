import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isNavOpen, setNavOpen] = useState(false);

  return (
    <nav className="bg-indigo-600 border-gray-200 dark:bg-indigo-900 relative">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Wisdomize</span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
          <button
            type="button"
            className="flex text-sm bg-indigo-800 rounded-full md:me-0 focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-600"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            <span className="sr-only">Open user menu</span>
            <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user" />
          </button>
          {isDropdownOpen && (
            <div className="absolute top-10 -right-8 lg:-right-18 mt-2 w-48 px-4 py-3 bg-white rounded-lg shadow-lg dark:bg-indigo-700 z-50 text-center">
              <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
              <span className="block text-sm text-gray-500 truncate dark:text-gray-400">name@wisdomize.com</span>
              <ul className="py-2 text-left">
                <li><Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 dark:text-gray-200 dark:hover:bg-indigo-600 dark:hover:text-white">Dashboard</Link></li>
                <li><Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 dark:text-gray-200 dark:hover:bg-indigo-600 dark:hover:text-white">Settings</Link></li>
                <li><Link to="/earnings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 dark:text-gray-200 dark:hover:bg-indigo-600 dark:hover:text-white">Earnings</Link></li>
                <li><Link to="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 dark:text-gray-200 dark:hover:bg-indigo-600 dark:hover:text-white">Sign out</Link></li>
              </ul>
            </div>
          )}
          <button onClick={() => setNavOpen(!isNavOpen)} className="md:hidden p-2 w-10 h-10 text-white rounded-lg hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:text-gray-400 dark:hover:bg-indigo-700 dark:focus:ring-indigo-600">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className={`${isNavOpen ? "absolute top-full right-0 bg-indigo-600 shadow-lg z-50 p-4 rounded-lg" : "hidden"} md:flex md:w-auto md:order-1`}>          
          <ul className="flex flex-col md:flex-row font-medium md:space-x-8 text-white">
            {['Home', 'Courses', 'Instructors', 'Pricing', 'Contact'].map((item) => (
              <li key={item} className="py-2 px-3 text-center">
                <Link to={`/${item.toLowerCase()}`} className="hover:text-indigo-300">{item}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;