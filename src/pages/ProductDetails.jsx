import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/api";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`/products/${id}`);
      setProduct(data);
    } catch (err) {
      console.error("Product not found", err);
    }
  };

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/products/${id}/reviews`);
      setReviews(data);
    } catch (err) {
      console.error("Reviews fetch failed", err);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.trim()) return;
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        `/products/${id}/reviews`,
        { comment: newReview },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReviews((prev) => [...prev, data]);
      setNewReview("");
    } catch (err) {
      console.error("Review post failed", err);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [id]);

  if (!product) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.image || "https://via.placeholder.com/400"}
          alt={product.name}
          className="w-full md:w-1/2 rounded shadow"
        />
        <div>
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          <p className="text-lg text-gray-700 mb-2">₹ {product.price}</p>
          <p className="text-sm text-gray-500 mb-2">Category: {product.category}</p>
          <p className="mb-4">{product.description}</p>
          <p className="text-sm text-gray-500">Seller: {product.seller?.name}</p>
          <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Reviews</h3>
        <form onSubmit={handleReviewSubmit} className="mb-4">
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your review here..."
            className="w-full p-2 border rounded mb-2"
            rows={3}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit Review
          </button>
        </form>

        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <ul className="space-y-2">
            {reviews.map((rev, idx) => (
              <li key={idx} className="bg-gray-100 p-2 rounded">
                <p className="text-gray-800">{rev.comment}</p>
                <p className="text-xs text-gray-500">
                  — {rev.user?.name || "Anonymous"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
