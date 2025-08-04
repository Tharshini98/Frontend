import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const sellerId = localStorage.getItem('userId');
    axios.get(`/products/seller/${sellerId}`).then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Products</h2>
      <Link to="/seller/add-product" className="bg-blue-500 px-4 py-2 rounded text-white mb-4 inline-block">
        + Add Product
      </Link>
      <ul>
        {products.map((product) => (
          <li key={product._id} className="border p-3 my-2">
            <p>{product.name}</p>
            <p>₹{product.price}</p>
            <div className="space-x-2 mt-2">
              <Link to={`/seller/edit-product/${product._id}`} className="text-blue-600">Edit</Link>
              <button onClick={() => handleDelete(product._id)} className="text-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  function handleDelete(id) {
    api.delete(`/products/${id}`).then(() => {
      setProducts(products.filter((p) => p._id !== id));
    });
  }
};

export default SellerDashboard;
