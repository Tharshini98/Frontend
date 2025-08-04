import React, { useEffect, useState } from "react";
import api from "../services/api";

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const sellerId = localStorage.getItem("userId");
      const { data } = await api.get(`/seller/orders/${sellerId}`);
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      await api.put(`/seller/orders/${orderId}/status`, { status: newStatus });
      fetchOrders();
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Seller Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="border p-4 rounded mb-4 shadow">
          <p className="font-semibold">Order ID: {order._id}</p>
          <p>Buyer: {order.buyer.name}</p>
          <p>Total: ₹{order.totalAmount}</p>
          <p>Status: <span className="font-medium">{order.status}</span></p>

          <select
            value={order.status}
            onChange={(e) => updateStatus(order._id, e.target.value)}
            className="mt-2 border p-2 rounded"
          >
            {["Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default SellerOrders;
