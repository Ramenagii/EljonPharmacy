import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white py-10">
      <div className="section-container">
        <div className="border-y border-gray-200 py-8">
          <div className="flex flex-col justify-between gap-8 md:flex-row">
            <div>
              <Link to="/" className="flex items-center">
                <span className="mr-2 flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600 text-2xl font-bold text-white">
                  +
                </span>
                <span className="text-xl font-bold">Eljon Pharmacy</span>
              </Link>
              <p className="mt-2 max-w-xs text-gray-600">
                Your trusted local pharmacy for everyday care and essentials.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
              <div>
                <h3 className="mb-4 font-semibold text-slate-900">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-gray-600 hover:text-teal-600">Home</Link></li>
                  <li><Link to="/shop" className="text-gray-600 hover:text-teal-600">Shop</Link></li>
                  <li><Link to="/about" className="text-gray-600 hover:text-teal-600">About</Link></li>
                  <li><Link to="/contact" className="text-gray-600 hover:text-teal-600">Contact</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4 font-semibold text-slate-900">Categories</h3>
                <ul className="space-y-2">
                  <li><Link to="/shop" className="text-gray-600 hover:text-teal-600">Pain Relief</Link></li>
                  <li><Link to="/shop" className="text-gray-600 hover:text-teal-600">Vitamins</Link></li>
                  <li><Link to="/shop" className="text-gray-600 hover:text-teal-600">Medical Supplies</Link></li>
                  <li><Link to="/shop" className="text-gray-600 hover:text-teal-600">Personal Care</Link></li>
                </ul>
              </div>

              <div className="col-span-2 md:col-span-1">
                <h3 className="mb-4 font-semibold text-slate-900">Contact</h3>
                <ul className="space-y-2">
                  <li className="text-gray-600">Email: eljonpharmacy@gmail.com</li>
                  <li className="text-gray-600">Phone: Available in store</li>
                  <li>
                    <Link to="/admin" className="text-gray-500 hover:text-teal-600">
                      Staff portal
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-600">
          <p>© {new Date().getFullYear()} Eljon Pharmacy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
