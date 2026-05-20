import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconSearch, IconShoppingCartPlus } from '@tabler/icons-react';
import { staggerContainer, fadeIn, textVariant } from '../utils/motion';
import { money, parsePrice } from '../services/salesApi';

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
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', ...Object.keys(categorizedInventory)];

  const filteredInventory = Object.entries(categorizedInventory).reduce((acc, [category, items]) => {
    const query = searchQuery.toLowerCase();
    const categoryMatch = activeCategory === 'All' || activeCategory === category;

    if (!categoryMatch) {
      return acc;
    }

    const filteredItems = items.filter((item) => {
      return item.name.toLowerCase().includes(query) || category.toLowerCase().includes(query);
    });

    if (filteredItems.length > 0) {
      acc[category] = {
        name: category,
        items: filteredItems,
      };
    }
    return acc;
  }, {});

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerContainer}
      className="mx-auto max-w-7xl px-4 py-10"
    >
      <motion.div variants={textVariant(0.1)} className="mb-8">
        <span className="rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700">
          Complete catalog
        </span>
        <h1 className="mt-3 text-4xl font-bold text-slate-900">Pharmacy Inventory</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Search medicines, supplies, personal care items, and everyday health essentials.
        </p>
      </motion.div>

      <motion.div
        variants={fadeIn('up', 'spring', 0.2, 0.75)}
        className="sticky top-[72px] z-20 mb-8 rounded-xl border border-slate-200 bg-white/95 p-4 shadow-sm backdrop-blur"
      >
        <div className="relative">
          <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search products or categories"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                activeCategory === category
                  ? 'border-teal-600 bg-teal-600 text-white'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-teal-300 hover:text-teal-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {Object.values(filteredInventory).map(({ name: category, items }, index) => (
          <motion.div
            key={category}
            variants={fadeIn('up', 'spring', index * 0.1, 0.75)}
            className="mb-10"
          >
            <motion.h2
              className="mb-4 border-b border-slate-200 pb-3 text-2xl font-semibold text-slate-900"
              variants={textVariant(0.1)}
            >
              {category}
              <span className="ml-3 text-sm font-medium text-slate-400">{items.length} items</span>
            </motion.h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {items.map((item, itemIndex) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: itemIndex * 0.05 }}
                  className="flex min-h-[178px] flex-col justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-md"
                >
                  <div>
                    <span className="mb-3 inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
                      In stock
                    </span>
                    <h3 className="min-h-12 text-sm font-semibold uppercase leading-6 tracking-normal text-slate-900">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-lg font-bold text-teal-700">
                      {money.format(parsePrice(item.price))}
                    </p>
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className="mt-4 inline-flex items-center justify-center rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
                  >
                    <IconShoppingCartPlus className="mr-2 h-4 w-4" />
                    Add
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
