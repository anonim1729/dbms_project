import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    f_name: "",
    l_name: "",
    ph_no: "",
    account_type: "student",
    dob: "",
    gender: "male",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate(); // Correct way to navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      setSuccess("Registration successful! You can now login.");
      setError("");
      setTimeout(() => navigate("/login"), 2000); // Redirect to home after 2 seconds
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-400">Create an Account</h2>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div>
            <label htmlFor="f_name" className="block text-sm font-medium text-gray-300">First Name</label>
            <input type="text" name="f_name" id="f_name" placeholder="Enter first name" required 
              className="w-full mt-1 p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="l_name" className="block text-sm font-medium text-gray-300">Last Name</label>
            <input type="text" name="l_name" id="l_name" placeholder="Enter last name" required
              className="w-full mt-1 p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
            <input type="email" name="email" id="email" placeholder="Enter email" required
              className="w-full mt-1 p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="ph_no" className="block text-sm font-medium text-gray-300">Phone Number</label>
            <input type="text" name="ph_no" id="ph_no" placeholder="Enter phone number" required
              className="w-full mt-1 p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
            />
          </div>

          {/* Account Type */}
          <div>
            <label htmlFor="account_type" className="block text-sm font-medium text-gray-300">Account Type</label>
            <select name="account_type" id="account_type"
              className="w-full mt-1 p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-300">Date of Birth</label>
            <input type="date" name="dob" id="dob" required
              className="w-full mt-1 p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
            />
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-300">Gender</label>
            <select name="gender" id="gender"
              className="w-full mt-1 p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <input type="password" name="password" id="password" placeholder="Enter password" required
              className="w-full mt-1 p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg transition">
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account? <a href="/login" className="text-indigo-400 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}
