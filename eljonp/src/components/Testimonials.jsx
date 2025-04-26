import React from "react";
import { motion } from "framer-motion";
import { FaQuoteRight, FaRegCheckCircle } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Maria Santos",
      occupation: "Regular Customer",
      message:
        "Eljon Pharmacy has been my go-to for all medication needs. Their same-day delivery and professional service is unmatched in the area!",
      avatar: "/images/pain.jpg", // Replace with actual avatar image
      rating: 5,
    },
    {
      id: 2,
      name: "Juan Dela Cruz",
      occupation: "Senior Citizen",
      message:
        "As someone who regularly needs prescription medications, their online ordering system makes it so easy to get my medicine without leaving home.",
      avatar: "/images/pain.jpg", // Replace with actual avatar image
      rating: 5,
    },
    {
      id: 3,
      name: "Anna Reyes",
      occupation: "Mother of Two",
      message:
        "Their child-friendly medicine options and helpful pharmacist advice have been a lifesaver for my family. Great service and fast delivery!",
      avatar: "/images/pain.jpg", // Replace with actual avatar image
      rating: 4,
    },
  ];

  const trustPoints = [
    "FDA Approved Medications",
    "Licensed Pharmacists",
    "Secure Payment Options",
    "Same Day Delivery Service",
  ];

  return (
    <section className="py-10 sm:py-16  pt-12 sm:pt-16 pb-10 sm:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="section-container bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl md:rounded-3xl shadow-lg py-10 sm:py-16 ">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 md:mb-16">
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-4 text-gray-800"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              What Our <span className="text-teal-600">Customers</span> Say
            </motion.h2>
            <motion.p
              className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base md:text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              We're trusted by thousands of customers across the Philippines
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8 mb-10 md:mb-16">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="bg-white p-5 sm:p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  y: -5,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <FaQuoteRight className="absolute top-5 sm:top-8 right-5 sm:right-8 text-teal-100 text-3xl sm:text-4xl" />
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="mr-3 sm:mr-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-teal-500"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 flex items-center text-sm sm:text-base">
                      {testimonial.name}
                      <MdVerified className="ml-1 text-blue-500" size={16} />
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      {testimonial.occupation}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 italic text-sm sm:text-base">
                  "{testimonial.message}"
                </p>

                <div className="flex items-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-white p-5 sm:p-8 rounded-xl md:rounded-2xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">
                  Why Choose Eljon Pharmacy?
                </h3>

                <div className="space-y-3 sm:space-y-4">
                  {trustPoints.map((point, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    >
                      <FaRegCheckCircle className="text-teal-500 mr-2 sm:mr-3 text-lg sm:text-xl flex-shrink-0" />
                      <span className="text-gray-700 text-sm sm:text-base">
                        {point}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  className="mt-6 sm:mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <button className="bg-teal-500 hover:bg-teal-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium transition-colors shadow-lg text-sm sm:text-base w-full sm:w-auto">
                    Order Now
                  </button>
                </motion.div>
              </motion.div>

              <motion.div
                className="flex justify-center mt-6 md:mt-0"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="relative">
                  <img
                    src="/images/pain.jpg"
                    alt="Pharmacy professionals"
                    className="rounded-xl shadow-lg w-full max-w-md"
                  />
                  <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 bg-blue-500 text-white p-3 sm:p-4 rounded-lg shadow-lg">
                    <div className="text-xl sm:text-3xl font-bold">99%</div>
                    <div className="text-xs sm:text-sm">
                      Customer Satisfaction
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
