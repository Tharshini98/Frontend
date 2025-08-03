import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const initialState = {
  items: [], // { product, quantity }
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      const existing = state.items.find((i) => i.product._id === action.payload._id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product._id === action.payload._id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { product: action.payload, quantity: 1 }],
        };
      }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((i) => i.product._id !== action.payload),
      };

    case "ADJUST_QUANTITY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.product._id === action.payload.id
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };

    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => dispatch({ type: "ADD_ITEM", payload: product });
  const removeFromCart = (id) => dispatch({ type: "REMOVE_ITEM", payload: id });
  const adjustQuantity = (id, quantity) =>
    dispatch({ type: "ADJUST_QUANTITY", payload: { id, quantity } });

  const total = state.items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeFromCart, adjustQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
