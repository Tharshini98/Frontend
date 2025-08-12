import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api"; 

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!token) {
      alert("Invalid or missing token");
      return;
    }

    try {
      await api.post(`/auth/reset-password/${token}`, { password });
      alert("Password reset successful");
      navigate("/login");
    } catch (error) {
      console.error("Reset password error:", error.response?.data);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Reset Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 mb-4 w-full rounded"
          required
          minLength={6}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border p-3 mb-6 w-full rounded"
          required
          minLength={6}
        />
        <button type="submit" className="bg-blue-600 text-white py-3 rounded w-full hover:bg-blue-700 transition">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
