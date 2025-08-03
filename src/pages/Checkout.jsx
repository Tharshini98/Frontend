import React, { useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { loadRazorpay } from "../utils/razorpay";

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [shipping, setShipping] = useState({ name: "", address: "", phone: "" });
  const navigate = useNavigate();

  const handleInput = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    try {
      
      const { data } = await axios.post("/api/orders/razorpay", {
        amount: totalPrice,
      });

      
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
        amount: data.amount,
        currency: "INR",
        name: "E-Commerce App",
        description: "Order Payment",
        order_id: data.id,
        handler: async (response) => {
          try {
           
            await axios.post("/api/orders/verify", {
              response,
              shipping,
              items: cartItems,
              totalAmount: totalPrice,
            });

            clearCart();
            alert("Payment Successful!");
            navigate("/orders");
          } catch (err) {
            console.error(err);
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: shipping.name,
          contact: shipping.phone,
        },
        theme: {
          color: "#2563eb",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Order creation failed.");
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
          <li key={item._id} className="border-b py-1">
            {item.name} X {item.quantity}
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
