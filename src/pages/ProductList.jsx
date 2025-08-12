import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import AddToWishlistButton from "../components/AddToWishlistButton"; 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const params = {
        search,
        category,
        minPrice,
        maxPrice,
      };
      const { data } = await api.get("/products", { params });
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Product Catalog</h2>

      <form
        onSubmit={handleFilter}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      >
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded col-span-1 sm:col-span-2 lg:col-span-1"
        >
          Apply Filters
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer"
          >
            <div
              className="w-full h-52 overflow-hidden rounded-t-lg bg-gray-100"
              onClick={() => navigate(`/products/${product._id}`)} // ⬅️ navigate manually
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-4"
              />
            </div>
            <div className="p-4 space-y-1">
              <h3 className="text-base font-semibold line-clamp-1">
                {product.name}
              </h3>
              <p className="text-blue-600 font-medium">₹{product.price}</p>
              <p className="text-sm text-gray-500">
                Seller: {product.seller?.name}
              </p>

              
              <AddToWishlistButton productId={product._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
