import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaRegStar,
  FaStar,
  FaStarHalfAlt,
  FaShoppingCart,
  FaChevronLeft,
  FaChevronRight,
  FaHotjar,
} from "react-icons/fa";
import { MdDiscount } from "react-icons/md";

const FeaturedProducts = () => {
  const carouselRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const products = [
    {
      id: 1,
      name: "Pain Reliever Extra Strength",
      price: 4.09,
      originalPrice: 5.99,
      image: "/images/pain.jpg",
      rating: 4.5,
      reviews: 128,
      badge: "Best Seller",
      badgeColor: "bg-amber-500",
    },
    {
      id: 2,
      name: "Daily Multivitamins",
      price: 11.99,
      originalPrice: 14.99,
      image:
        "https://img.livestrong.com/375/clsd/getty/b68b825eb7034267aa4eaa4b13e948f4.jpg",
      rating: 5,
      reviews: 84,
      badge: "New",
      badgeColor: "bg-blue-500",
    },
    {
      id: 3,
      name: "Nighttime Cold & Flu Relief",
      price: 8.49,
      originalPrice: 8.49,
      image:
        "https://pharmacyhealth.com.au/wp-content/uploads/2021/07/Night-Time-Cold-Flu-Relief-PE-24-Tabs.jpg",
      rating: 4,
      reviews: 56,
    },
    {
      id: 4,
      name: "Allergy Relief Tablets",
      price: 10.9,
      originalPrice: 12.9,
      image:
        "data:image/jpeg;base64,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",
      rating: 4.5,
      reviews: 72,
      badge: "15% Off",
      badgeColor: "bg-red-500",
    },
    {
      id: 5,
      name: "Vitamin C Gummies",
      price: 7.49,
      originalPrice: 9.99,
      image:
        "data:image/jpeg;base64,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",
      rating: 4.5,
      reviews: 43,
      badge: "Popular",
      badgeColor: "bg-purple-500",
    },
  ];

  const scroll = (direction) => {
    if (carouselRef.current) {
      const { current } = carouselRef;
      const scrollAmount =
        direction === "left"
          ? -current.clientWidth * 0.75
          : current.clientWidth * 0.75;

      current.scrollBy({ left: scrollAmount, top: 0, behavior: "smooth" });
    }
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar
          key={`full-${i}`}
          className="text-yellow-400 text-xs sm:text-sm"
        />
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <FaStarHalfAlt
          key="half"
          className="text-yellow-400 text-xs sm:text-sm"
        />
      );
    }

    // Empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FaRegStar
          key={`empty-${i}`}
          className="text-yellow-400 text-xs sm:text-sm"
        />
      );
    }

    return stars;
  };

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
    <section className="pt-12 sm:pt-16 md:pt-24 pb-8 md:pb-16 ">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-6 md:mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-teal-600 font-semibold text-sm sm:text-lg mb-1 sm:mb-2 block">
              Our Selection
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 flex items-center">
              Featured Products
              <FaHotjar className="ml-2 md:ml-3 text-red-500" />
            </h2>
          </motion.div>
          <motion.div
            className="flex gap-2 mt-4 sm:mt-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <button
              onClick={() => scroll("left")}
              className="p-1.5 sm:p-2 rounded-full bg-teal-100 text-teal-600 hover:bg-teal-200 transition-colors"
              aria-label="Scroll left"
            >
              <FaChevronLeft size={isMobile ? 16 : 20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-1.5 sm:p-2 rounded-full bg-teal-100 text-teal-600 hover:bg-teal-200 transition-colors"
              aria-label="Scroll right"
            >
              <FaChevronRight size={isMobile ? 16 : 20} />
            </button>
          </motion.div>
        </div>

        <div
          className="overflow-x-scroll scrollbar-hide pb-4 sm:pb-8 -mx-4 px-4"
          ref={carouselRef}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex gap-3 sm:gap-6 min-w-max"
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                className="flex flex-col rounded-xl bg-white border border-gray-100 shadow-lg p-3 sm:p-5 w-44 sm:w-56 md:w-64"
              >
                <div className="relative">
                  {product.badge && (
                    <span
                      className={`absolute top-0 left-0 ${product.badgeColor} text-white text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full z-10`}
                    >
                      {product.badge}
                    </span>
                  )}
                  <div className="mb-2 sm:mb-4 bg-gray-50 rounded-lg p-2 sm:p-4 flex items-center justify-center h-32 sm:h-40 md:h-48 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain transition-transform hover:scale-110 duration-300"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center mb-1 sm:mb-2">
                    {renderRatingStars(product.rating)}
                    <span className="text-xxs sm:text-xs text-gray-500 ml-1">
                      ({product.reviews})
                    </span>
                  </div>

                  <h3 className="font-semibold text-sm sm:text-lg text-gray-800 mb-1 sm:mb-2 line-clamp-2 h-9 sm:h-14">
                    {product.name}
                  </h3>

                  <div className="flex flex-wrap items-center mb-2 sm:mb-4">
                    <span className="text-base sm:text-xl font-bold text-teal-600">
                      ₱{(product.price * 50).toFixed(2)}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs sm:text-sm text-gray-500 line-through ml-1 sm:ml-2">
                        ₱{(product.originalPrice * 50).toFixed(2)}
                      </span>
                    )}
                    {product.originalPrice > product.price && (
                      <span className="mt-1 w-full sm:mt-0 sm:w-auto sm:ml-2 bg-red-100 text-red-600 text-xxs sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full flex items-center">
                        <MdDiscount
                          size={isMobile ? 10 : 12}
                          className="mr-0.5"
                        />
                        Save{" "}
                        {Math.round(
                          ((product.originalPrice - product.price) /
                            product.originalPrice) *
                            100
                        )}
                        %
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() =>
                    console.log(`Added product ${product.id} to cart`)
                  }
                  className="bg-teal-500 hover:bg-teal-600 text-white py-1.5 sm:py-2.5 px-2 sm:px-4 rounded-lg font-medium transition-colors w-full flex items-center justify-center text-xs sm:text-base"
                >
                  <FaShoppingCart
                    className="mr-1 sm:mr-2"
                    size={isMobile ? 12 : 16}
                  />
                  ADD TO CART
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-4 sm:mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            to="/shop"
            className="inline-flex items-center text-teal-600 font-semibold hover:text-teal-700 text-base sm:text-lg"
          >
            View All Products
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
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

// Add this to your CSS to handle extremely small text
const style = document.createElement("style");
style.innerHTML = `
  .text-xxs {
    font-size: 0.65rem;
    line-height: 1rem;
  }
`;
document.head.appendChild(style);

export default FeaturedProducts;
