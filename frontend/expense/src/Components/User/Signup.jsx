
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/signup",
        formData
      );
      console.log("Signup successfull", response.data);
      navigate("/login");
    } catch (error) {
      console.log("Error signing up", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-indigo-300 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring focus:ring-indigo-300 focus:outline-none"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-300 focus:ring-opacity-50"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <button
              className="text-indigo-600 hover:underline"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
