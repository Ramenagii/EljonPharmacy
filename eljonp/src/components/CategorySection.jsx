import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaPills,
  FaCapsules,
  FaHeartbeat,
  FaLeaf,
  FaFirstAid,
  FaBaby,
} from "react-icons/fa";
import { GiMedicinePills } from "react-icons/gi";
import { MdOutlineMasks } from "react-icons/md";

const CategorySection = () => {
  const categories = [
    {
      name: "Pain Relief",
      path: "/shop/pain-relief",
      icon: <FaPills size={40} className="text-teal-500" />,
      bgColor: "bg-red-50",
      borderColor: "border-red-100",
    },
    {
      name: "Vitamins & Supplements",
      path: "/shop/vitamins",
      icon: <FaCapsules size={40} className="text-amber-500" />,
      bgColor: "bg-amber-50",
      borderColor: "border-amber-100",
    },
    {
      name: "Heart Health",
      path: "/shop/heart-health",
      icon: <FaHeartbeat size={40} className="text-rose-500" />,
      bgColor: "bg-rose-50",
      borderColor: "border-rose-100",
    },
    {
      name: "Natural Remedies",
      path: "/shop/natural",
      icon: <FaLeaf size={40} className="text-green-500" />,
      bgColor: "bg-green-50",
      borderColor: "border-green-100",
    },
    {
      name: "First Aid",
      path: "/shop/first-aid",
      icon: <FaFirstAid size={40} className="text-blue-500" />,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100",
    },
    {
      name: "Baby Care",
      path: "/shop/baby",
      icon: <FaBaby size={40} className="text-purple-500" />,
      bgColor: "bg-purple-50",
      borderColor: "border-purple-100",
    },
    {
      name: "Prescription Medicines",
      path: "/shop/prescription",
      icon: <GiMedicinePills size={40} className="text-teal-500" />,
      bgColor: "bg-teal-50",
      borderColor: "border-teal-100",
    },
    {
      name: "Personal Care",
      path: "/shop/personal-care",
      icon: <MdOutlineMasks size={40} className="text-indigo-500" />,
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-100",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 ">
      <div className="section-container">
        <div className="text-center mb-8 md:mb-12 ">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold mb-2 md:mb-3 text-gray-800 relative inline-block"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-teal-600">Shop</span> by Category
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 bg-teal-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Browse our wide selection of health products and medications
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              whileHover={{
                y: -5,
                boxShadow:
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to={category.path}
                className={`${category.bgColor} ${category.borderColor} border-2 p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl flex flex-col items-center justify-center transition-all h-full`}
              >
                <div className="mb-2 sm:mb-4 p-2 sm:p-3 rounded-full bg-white shadow-sm">
                  {React.cloneElement(category.icon, {
                    size: window.innerWidth < 640 ? 24 : 40,
                  })}
                </div>
                <span className="text-center font-semibold text-gray-800 text-sm sm:text-base md:text-lg">
                  {category.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategorySection;
