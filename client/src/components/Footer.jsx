import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6  bottom-0 left-0 right-0 w-full">
      <div className="container mx-auto px-6 lg:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-center sm:text-left">Quick Links</h2>
          <ul className="text-center sm:text-left">
            <li><Link to="/courses" className="hover:text-blue-400">Courses</Link></li>
            <li><Link to="/mylearning" className="hover:text-blue-400">My Learning</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400">Contact Us</Link></li>
          </ul>
        </div>

        {/* Company Info */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-center sm:text-left">Company</h2>
          <ul className="text-center sm:text-left">
            <li><Link to="/about" className="hover:text-blue-400">About Us</Link></li>
            <li><Link to="/privacy" className="hover:text-blue-400">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-blue-400">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-center sm:text-left">Follow Us</h2>
          <div className="flex justify-center sm:justify-start space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-2xl hover:text-blue-500" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-2xl hover:text-blue-400" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-2xl hover:text-pink-500" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-2xl hover:text-blue-600" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-sm border-t border-gray-600 mt-6 pt-4">
        © {new Date().getFullYear()} Wisdomize. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;