import React from "react";
import {useCart} from "../context/CartContext";
import {Link} from "react-router-dom";

const Cart = () => {
    const {items, removeFromCart, adjustQuantity, total} = useCart();

     return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map(({ product, quantity }) => (
              <div
                key={product._id}
                className="flex items-center justify-between border p-4 rounded"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.image || "https://via.placeholder.com/80"}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-gray-600">₹{product.price}</p>
                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => adjustQuantity(product._id, Number(e.target.value))}
                      className="border p-1 w-16 mt-2"
                    />
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(product._id)}
                  className="text-red-600 font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 text-right">
            <h3 className="text-xl font-bold">Total: Rs.{total}</h3>
             <Link
              to="/checkout"
              className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;