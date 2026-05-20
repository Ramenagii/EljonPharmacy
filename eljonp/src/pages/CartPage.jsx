import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IconCheck, IconShoppingBag, IconTrash } from '@tabler/icons-react';
import { createSale, money, parsePrice } from '../services/salesApi';

const CartPage = ({ cartItems, removeFromCart, clearCart }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  const totalPrice = cartItems.reduce((total, item) => {
    return total + parsePrice(item.price);
  }, 0);

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
    <div className="relative mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">Your Cart</h1>
        <p className="mt-2 text-slate-600">Review items before recording the sale.</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <IconShoppingBag className="mx-auto mb-4 h-10 w-10 text-slate-400" />
          <p className="text-lg font-semibold text-slate-800">Your cart is empty.</p>
          <Link to="/shop" className="mt-4 inline-flex rounded-lg bg-teal-600 px-5 py-3 font-semibold text-white hover:bg-teal-700">
            Go shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <section className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="space-y-3">
              {cartItems.map((item, index) => (
                <div key={`${item.name}-${index}`} className="flex items-center justify-between gap-4 rounded-lg border border-slate-100 bg-slate-50 p-4">
                  <div>
                    <p className="font-semibold uppercase text-slate-900">{item.name}</p>
                    <p className="text-sm text-slate-500">Qty 1 · {money.format(parsePrice(item.price))}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="inline-flex items-center rounded-lg border border-red-100 bg-white px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    <IconTrash className="mr-1 h-4 w-4" />
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </section>

          <aside className="h-fit rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Order Summary</h2>
            <div className="mt-5 space-y-3 border-b border-slate-200 pb-5 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Items</span>
                <span>{cartItems.length}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Payment</span>
                <span>Cash</span>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <span className="font-semibold text-slate-800">Total</span>
              <span className="text-2xl font-bold text-teal-700">
                {money.format(Number.isNaN(totalPrice) ? 0 : totalPrice)}
              </span>
            </div>
            <button
              onClick={() => setShowConfirmation(true)}
              className="mt-6 w-full rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700"
            >
              Proceed to Checkout
            </button>
          </aside>
        </div>
      )}

      {showConfirmation && (
        <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-slate-900">Confirm Sale</h2>

          <ul className="mb-4 space-y-2">
            {cartItems.map((item, index) => (
              <li key={`${item.name}-${index}`} className="flex justify-between text-slate-700">
                <span>{item.name}</span>
                <span>{money.format(parsePrice(item.price))}</span>
              </li>
            ))}
          </ul>

          <div className="mb-6 flex justify-between border-t pt-4 font-semibold">
            <p>Total:</p>
            <p>{money.format(totalPrice)}</p>
          </div>

          {checkoutError && (
            <p className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {checkoutError}
            </p>
          )}

          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowConfirmation(false)}
              className="rounded-lg border px-4 py-2 font-semibold hover:bg-slate-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmPurchase}
              className="rounded-lg bg-teal-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-teal-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving Sale...' : 'Confirm Purchase'}
            </button>
          </div>
        </div>
      )}

      <AnimatePresence>
        {showSuccessOverlay && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-sm rounded-2xl border border-white/20 bg-slate-950/90 p-8 text-center text-white shadow-lg backdrop-blur-xl"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <IconCheck className="mx-auto mb-4 h-10 w-10 text-teal-200" />
              <h2 className="mb-2 text-2xl font-semibold">Sale Recorded</h2>
              <p className="text-sm text-gray-200">The transaction was saved to Supabase.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartPage;
