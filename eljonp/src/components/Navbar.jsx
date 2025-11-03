import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  IconMenu2,
  IconX,
  IconShoppingCart,
  IconSearch,
} from "@tabler/icons-react";
import { useState, useEffect } from "react";

// Create motion-wrapped Link component
const MotionLink = motion(Link);

// Animation variants
const menuVariants = {
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.05,
      staggerDirection: -1,
      when: "afterChildren",
    },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300 },
  },
  closed: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2 },
  },
};

const Navbar = ({ cartItems = [] }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport and handle scroll events
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.header
      className={`py-3 sm:py-5 fixed top-0 left-0 right-0 z-50 px-4 md:px-8 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur-sm"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo with animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/" className="flex items-center">
            <span className="text-teal-500 text-2xl sm:text-3xl md:text-4xl mr-1 sm:mr-2">
              +
            </span>
            <span className="font-bold text-lg sm:text-xl md:text-2xl">
              Eljon Pharmacy
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {["Home", "Shop", "About", "Contact"].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Link
                to={`/${
                  item.toLowerCase() === "home" ? "" : item.toLowerCase()
                }`}
                className="text-gray-700 hover:text-teal-500 transition-colors font-medium"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Icon Group */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Icon */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="hidden sm:block"
          >
            <button className="p-1.5 text-gray-700 hover:text-teal-500 transition-colors">
              <IconSearch className="h-5 w-5" />
            </button>
          </motion.div>

          {/* Cart Icon */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              to="/cart"
              className="relative flex justify-center items-center p-1.5 text-gray-700 hover:text-teal-500 transition-colors"
            >
              <IconShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </motion.div>

          {/* Sign in Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="hidden sm:block"
          >
            <MotionLink
              to="/signin"
              className="border border-teal-500 text-teal-500 px-3 py-1.5 sm:px-4 sm:py-2 rounded hover:bg-teal-500 hover:text-white transition-colors text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign in
            </MotionLink>
          </motion.div>

          {/* Register Button for desktop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="hidden md:block"
          >
            <MotionLink
              to="/register"
              className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register
            </MotionLink>
          </motion.div>

          {/* Mobile menu toggle */}
          <motion.button
            className="ml-1 sm:ml-2 md:hidden p-1.5 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? (
              <IconX className="h-5 w-5" />
            ) : (
              <IconMenu2 className="h-5 w-5" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            className="md:hidden overflow-hidden bg-white border-t mt-3"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="py-2">
              {["Home", "Shop", "About", "Contact"].map((item, index) => (
                <motion.div
                  key={item}
                  variants={itemVariants}
                  className="border-b border-gray-100"
                >
                  <Link
                    to={`/${
                      item.toLowerCase() === "home" ? "" : item.toLowerCase()
                    }`}
                    className="block text-gray-700 hover:bg-gray-50 hover:text-teal-500 py-3 px-4 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile menu extra items */}
              <motion.div
                variants={itemVariants}
                className="pt-2 px-4 flex gap-2"
              >
                <MotionLink
                  to="/signin"
                  className="flex-1 border border-teal-500 text-teal-500 py-2 rounded text-center font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign in
                </MotionLink>
                <MotionLink
                  to="/register"
                  className="flex-1 bg-teal-500 text-white py-2 rounded text-center font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </MotionLink>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
