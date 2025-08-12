import React, { useEffect, useState } from "react";
import api from "../services/api"; 
import { useAuth } from "../context/AuthContext";

const SellerProfile = () => {
  const { user, token: contextToken, setUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    shopName: "",     
  });
  const [loading, setLoading] = useState(false);

  const token = contextToken || localStorage.getItem("token");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        address: user.address || "",
        phone: user.phone || "",
        shopName: user.shopName || "",  
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.put("/users/me", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Profile updated successfully!");

      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Seller Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            className="w-full border rounded px-3 py-2"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border rounded px-3 py-2"
            value={formData.email}
            disabled
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Shop Name</label>
          <input
            type="text"
            name="shopName"
            className="w-full border rounded px-3 py-2"
            value={formData.shopName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            className="w-full border rounded px-3 py-2"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            name="address"
            className="w-full border rounded px-3 py-2"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default SellerProfile;

