import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api"; // Axios instance with baseURL
import { useAuth } from "../context/AuthContext";

const AddProduct = () => {
  const { id } = useParams(); // productId if editing
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: ""
  });

  useEffect(() => {
    if (id) {
      // Fetch product for edit
      const fetchProduct = async () => {
        try {
          const res = await api.get(`/products/${id}`, {
            headers: { Authorization: `Bearer ${user?.token}` }
          });
          setFormData({
            name: res.data.name || "",
            description: res.data.description || "",
            price: res.data.price || "",
            stock: res.data.stock || "",
            category: res.data.category || "",
            image: res.data.image || ""
          });
        } catch (error) {
          console.error("Error fetching product:", error.response?.data || error);
        }
      };
      fetchProduct();
    }
  }, [id, user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: { Authorization: `Bearer ${user?.token}` }
      };

      if (id) {
        // Edit product
        await api.put(`/products/${id}`, formData, config);
        alert("Product updated successfully");
      } else {
        // Add product
        const payload = { ...formData, seller: user._id };
        await api.post("/products", payload, config);
        alert("Product added successfully");
      }
      navigate("/seller/products");
    } catch (error) {
      console.error("Error saving product:", error.response?.data || error);
      alert("Failed to save product");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">
        {id ? "Edit Product" : "Add Product"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        ></textarea>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
       <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={formData.stock}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {id ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
