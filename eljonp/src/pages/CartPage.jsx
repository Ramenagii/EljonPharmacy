import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CartPage = ({ cartItems, removeFromCart }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.price ? parseFloat(item.price) : 0);
  }, 0);

  const handleCheckout = () => {
    setShowConfirmation(true);
  };

  const handleConfirmPurchase = () => {
    setShowSuccessOverlay(true);
    setShowConfirmation(false);

    // Optionally reset cart or redirect after delay
    setTimeout(() => {
      setShowSuccessOverlay(false);
      // You can clear cart or redirect here if needed
    }, 3000);
  };

  return (
    <div className="relative p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {/* Cart Items */}
      <div className="space-y-4">
        {cartItems.length === 0 ? (
          <p>Your cart is empty. <Link to="/shop" className="text-teal-500 underline">Go shopping</Link></p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-4">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">Price: ${item.price}</p>
              </div>
              <div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Total & Checkout */}
      {cartItems.length > 0 && (
        <>
          <div className="mt-6 flex justify-between items-center font-semibold">
            <p>Total Price:</p>
            <p className="text-teal-500">
              ${isNaN(totalPrice) ? '0.00' : totalPrice.toFixed(2)}
            </p>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleCheckout}
              className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}

      {/* Confirmation Summary */}
      {showConfirmation && (
        <div className="mt-10 border border-gray-300 p-6 rounded-lg bg-gray-50 shadow">
          <h2 className="text-xl font-bold mb-4">Confirm Your Purchase</h2>

          <ul className="mb-4 space-y-2">
            {cartItems.map(item => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name}</span>
                <span>${item.price}</span>
              </li>
            ))}
          </ul>

          <div className="flex justify-between font-semibold mb-6">
            <p>Total:</p>
            <p>${totalPrice.toFixed(2)}</p>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowConfirmation(false)}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmPurchase}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              Confirm Purchase
            </button>
          </div>
        </div>
      )}

      {/* ✅ Glassmorphism Confirmation Overlay */}
      <AnimatePresence>
        {showSuccessOverlay && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-2xl text-center shadow-lg text-white max-w-sm w-full"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-4xl mb-4">✅</div>
              <h2 className="text-2xl font-semibold mb-2">Purchase Successful!</h2>
              <p className="text-sm text-gray-200">Thank you for your order. Your items will be processed shortly.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartPage;
