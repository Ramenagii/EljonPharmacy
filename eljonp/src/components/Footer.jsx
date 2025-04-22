import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 mt-12 py-8">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="mb-6 md:mb-0">
          <Link to="/" className="flex items-center">
            <span className="text-teal-500 text-3xl mr-2">+</span>
            <span className="font-bold text-xl">PHARMACY</span>
          </Link>
          <p className="mt-2 text-gray-600">Your trusted online pharmacy</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-teal-500">Home</Link></li>
              <li><Link to="/shop" className="text-gray-600 hover:text-teal-500">Shop</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-teal-500">About</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-teal-500">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/shop/pain-relief" className="text-gray-600 hover:text-teal-500">Pain Relief</Link></li>
              <li><Link to="/shop/vitamins" className="text-gray-600 hover:text-teal-500">Vitamins</Link></li>
              <li><Link to="/shop/cold-flu" className="text-gray-600 hover:text-teal-500">Cold & Flu</Link></li>
              <li><Link to="/shop/allergy" className="text-gray-600 hover:text-teal-500">Allergy</Link></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-medium mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">Email: info@pharmacy.com</li>
              <li className="text-gray-600">Phone: (123) 456-7890</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
        <p>© {new Date().getFullYear()} Pharmacy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;