import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext"; 
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
 <AuthProvider>
  <CartProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </CartProvider>
     </AuthProvider>
);