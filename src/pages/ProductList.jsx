import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import api from "../services/api";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const fetchProducts = async() => {
        try {
            const params = {
            search,
            category,
            minPrice,
            maxPrice,
            };
            const{data} = await api.get("/products", {params});
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

    return(
        <div className="max-w-7xl mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold mb-4">Product Catalog</h2>
            <form onSubmit ={handleFilter}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border p-2 rounded"/>

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/products/${product._id}`}
            className="border p-4 rounded hover:shadow-lg transition"
          >
            <img
              src={product.image || "https://via.placeholder.com/200"}
              alt={product.name}
              className="h-48 w-full object-cover mb-3 rounded"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">₹{product.price}</p>
            <p className="text-sm text-gray-500">Seller: {product.seller?.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;