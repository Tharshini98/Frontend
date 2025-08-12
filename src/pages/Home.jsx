import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth(); 
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Welcome to Shop-Zone
      </h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">
        Discover a wide range of products. Sign up to start shopping or selling your own products today!
      </p>
      <div className="flex gap-4">
       
        {user?.role !== "seller" && (
          <Link
            to="/products"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Browse Products
          </Link>
        )}

        
        {(!user || user.role !== "seller") && (
          <>
            <Link
              to="/login"
              className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
