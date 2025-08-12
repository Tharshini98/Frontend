import React, { useEffect, useState } from "react";
import api from "../services/api";

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders for logged-in seller
  const fetchOrders = async () => {
    try {
      // Get user token and id from localStorage
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser) {
        console.error("No user logged in");
        return;
      }
      const token = storedUser.token;
      const sellerId = storedUser._id;

      // Correct API endpoint and pass Authorization header
      const { data } = await api.get(`/orders/seller/${sellerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders", err.response?.data || err.message);
    }
  };

  // Update order status
  const updateStatus = async (orderId, newStatus) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser) {
        console.error("No user logged in");
        return;
      }
      const token = storedUser.token;

    await api.put(
  `/orders/${orderId}/status`,
  { status: newStatus.toLowerCase() },
  { headers: { Authorization: `Bearer ${token}` } }
);


      fetchOrders();
    } catch (err) {
      console.error("Status update failed", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Seller Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border p-4 rounded mb-4 shadow">
            <p className="font-semibold">Order ID: {order._id}</p>
            <p>Buyer: {order.buyer?.name || "Unknown"}</p>
            <p>Total: ₹{order.totalAmount}</p>
            <p>
              Status:{" "}
              <span className="font-medium">
                {order.orderStatus || order.status || "processing"}
              </span>
            </p>

            <select
              value={order.orderStatus || order.status || "processing"}
              onChange={(e) => updateStatus(order._id, e.target.value)}
              className="mt-2 border p-2 rounded"
            >
              {["processing", "shipping", "delivered", "cancelled"].map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </div>
        ))
      )}
    </div>
  );
};

export default SellerOrders;
