import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api"; 
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, login, token } = useAuth(); 
  const [formData, setFormData] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.token;
    if (!token) {
      alert("Not authorized, please login again");
      return;
    }

    const res = await api.put(
      "/users/me",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    login(res.data);
    navigate("/");
  } catch (error) {
    console.error("Update failed:", error.response?.data || error.message);
    alert(error.response?.data?.message || "Update failed");
  }
};

  if (!user) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
