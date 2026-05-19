import React, { useEffect, useState } from 'react';
import ReportsPage from './ReportsPage';
import {
  createSale,
  getCurrentAdminSession,
  money,
  signInAdmin,
  signOutAdmin,
  today,
} from '../services/salesApi';
import { isSupabaseConfigured } from '../lib/supabaseClient';

const emptyItem = {
  name: '',
  quantity: 1,
  unitPrice: '',
};

const AdminPage = () => {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [saleDate, setSaleDate] = useState(today);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState([{ ...emptyItem }]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCurrentAdminSession().then(setSession);
  }, []);

  const total = items.reduce((sum, item) => {
    return sum + (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0);
  }, 0);

  const allowedEmails = String(import.meta.env.VITE_ADMIN_EMAILS || '')
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  const activeEmail = session?.user?.email?.toLowerCase();
  const isAllowedAdmin = session && (allowedEmails.length === 0 || allowedEmails.includes(activeEmail));

  const updateItem = (index, field, value) => {
    setItems((currentItems) =>
      currentItems.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    );
  };

  const addItem = () => {
    setItems((currentItems) => [...currentItems, { ...emptyItem }]);
  };

  const removeItem = (index) => {
    setItems((currentItems) => currentItems.filter((_, itemIndex) => itemIndex !== index));
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      setSession(await signInAdmin(email, password));
      setPassword('');
    } catch (signInError) {
      setError(signInError.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOutAdmin();
    setSession(null);
  };

  const handleSubmitSale = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await createSale({
        date: saleDate,
        items,
        paymentMethod,
        notes,
      });
      setMessage('Sale recorded successfully.');
      setItems([{ ...emptyItem }]);
      setNotes('');
    } catch (saleError) {
      setError(saleError.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isSupabaseConfigured) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900">Admin Setup Needed</h1>
        <p className="mt-3 text-gray-600">
          Add your Supabase URL and anon key to `.env.local`, then restart the Vite dev server.
        </p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="mx-auto max-w-md px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900">Admin Sign In</h1>
        <p className="mt-2 text-gray-600">Use a Supabase Auth email and password account.</p>

        {error && <p className="mt-5 rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700">{error}</p>}

        <form onSubmit={handleSignIn} className="mt-6 space-y-4 rounded-lg border bg-white p-6 shadow-sm">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded border px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 w-full rounded border px-3 py-2"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-teal-600 px-4 py-2 font-semibold text-white hover:bg-teal-700 disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    );
  }

  if (!isAllowedAdmin) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900">Access Not Allowed</h1>
        <p className="mt-3 text-gray-600">
          Your signed-in email is not listed in `VITE_ADMIN_EMAILS`.
        </p>
        <button onClick={handleSignOut} className="mt-6 rounded bg-gray-900 px-4 py-2 font-semibold text-white">
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Admin Sales</h1>
          <p className="mt-2 text-gray-600">Signed in as {session.user.email}</p>
        </div>
        <button onClick={handleSignOut} className="rounded border px-4 py-2 font-semibold hover:bg-gray-50">
          Sign Out
        </button>
      </div>

      <section className="rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900">Record Sale</h2>
        {message && <p className="mt-4 rounded border border-green-200 bg-green-50 px-4 py-3 text-green-700">{message}</p>}
        {error && <p className="mt-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700">{error}</p>}

        <form onSubmit={handleSubmitSale} className="mt-5 space-y-5">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700">Sale Date</label>
              <input type="date" value={saleDate} onChange={(event) => setSaleDate(event.target.value)} className="mt-1 w-full rounded border px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Payment Method</label>
              <select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)} className="mt-1 w-full rounded border px-3 py-2">
                <option value="cash">Cash</option>
                <option value="gcash">GCash</option>
                <option value="card">Card</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700">Total</label>
              <div className="mt-1 rounded border bg-gray-50 px-3 py-2 font-bold text-teal-700">{money.format(total)}</div>
            </div>
          </div>

          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="grid gap-3 md:grid-cols-[1fr_120px_140px_auto]">
                <input placeholder="Item name" value={item.name} onChange={(event) => updateItem(index, 'name', event.target.value)} className="rounded border px-3 py-2" required />
                <input type="number" min="1" step="1" placeholder="Qty" value={item.quantity} onChange={(event) => updateItem(index, 'quantity', event.target.value)} className="rounded border px-3 py-2" required />
                <input type="number" min="0" step="0.01" placeholder="Unit price" value={item.unitPrice} onChange={(event) => updateItem(index, 'unitPrice', event.target.value)} className="rounded border px-3 py-2" required />
                <button type="button" onClick={() => removeItem(index)} className="rounded border px-3 py-2 hover:bg-gray-50" disabled={items.length === 1}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button type="button" onClick={addItem} className="rounded border px-4 py-2 font-semibold hover:bg-gray-50">
            Add Item
          </button>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Notes</label>
            <textarea value={notes} onChange={(event) => setNotes(event.target.value)} className="mt-1 min-h-24 w-full rounded border px-3 py-2" />
          </div>

          <button type="submit" disabled={loading} className="rounded bg-teal-600 px-5 py-3 font-semibold text-white hover:bg-teal-700 disabled:opacity-60">
            {loading ? 'Saving...' : 'Save Sale'}
          </button>
        </form>
      </section>

      <ReportsPage />
    </div>
  );
};

export default AdminPage;
