import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLock, FaShippingFast, FaUserMd } from "react-icons/fa";
import { IconArrowRight, IconShieldCheck } from "@tabler/icons-react";

const HeroSection = () => {
  const benefitItems = [
    {
      icon: <FaShippingFast className="text-teal-500" />,
      text: "Local Delivery",
    },
    {
      icon: <FaLock className="text-teal-500" />,
      text: "Secure Ordering",
    },
    {
      icon: <FaUserMd className="text-teal-500" />,
      text: "Pharmacist Care",
    },
  ];

  return (
    <section className="w-full px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="section-container relative overflow-hidden rounded-2xl border border-teal-100 bg-gradient-to-br from-white via-teal-50 to-slate-100 shadow-sm">
        <div className="grid min-h-[620px] grid-cols-1 items-center gap-8 px-5 py-10 md:grid-cols-2 md:px-10 lg:px-14">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="order-2 md:order-1"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-4 py-2 text-sm font-semibold text-teal-700">
              <IconShieldCheck className="h-4 w-4" />
              Trusted community pharmacy
            </div>
            <h1 className="mb-4 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl md:text-6xl">
              <span className="text-teal-600">Eljon</span> Pharmacy
            </h1>
            <h2 className="mb-4 text-xl font-medium text-slate-700 md:text-2xl">
              Everyday medicines, handled with professional care.
            </h2>
            <p className="mb-7 max-w-xl text-base leading-8 text-slate-600 md:text-lg">
              Browse essential medicines, health products, and supplies with a
              cleaner ordering experience for your daily needs.
            </p>

            <div className="mb-8 flex flex-wrap gap-3">
              {benefitItems.map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center rounded-full border border-slate-100 bg-white px-4 py-2 shadow-sm"
                >
                  <span className="mr-2">{item.icon}</span>
                  <span className="text-sm font-medium text-slate-700">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/shop">
                <button className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-teal-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-teal-700">
                  Shop Medicines
                  <IconArrowRight className="ml-2 h-5 w-5" stroke={3} />
                </button>
              </Link>
              <Link to="/shop">
                <button className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-800 transition-colors hover:border-teal-500 hover:text-teal-700">
                  Browse Catalog
                </button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="relative order-1 mb-6 md:order-2 md:mb-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="overflow-hidden rounded-2xl border border-white bg-white p-3 shadow-sm md:p-5">
              <img
                src="/images/pain.jpg"
                alt="Pharmacy services"
                className="h-auto w-full rounded-xl"
              />
            </div>
            <motion.div
              className="absolute -bottom-3 -right-3 rounded-lg bg-slate-900 px-4 py-3 text-sm text-white shadow-lg md:-bottom-4 md:-right-4 md:px-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <span className="font-bold">Open Daily</span> for essential care
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
