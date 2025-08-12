import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addToCart = (product) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.product._id === product._id);
      if (existingItem) {
        return prev.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setItems((prev) => prev.filter((item) => item.product._id !== productId));
  };

  const adjustQuantity = (productId, quantity) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item
      )
    );
  };

  // <<< Add this function >>>
  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, adjustQuantity, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Export the hook
export const useCart = () => useContext(CartContext);
