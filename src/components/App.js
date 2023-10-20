import React from "react";
import "../styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "../pages/Home.js";
import Eshop from "../pages/Eshop.js";
import ProductDetail from '../pages/ProductDetail';
import MonCompte from "../pages/MonCompte.js";
import NotFound from "../pages/NotFound";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Cart from "../pages/Cart";
import { AuthContextProvider } from "../context/AuthContext";
import ProtectedRoutes from "./ProtectedRoutes";
import { ForgotPassword } from "../pages/ForgotPassword";
import OrderRecap from "../pages/OrderRecap";
import DeliveryPayment from "../pages/DeliveryPayment";

function App() {
  return (
    <BrowserRouter>
       <AuthContextProvider>
          <Routes>
             <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="eshop" element={<Eshop />} />
                <Route path="eshop/cart" element={<Cart />} />
                <Route path="eshop/cart/orderRecap" element={<OrderRecap />} />
                <Route path="eshop/cart/orderRecap/deliveryPayment" element={<DeliveryPayment />} />
                <Route path="eshop/productDetail" element={<ProductDetail />} />
                <Route path="compte" element={
                   <ProtectedRoutes route="login">
                      <MonCompte />
                   </ProtectedRoutes>} />
                <Route path="signup" element={<Signup />} />
                <Route path="login" element={<Login />} />
                <Route path="forgotPassword" element={<ForgotPassword />} />
                <Route path="*" element={<NotFound />} />
             </Route>
          </Routes>
       </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
