import React from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", formData);
      login(data.user, data.token);
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" required className="input-field" onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" required className="input-field" onChange={handleChange} />
          <button type="submit" className="btn">Login</button>
        </form>
        <p className="mt-4 text-sm">Don't have an account? <a href="/register" className="text-blue-400">Register</a></p>
      </div>
    </div>
  );
}
