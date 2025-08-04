import React, {useEffect, useState} from "react";
import api from "../services/api";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

const Wishlist = () => {
    const[wishlist, setWishlist] = useState([]);
    const fetchWishlist = async() => {
        try{
            const{data} = await api.get("/users/wishlist", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setWishlist(data.wishlist || []);
        } catch(error) {
            console.error("Error fetching wishlist:", error);
            toast.error("Failed to load wishlist.");
        }
    };

    useEffect(()=> {
        fetchWishlist();
    }, []);

    const removeFromWishlist = async (productId) => {
        try{
            await api.delete(`/users/wishlist/${productId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            toast.success("Removed from wishlist");
            setWishlist(wishlist.filter((item) => item._id !== productId));

        } catch (error) {
            console.error(error);
            toast.error("Failed to remove item");
        }
    };

    return(
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
            {wishlist.length === 0 ? (
                <p className="text-gray-600">Your wishlist is empty.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlist.map((product) => (
                        <div
                        key={product._id}
                        className="border rounded-lg shadow p-4 flex flex-col justify-between">
                           <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
              <p className="text-gray-600 mt-1">₹{product.price}</p>
              <div className="flex justify-between items-center mt-3">
                <Link
                  to={`/product/${product._id}`}
                  className="text-blue-500 hover:underline"
                >
                  View
                </Link>
                <button
                  onClick={() => removeFromWishlist(product._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
           