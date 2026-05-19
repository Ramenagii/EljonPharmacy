import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { createSale, parsePrice } from '../services/salesApi';

const CartPage = ({ cartItems, removeFromCart, clearCart }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  const totalPrice = cartItems.reduce((total, item) => {
    return total + parsePrice(item.price);
  }, 0);

  const handleCheckout = () => {
    setShowConfirmation(true);
  };

  const handleConfirmPurchase = async () => {
    setIsSubmitting(true);
    setCheckoutError('');

    try {
      await createSale({
        date: new Date().toISOString().slice(0, 10),
        items: cartItems.map((item) => ({
          name: item.name,
          quantity: 1,
          unitPrice: parsePrice(item.price),
        })),
        paymentMethod: 'cash',
      });

      clearCart();
      setShowSuccessOverlay(true);
      setShowConfirmation(false);

      setTimeout(() => {
        setShowSuccessOverlay(false);
      }, 3000);
    } catch (error) {
      setCheckoutError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {/* Cart Items */}
      <div className="space-y-4">
        {cartItems.length === 0 ? (
          <p>Your cart is empty. <Link to="/shop" className="text-teal-500 underline">Go shopping</Link></p>
        ) : (
          cartItems.map((item, index) => (
            <div key={`${item.name}-${index}`} className="flex justify-between items-center border-b pb-4">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">Price: ${item.price}</p>
              </div>
              <div>
                <button
                  onClick={() => removeFromCart(index)}
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
            {cartItems.map((item, index) => (
              <li key={`${item.name}-${index}`} className="flex justify-between">
                <span>{item.name}</span>
                <span>${item.price}</span>
              </li>
            ))}
          </ul>

          <div className="flex justify-between font-semibold mb-6">
            <p>Total:</p>
            <p>${totalPrice.toFixed(2)}</p>
          </div>

          {checkoutError && (
            <p className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {checkoutError}
            </p>
          )}

          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowConfirmation(false)}
              className="px-4 py-2 border rounded hover:bg-gray-100"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmPurchase}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving Sale...' : 'Confirm Purchase'}
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
