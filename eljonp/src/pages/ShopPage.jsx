import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, fadeIn, textVariant } from '../utils/motion';

const categorizedInventory = {
  "Medical Supplies": [
    { name: "10CC SYRINGE", price: "₱10" },
    { name: "1CC SYRINGE", price: "₱5" },
    { name: "3CC SYRINGE", price: "₱6" },
    { name: "5CC SYRINGE", price: "₱8" },
    { name: "BAND AID", price: "₱2" },
    { name: "ELASTIC BANDAGE 2x5", price: "₱21" },
    { name: "GAUZE BANDAGE 2x10", price: "₱15" },
    { name: "MICROPORE 1/2inch", price: "₱20" },
    { name: "LATEX GLOVES LARGE", price: "₱10" },
    { name: "URINE BAG", price: "₱25" },
  ],
  "Pain & Fever Management": [
    { name: "PARACETAMOL TAB", price: "₱2.50" },
    { name: "MEFENAMIC 500mg CAP", price: "₱3" },
    { name: "DICLOFENAC 50mg TAB", price: "₱1.50" },
    { name: "IBUPROFEN 200mg TAB", price: "₱3" },
    { name: "CALPOL DROPS", price: "₱108" },
    { name: "TEMPRA 325mg TAB", price: "₱5" },
  ],
  "Respiratory Care": [
    { name: "AMBROXOL 15mg SYR", price: "₱35" },
    { name: "SALBUTAMOL INHALER", price: "₱230" },
    { name: "SOLMUX 500mg CAP", price: "₱13" },
    { name: "LAGUNDI 300mg SYR", price: "₱70" },
    { name: "ASCOF 120mL SYR", price: "₱154" },
  ],
  "Vitamins & Supplements": [
    { name: "ENERVON BOTTLE", price: "₱237" },
    { name: "CEELIN 120mL SYR", price: "₱138" },
    { name: "FERLIN SYR 120ml", price: "₱350" },
    { name: "CHERIFER 30mL DROPS", price: "₱155" },
    { name: "NUTRILEARN PED 250mL SYR", price: "₱346" },
    { name: "POTENCEE + COLLAGEN CAP", price: "₱20" },
  ],
  "Baby & Maternal Care": [
    { name: "BFLO BABY WIPES 30s", price: "₱47" },
    { name: "LACTACYD BABY 60mL", price: "₱99" },
    { name: "CERELAC 120g", price: "₱79" },
    { name: "BONAKID 1-3 350g", price: "₱237" },
    { name: "LAMPEIN DIAPER M12", price: "₱86" },
    { name: "NASAL ASPIRATOR", price: "₱60" },
  ],
  "Personal Care": [
    { name: "SAFEGUARD SOAP 135g", price: "₱54" },
    { name: "LIKAS PAPAYA SOAP 135g", price: "₱185" },
    { name: "REXONA MEN SPORT DEF 25mL", price: "₱78" },
    { name: "WHITE FLOWER NO.3", price: "₱96" },
    { name: "VICKS VAPORUB 50g", price: "₱234" },
    { name: "BETADINE FEM WASH 25mL", price: "₱75" },
  ],
  "Medical Equipment": [
    { name: "NEBULIZER", price: "₱780" },
    { name: "DIGITAL THERMOMETER", price: "₱110" },
    { name: "DIGITAL BP", price: "₱1150" },
    { name: "HOT WATER BAG 500ml", price: "₱120" },
    { name: "OXYGEN MASK ADULT", price: "₱80" },
  ],
  "Nutritional Products": [
    { name: "BEAR BRAND 300g", price: "₱126" },
    { name: "ALASKA 1.7Kg", price: "₱418" },
    { name: "NIDO 3+ 400g", price: "₱247" },
    { name: "ENSURE GOLD 400g", price: "₱843" },
    { name: "BONAKID PRE-SCHOOL 350g", price: "₱237" },
  ],
  "OTC Medications": [
    { name: "LORATADINE 10mg TAB", price: "₱3.50" },
    { name: "CETIRIZINE 10mg TAB", price: "₱2" },
    { name: "KREMIL S TAB", price: "₱10" },
    { name: "GAVISCON TAB", price: "₱20" },
    { name: "IMODIUM CAP", price: "₱19" },
  ],
  "Specialty Products": [
    { name: "DIANE 35 PILLS", price: "₱764" },
    { name: "KAMILLOSAN SPRAY", price: "₱496" },
    { name: "RHEA COLCHICINE 500mcg", price: "₱464" },
    { name: "ELICA OINTMENT 5g", price: "₱522" },
  ]
};

const ShopPage = ({ addToCart }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInventory = Object.entries(categorizedInventory).reduce((acc, [category, items]) => {
    const query = searchQuery.toLowerCase();
    const categoryMatch = category.toLowerCase().includes(query);

    const filteredItems = categoryMatch
      ? items
      : items.filter(item => item.name.toLowerCase().includes(query));

    if (filteredItems.length > 0) {
      acc[category] = {
        name: category,
        items: filteredItems,
        isCategoryMatch: categoryMatch,
      };
    }
    return acc;
  }, {});

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerContainer}
      className="py-10 px-4 max-w-7xl mx-auto"
    >
      <motion.div variants={textVariant(0.1)}>
        <h1 className="text-4xl font-bold mb-6">Pharmacy Inventory</h1>
        <p className="mb-8 text-gray-600">Search and browse our complete medical catalog</p>
      </motion.div>

      {/* Search Bar */}
      <motion.div variants={fadeIn('up', 'spring', 0.2, 0.75)} className="mb-8">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </motion.div>

      <AnimatePresence mode="wait">
        {Object.values(filteredInventory).map(({ name: category, items, isCategoryMatch }, index) => (
          <motion.div
            key={category}
            variants={fadeIn('up', 'spring', index * 0.1, 0.75)}
            className="mb-12"
          >
            <motion.h2
              className={`text-2xl font-semibold mb-4 border-b-2 pb-2 ${isCategoryMatch ? 'text-green-600 border-green-200' : 'text-blue-600 border-blue-200'}`}
              variants={textVariant(0.1)}
            >
              {category}
              {isCategoryMatch && <span className="ml-2 text-sm text-green-500">(Category Match)</span>}
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((item, itemIndex) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: itemIndex * 0.05 }}
                  className={`p-4 border rounded-lg transition-shadow duration-200 bg-white ${isCategoryMatch ? 'hover:shadow-green-lg border-green-100' : 'hover:shadow-lg'}`}
                >
                  <h3 className="font-medium text-gray-800 mb-1">
                    {item.name}
                    {item.name.toLowerCase().includes(searchQuery.toLowerCase()) && (
                      <span className="ml-2 text-xs text-blue-500">(Name Match)</span>
                    )}
                  </h3>
                  <p className="text-sm text-blue-600 font-semibold">{item.price}</p>
                  <button
                    onClick={() => addToCart(item)}
                    className="mt-2 bg-teal-500 text-white px-4 py-2 rounded font-medium hover:bg-teal-600 transition-colors"
                  >
                    Add to Cart
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {Object.keys(filteredInventory).length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 text-gray-500">
            No products found matching your search.
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ShopPage;