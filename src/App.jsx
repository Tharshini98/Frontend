import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import { CartProvider } from "./context/CartContext";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import SellerProfile from './pages/SellerProfile';
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <div>
  <Navbar />
    <CartProvider>
    <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
      <Route path="/products" element={<ProductList/>}/>
      <Route path="/products/:id" element={<ProductDetails/>} />
      <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
         <Route path="/profile" element={<Profile/>}/>
         <Route path="/seller/profile" element={<SellerProfile />} />
         <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
    </CartProvider>
    </div>
  );
}

export default App;