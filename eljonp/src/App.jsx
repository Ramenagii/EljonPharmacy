import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import SignInPage from "./pages/SignInPage";
import RegisterPage from "./pages/RegisterPage";
import CartPage from "./pages/CartPage";
import ReportsPage from "./pages/ReportsPage";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const removeFromCart = (itemIndex) => {
    setCartItems((prevItems) =>
      prevItems.filter((_, index) => index !== itemIndex)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar cartItems={cartItems} />

        <main className="pt-[56px] lg:pt-[80px] w-full" >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage addToCart={addToCart} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route
              path="/cart"
              element={
                <CartPage
                  cartItems={cartItems}
                  removeFromCart={removeFromCart}
                  clearCart={clearCart}
                />
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
