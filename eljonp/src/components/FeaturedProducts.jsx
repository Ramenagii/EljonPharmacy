import React from 'react';

const FeaturedProducts = () => {
  const products = [
    { id: 1, name: 'Pain Reliever', price: 4.09, image: '/images/pain-reliever.jpg' },
    { id: 2, name: 'Vitamins', price: 1.19, image: '/images/vitamins.jpg' },
    { id: 3, name: 'Cough Syrup', price: 0.49, image: '/images/cough-syrup.jpg' },
    { id: 4, name: 'Antihistamine', price: 10.90, image: '/images/antihistamine.jpg' },
  ];

  const addToCart = (productId) => {
    // Handle add to cart logic
    console.log(`Added product ${productId} to cart`);
  };

  return (
    <section className="mt-16 mb-12 px-4">
      <h2 className="text-4xl font-bold text-teal-700 mb-8 text-center">Featured Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="group flex flex-col rounded-xl shadow-lg bg-gradient-to-r from-teal-100 via-teal-50 to-white p-4 transform transition-all hover:scale-105 hover:shadow-xl">
            <div className="flex justify-center mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32 object-contain transition-transform transform group-hover:scale-110"
              />
            </div>
            <h3 className="font-semibold text-lg text-teal-600 mb-2">{product.name}</h3>
            <p className="text-lg font-bold text-teal-500 mb-4">
              ₱{(product.price * 50).toFixed(2)} {/* Assuming 1 USD = 50 PHP */}
            </p>
            <button
              onClick={() => addToCart(product.id)}
              className="bg-teal-600 text-white py-2 px-4 rounded-full font-medium hover:bg-teal-700 transition-colors mt-auto transform hover:scale-105"
            >
              ADD TO CART
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
