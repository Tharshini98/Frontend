import React from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const AddToWishlistButton = ({ productId }) => {
  const { user } = useAuth();

  const handleAddToWishlist = async () => {
    try {
      const token = user?.token;
      if (!token) {
        alert("Please login first.");
        return;
      }

      const res = await api.post(`/wishlist/add/${productId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data.message);
    } catch (error) {
      console.error("Wishlist Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <button onClick={handleAddToWishlist} className="px-3 py-1 bg-pink-500 text-white rounded">
       Add to Wishlist
    </button>
  );
};

export default AddToWishlistButton;
