import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        MERN Shop
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/products" className="text-gray-700 hover:text-blue-600">
          Products
        </Link>

        {user?.role === "buyer" && (
          <>
            <Link to="/cart" className="text-gray-700 hover:text-blue-600">
              Cart
            </Link>
            <Link to="/orders" className="text-gray-700 hover:text-blue-600">
              Orders
            </Link>
          </>
        )}

        {user?.role === "seller" && (
          <>
            <Link to="/seller/products" className="text-gray-700 hover:text-blue-600">
              My Products
            </Link>
            <Link to="/seller/orders" className="text-gray-700 hover:text-blue-600">
              Seller Orders
            </Link>
          </>
        )}

        {user ? (
          <>
            <Link to="/profile" className="text-gray-700 hover:text-blue-600">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 hover:text-blue-600">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
