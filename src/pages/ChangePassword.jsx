import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("No token found. Please log in again.");
      return;
    }

    try {
      await api.post(
        "/auth/change-password", 
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Password changed successfully");
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (err) {
      console.error("Password change failed:", err.response?.data || err.message);
      setMessage("Failed to change password");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Change Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="oldPassword"
          placeholder="Current Password"
          value={form.oldPassword}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={form.newPassword}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Change Password
        </button>
        {message && <p className="text-center text-sm mt-4">{message}</p>}
      </form>
    </div>
  );
};

export default ChangePassword;
