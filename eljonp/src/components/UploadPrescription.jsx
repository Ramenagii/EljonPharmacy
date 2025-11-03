import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUpload, FaShieldAlt, FaCheck } from "react-icons/fa";

const UploadPrescription = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileName(e.dataTransfer.files[0].name);
      // Handle file upload logic
      console.log("File dropped:", e.dataTransfer.files[0].name);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      // Handle file upload logic
      console.log("File selected:", e.target.files[0].name);
    }
  };

  const trustPoints = [
    "HIPAA Compliant & Secure",
    "All Insurance Accepted",
    "Fast Processing",
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="section-container py-10 sm:py-16 bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl md:rounded-3xl shadow-lg px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-3 text-gray-800"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-blue-600">Prescription</span> Services
            </motion.h2>
            <motion.p
              className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Quick and easy upload of your prescription for fast processing
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-center">
            <motion.div
              className="order-2 md:order-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg">
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
                  Upload Your Prescription
                </h3>

                <div
                  className={`border-2 border-dashed rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 text-center cursor-pointer transition-all ${
                    isDragging
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-blue-400"
                  }`}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="mb-3 sm:mb-4">
                    <FaUpload className="mx-auto text-blue-500 text-2xl sm:text-4xl" />
                  </div>

                  {fileName ? (
                    <div className="flex items-center justify-center space-x-2 text-blue-600">
                      <FaCheck size={14} className="flex-shrink-0" />
                      <span className="font-medium text-sm sm:text-base truncate max-w-full">
                        {fileName}
                      </span>
                    </div>
                  ) : (
                    <>
                      <p className="text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">
                        Drag & Drop your prescription here
                      </p>
                      <p className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4">
                        or
                      </p>
                      <label className="bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors inline-block cursor-pointer text-sm sm:text-base">
                        Browse Files
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500">
                        Accepts PDF, JPG, PNG (Max 5MB)
                      </p>
                    </>
                  )}
                </div>

                <div className="mt-6 sm:mt-8">
                  {trustPoints.map((point, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center mb-2 sm:mb-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.2 }}
                    >
                      <div className="p-1 bg-green-100 rounded-full mr-2 sm:mr-3">
                        <FaShieldAlt className="text-green-600 text-xs sm:text-base" />
                      </div>
                      <span className="text-gray-700 text-sm sm:text-base">
                        {point}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {fileName && (
                  <motion.div
                    className="mt-4 sm:mt-6"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 sm:py-3 rounded-lg font-medium transition-colors flex items-center justify-center text-sm sm:text-base">
                      Process My Prescription
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 sm:h-5 sm:w-5 ml-1 sm:ml-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>

            <motion.div
              className="order-1 md:order-2 mb-4 md:mb-0"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative">
                <img
                  src="/images/pain.jpg"
                  alt="Prescription with RX symbol"
                  className="w-full rounded-xl md:rounded-2xl shadow-lg"
                />
                <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-lg sm:text-2xl font-bold mr-2 sm:mr-3">
                      Rx
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                        Professional Care
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Licensed pharmacists review all prescriptions
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadPrescription;
