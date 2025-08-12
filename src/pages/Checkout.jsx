import React, { useState } from "react";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { loadRazorpayScript } from "../utils/razorpay";

const Checkout = () => {
  const { items: cartItems, total: totalPrice, clearCart } = useCart();
  const [shipping, setShipping] = useState({ name: "", address: "", phone: "" });
  const navigate = useNavigate();

  const handleInput = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) {
    alert("Please login to continue.");
    navigate("/login");
    return;
  }

  const { token, email } = JSON.parse(storedUser);

  try {
    // Load Razorpay SDK script
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert("Razorpay SDK failed to load. Check your connection.");
      return;
    }

    // Get Razorpay Key
    const keyRes = await api.get("/orders/razorpay-key", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const razorpayKey = keyRes.data.key;

    // Create Razorpay order on backend
    const orderRes = await api.post(
      "/orders",
      { amount: Number(totalPrice) }, // make sure amount is number
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { id: orderId, amount, currency } = orderRes.data;

    // Open Razorpay Checkout
    const options = {
      key: razorpayKey,
      amount: amount.toString(),
      currency,
      name: "My Shop",
      description: "Order Payment",
      order_id: orderId,
      handler: async function (response) {
        // Save order after successful payment
        await api.post(
          "/orders/save-order",
          {
            items: cartItems.map((item) => ({
              product: item.product._id,
              quantity: item.quantity,
              seller: item.product.seller,
            })),
            totalPrice,
            shipping,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        alert("Payment successful!");
        clearCart();
        navigate("/orders");
      },
      prefill: {
        name: shipping.name,
        email,
        contact: shipping.phone,
      },
      theme: { color: "#3399cc" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  } catch (err) {
    console.error("Payment error:", err.response?.data || err.message);
    alert(err.response?.data?.message || "Payment failed");
  }
};



  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Shipping Information</h2>

      <input
        className="border p-2 w-full mb-2"
        name="name"
        placeholder="Full Name"
        value={shipping.name}
        onChange={handleInput}
      />
      <input
        className="border p-2 w-full mb-2"
        name="address"
        placeholder="Address"
        value={shipping.address}
        onChange={handleInput}
      />
      <input
        className="border p-2 w-full mb-4"
        name="phone"
        placeholder="Phone Number"
        value={shipping.phone}
        onChange={handleInput}
      />

      <h2 className="text-lg font-bold mb-2">Order Summary</h2>
      <ul className="mb-2">
        {cartItems.map((item) => (
          <li key={item.product._id} className="border-b py-1">
            {item.product.name} × {item.quantity}
          </li>
        ))}
      </ul>
      <div className="font-semibold mb-4">Total: ₹{totalPrice}</div>

      <button
        onClick={handlePayment}
        className="bg-blue-600 text-white py-2 px-4 rounded"
      >
        Pay with Razorpay
      </button>
    </div>
  );
};

export default Checkout;
