import React, { useEffect, useState } from "react";
import api from "../../services/api"; 
import { useAuth } from "../../context/AuthContext";

const MyProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!user?._id) return;

      try {
        const token = localStorage.getItem("token") || user?.token;
        const res = await api.get(`/products/seller/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(res.data || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user]);

  if (loading) return <p className="p-6">Loading products...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="border p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover mb-2 rounded"
                />
              )}
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600">₹{product.price}</p>
              <p className="text-xs text-gray-500">Stock: {product.stock}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;
