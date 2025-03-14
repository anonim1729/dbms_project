import React from "react";
import { useState } from "react";
import axios from "axios";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      setSuccess("Registration successful! You can now login.");
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="f_name" placeholder="First Name" required className="input-field" onChange={handleChange} />
          <input type="text" name="l_name" placeholder="Last Name" required className="input-field" onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" required className="input-field" onChange={handleChange} />
          <input type="text" name="ph_no" placeholder="Phone Number" required className="input-field" onChange={handleChange} />
          <select name="account_type" className="input-field" onChange={handleChange}>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>
          <input type="date" name="dob" required className="input-field" onChange={handleChange} />
          <select name="gender" className="input-field" onChange={handleChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <input type="password" name="password" placeholder="Password" required className="input-field" onChange={handleChange} />
          <button type="submit" className="btn">Register</button>
        </form>
        <p className="mt-4 text-sm">Already have an account? <a href="/login" className="text-blue-400">Login</a></p>
      </div>
    </div>
  );
}
