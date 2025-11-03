import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShippingFast, FaLock, FaUserMd } from "react-icons/fa";
import {
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
} from "@tabler/icons-react";

const HeroSection = () => {
  const benefitItems = [
    {
      icon: <FaShippingFast className="text-teal-500" />,
      text: "Same Day Delivery",
    },
    { icon: <FaLock className="text-teal-500" />, text: "Secure Ordering" },
    { icon: <FaUserMd className="text-teal-500" />, text: "Pharmacist Advice" },
  ];

  return (
    <section className="min-h-[calc(100vh-80px)]  w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-2 sm:py-4 lg:py-6">
      <div className="min-h-auto lg:min-h-[80vh] section-container flex relative overflow-hidden bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl md:rounded-3xl shadow-lg ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center relative z-10 py-8 md:py-12 px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="order-2 md:order-1"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 md:mb-4 text-gray-800">
              <span className="text-teal-600">Eljon</span> Pharmacy
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-600 font-light mb-3 md:mb-6">
              Your health is our priority
            </h2>
            <p className="text-lg md:text-xl mb-6 md:mb-8 text-gray-700 max-w-lg">
              Order medications and health products online with professional
              care and peace of mind.
            </p>
            <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
              {benefitItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center bg-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-sm"
                >
                  <span className="mr-1.5 md:mr-2">{item.icon}</span>
                  <span className="text-xs md:text-sm font-medium">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 md:gap-3">
              <Link to="/shop">
                <button className="bg-teal-500 w-full sm:w-auto text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-medium hover:bg-teal-600 transition-all text-base md:text-lg shadow-lg inline-flex items-center justify-center hover:scale-105 duration-300 cursor-pointer">
                  SHOP NOW
                  <IconArrowRight
                    className="h-4 w-4 md:h-5 md:w-5 ml-2"
                    stroke={3}
                  />
                </button>
              </Link>

              <Link to="/shop">
                <button className="bg-teal-500 w-full sm:w-auto text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-medium hover:bg-teal-600 transition-all text-base md:text-lg shadow-lg inline-flex items-center justify-center hover:scale-105 duration-300 cursor-pointer">
                  Explore More
                  <IconArrowDown
                    className="h-4 w-4 md:h-5 md:w-5 ml-2"
                    stroke={3}
                  />
                </button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="relative order-1 md:order-2 mb-6 md:mb-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="bg-white p-3 md:p-5 rounded-xl md:rounded-2xl shadow-lg overflow-hidden">
              <img
                src="/images/pain.jpg"
                alt="Pharmacy services"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <motion.div
              className="absolute -bottom-3 md:-bottom-4 -right-3 md:-right-4 bg-teal-500 text-white py-2 md:py-3 px-4 md:px-6 rounded-lg shadow-lg text-sm md:text-base"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <span className="font-bold">24/7</span> Customer Support
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
