import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";  
const Navbar = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();  
  const navigate = useNavigate();


  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition">
        ShopEase
      </Link>

      <div className="flex items-center gap-6 text-sm font-medium">
        {user ? (
          <>
            <span className="text-gray-700">Hi, <span className="font-semibold text-indigo-600">{user.name}</span></span>

            {user.role === "buyer" && (
              <>
                <Link to="/products" className="text-gray-600 hover:text-indigo-600">Products</Link>
                <Link to="/cart" className="text-gray-600 hover:text-indigo-600">
                  Cart ({totalItems}) 
                </Link>
                <Link to="/orders" className="text-gray-600 hover:text-indigo-600">My Orders</Link>
                <Link to="/wishlist" className="text-gray-600 hover:text-indigo-600">Wishlist</Link>
                <Link to="/profile" className="text-gray-600 hover:text-indigo-600">Profile</Link>
              </>
            )}

            {user.role === "seller" && (
              <>
                <Link to="/seller-dashboard" className="text-gray-600 hover:text-indigo-600">Dashboard</Link>
                <Link to="/seller-orders" className="text-gray-600 hover:text-indigo-600">Orders</Link>
                <Link to="/seller-profile" className="text-gray-600 hover:text-indigo-600">Profile</Link>
              </>
            )}

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
            <Link to="/register" className="text-indigo-600 hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
