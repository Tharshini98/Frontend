import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";

import SellerDashboard from "./pages/SellerDashboard";
import SellerOrders from "./pages/SellerOrders";
import SellerProfile from "./pages/SellerProfile";
import AddProduct from"./pages/AddProduct";
import MyProducts from './pages/seller/MyProducts';

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50">
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/seller-dashboard" element={<SellerDashboard />} />
            <Route path="/seller-orders" element={<SellerOrders />} />
            <Route path="/seller-profile" element={<SellerProfile />} />
            <Route path="/seller/add-product" element={<AddProduct />} />
             <Route path="/seller/edit-product/:id" element={<AddProduct />} />
            <Route path="/seller/products" element={<MyProducts />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
