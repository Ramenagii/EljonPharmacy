import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="text-5xl font-bold mb-4">Eljon Pharmacy</h1>
        <p className="text-xl mb-6">Order medications and health products online.</p>
        <Link to="/shop">
          <button className="bg-teal-500 text-white px-6 py-3 rounded font-medium hover:bg-teal-600 transition-colors">
            SHOP NOW
          </button>
        </Link>
      </div>
      <div className="bg-blue-100 rounded-lg p-6">
        <img 
          src="/images/medications.jpg" 
          alt="Medication bottles and pills" 
          className="w-full h-auto"
        />
      </div>
    </section>
  );
};

export default HeroSection;