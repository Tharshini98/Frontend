import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api"; 

const SellerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "seller") {
      navigate("/login");
      return;
    }

    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get(`/products/seller/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to load products:", err);
        setError("Could not fetch your products.");
      }
    };

    fetchProducts();
  }, [user, navigate]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Seller Dashboard</h1>

    
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-2">Total Products</h2>
          <p className="text-2xl font-bold">{products.length}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-2">Total Sales</h2>
          <p className="text-2xl font-bold">₹ 0</p> 
        </div>
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-2">Pending Orders</h2>
          <p className="text-2xl font-bold">0</p> 
        </div>
      </div>

      
      <div className="flex justify-end">
        <Link
          to="/seller/add-product"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium"
        >
          + Add Product
        </Link>
      </div>

     
      <div>
        <h2 className="text-2xl font-bold mb-4">My Products</h2>

        {error && <p className="text-red-500">{error}</p>}

        {products.length === 0 ? (
          <p className="text-gray-600">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white border rounded-lg shadow hover:shadow-lg transition p-4"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 w-full object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">₹ {product.price}</p>
                <p className="text-sm text-gray-400 mt-1">Stock: {product.stock}</p>
                <Link
                  to={`/seller/edit-product/${product._id}`}
                  className="mt-3 inline-block text-sm text-blue-600 hover:underline"
                >
                  Edit Product
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
