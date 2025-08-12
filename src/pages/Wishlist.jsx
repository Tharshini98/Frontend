import React, { useEffect, useState } from "react";
import api from "../services/api"; // your centralized axios instance
import { toast } from "react-toastify";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

const fetchWishlist = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    const { data } = await api.get("/wishlist", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setWishlist(data.wishlist || []);
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    toast.error("Failed to load wishlist.");
  }
};

const removeFromWishlist = async (productId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    await api.delete(`/wishlist/remove/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Removed from wishlist");
    setWishlist(wishlist.filter((item) => item._id !== productId));
  } catch (error) {
    console.error("Error removing item from wishlist:", error);
    toast.error("Failed to remove item.");
  }
};


  if (wishlist.length === 0) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Your Wishlist</h2>
        <p>No items in wishlist.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Wishlist</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlist.map((product) => (
          <div key={product._id} className="border p-4 rounded shadow">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover mb-2 rounded"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">₹{product.price}</p>
            <button
              onClick={() => removeFromWishlist(product._id)}
              className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
