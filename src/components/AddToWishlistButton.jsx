import React, { useState } from "react";
import axios from "../services/api";
import { toast } from "react-toastify";

const AddToWishlistButton = ({ productId }) => {
  const [added, setAdded] = useState(false);

  const handleAddToWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to use wishlist!");
        return;
      }

      await axios.post(
        `/wishlist/add/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAdded(true);
      toast.success("Added to wishlist!");
    } catch (error) {
      console.error("Failed to add to wishlist", error);
      toast.error(
        error.response?.data?.message || "Failed to add to wishlist."
      );
    }
  };

  return (
    <button
      onClick={handleAddToWishlist}
      disabled={added}
      className={`px-4 py-1 rounded-full text-sm ${
        added
          ? "bg-gray-300 text-black cursor-not-allowed"
          : "bg-pink-500 text-white hover:bg-pink-600"
      }`}
    >
      {added ? "Added" : "Add to Wishlist"}
    </button>
  );
};

export default AddToWishlistButton;
