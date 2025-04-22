import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IconMenu2, IconX, IconShoppingCart } from '@tabler/icons-react'; // Added the cart icon
import { useState } from 'react';

// Create motion-wrapped Link component
const MotionLink = motion(Link);

// Animation variants
const menuVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  closed: {
    opacity: 0,
    y: "-100%",
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300 }
  },
  closed: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2 }
  }
};

const Navbar = ({ cartItems }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header 
      className="py-6"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="flex items-center justify-between">
        {/* Logo with animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/" className="flex items-center">
            <span className="text-teal-500 text-4xl mr-2">+</span>
            <span className="font-bold text-2xl">Pharmacy</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {['Home', 'Shop', 'About', 'Contact'].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Link 
                to={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`} 
                className="text-gray-800 hover:text-teal-500"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Sign in + Menu Button */}
        <div className="flex items-center">
          {/* Cart Icon */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              to="/cart"
              className="relative ml-6"
            >
              <IconShoppingCart className="h-6 w-6 text-teal-500" />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2 py-1">
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
          >
            <MotionLink
              to="/signin"
              className="border border-teal-500 text-teal-500 px-4 py-2 rounded hover:bg-teal-500 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign in
            </MotionLink>
          </motion.div>

          {/* Mobile menu toggle */}
          <motion.button 
            className="ml-4 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? (
              <IconX className="h-6 w-6" />
            ) : (
              <IconMenu2 className="h-6 w-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            className="mt-4 md:hidden space-y-3"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {['Home', 'Shop', 'About', 'Contact'].map((item) => (
              <motion.div key={item} variants={itemVariants}>
                <Link 
                  to={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`} 
                  className="block text-gray-800 hover:text-teal-500 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
