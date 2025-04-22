import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPills, FaCapsules, FaThermometerHalf, FaSyringe } from 'react-icons/fa'; // Example icons

const CategorySection = () => {
  const categories = [
    { name: 'Pain Relief', path: '/shop/pain-relief', icon: <FaPills size={28} className="text-teal-500" /> },
    { name: 'Vitamins & Supplements', path: '/shop/vitamins', icon: <FaCapsules size={28} className="text-teal-500" /> },
    { name: 'Cold & Flu', path: '/shop/cold-flu', icon: <FaThermometerHalf size={28} className="text-teal-500" /> },
    { name: 'Allergy', path: '/shop/allergy', icon: <FaSyringe size={28} className="text-teal-500" /> },
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
    <section className="mt-16 px-4">
      <h2 className="text-4xl font-bold mb-8 text-center text-teal-600">Shop by Category</h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 sm:grid-cols-4 gap-8"
      >
        {categories.map((category) => (
          <motion.div key={category.name} variants={itemVariants}>
            <Link
              to={category.path}
              className="bg-teal-50 p-6 rounded-lg flex flex-col items-center justify-center hover:shadow-xl hover:scale-105 transition-all border border-gray-200 min-h-[120px]"
            >
              <div className="mb-4">{category.icon}</div>
              <span className="text-center font-semibold text-teal-700 text-lg md:text-xl">
                {category.name.split(' ').map((word, index) => (
                  <React.Fragment key={index}>
                    {word}
                    {index < category.name.split(' ').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default CategorySection;
