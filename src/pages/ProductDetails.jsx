import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, reviewRes] = await Promise.all([
          api.get(`/products/${id}`),
          api.get(`/reviews/${id}`),
        ]);
        setProduct(productRes.data);
        setReviews(reviewRes.data);
      } catch (error) {
        console.error("Failed to load product or reviews", error);
      }
    };
    fetchData();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const { data } = await api.post(
        `/reviews/${id}`,
        { comment: newReview },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReviews((prev) => [...prev, data]);
      setNewReview("");
    } catch (error) {
      console.error("Review post failed", error);
    }
  };

  if (!product) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        Product not found.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/2">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[400px] object-cover rounded-xl shadow"
            />
          ) : (
            <div className="w-full h-[400px] bg-gray-200 rounded-xl flex items-center justify-center">
              <span className="text-gray-600">No Image Available</span>
            </div>
          )}
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl text-green-600 font-semibold mb-2">
            ₹ {product.price}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            Category: {product.category}
          </p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-sm text-gray-600 mb-4">
            Seller:{" "}
            <span className="font-medium">
              {product.seller?.name || "Unknown"}
            </span>
          </p>

          <button
            onClick={() => addToCart(product)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
            
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>

        <form onSubmit={handleReviewSubmit} className="mb-6">
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write your review here..."
            className="w-full border rounded-md p-3 mb-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
          >
            Submit Review
          </button>
        </form>

        {reviews.length === 0 ? (
          <p className="text-gray-500 italic">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((rev, idx) => (
              <div key={idx} className="bg-gray-100 p-4 rounded shadow-sm">
                <p className="text-gray-800 mb-1">{rev.comment}</p>
                <p className="text-xs text-gray-500">
                  — {rev.user?.name || "Anonymous"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
