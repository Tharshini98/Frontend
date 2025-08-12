import React, { useEffect, useState } from "react";
import api from "../services/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        console.error("No user logged in");
        return;
      }
      const { token } = JSON.parse(storedUser);

      try {
        const res = await api.get("/orders/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error.response?.data || error.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border p-4 mb-4 rounded shadow">
            <h3 className="font-semibold">Order ID: {order._id}</h3>
            <p>
              Shipping: {order.shipping?.name}, {order.shipping?.address}
            </p>
            <ul className="mt-2">
              {order.items.map((item) => (
                <li key={item._id}>
                  {/* Adjust this if your item.product has name */}
                  {item.product?.name || item.name} X {item.quantity}
                </li>
              ))}
            </ul>
            <p className="mt-2 font-bold">Total: ₹{order.totalAmount || order.total}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
