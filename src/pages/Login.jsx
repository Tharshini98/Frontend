import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; 
import api from "../services/api"; 
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", formData);

      console.log("Login Response:", res.data);

      if (!res.data.token || !res.data.user) {
        alert("Invalid login response");
        return;
      }

      
      const userData = { ...res.data.user, token: res.data.token };

      login(userData); 

      alert("Login successful");

  if (userData.role === "seller") {
  navigate("/seller-dashboard");
} else {
  navigate("/products"); 
}


    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border rounded p-2 mb-4"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border rounded p-2 mb-4"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <div className="text-center mb-4">
          <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
            Forgot Password?
          </Link>
          <p className="text-sm text-center mt-4">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
