import React from 'react';

// Animated SVG icons with consistent hover effects
const AnimatedIcon = ({ children }) => (
  <div className="p-2 rounded-full bg-teal-50 transition-all duration-300 hover:bg-teal-100 hover:scale-110">
    {children}
  </div>
);

const IconPhone = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="text-teal-500 transition-colors duration-300"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const IconMail = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="text-teal-500 transition-colors duration-300"
  >
    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);

const IconMapPin = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="text-teal-500 transition-colors duration-300"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const IconCircle = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="text-teal-500 transition-colors duration-300"
  >
    <circle cx="12" cy="12" r="10"></circle>
  </svg>
);

const ContactPage = () => {
  const contactItems = [
    {
      icon: <IconPhone />,
      text: "(123) 456-7890"
    },
    {
      icon: <IconMail />,
      text: "support@pharmacy.com"
    },
    {
      icon: <IconMapPin />,
      text: "123 Main St, City, Country"
    },
    {
      icon: <IconCircle />,
      text: "Lcsat 33, Country"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 animate-fadeIn">
      {/* Global styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
        @keyframes subtlePulse {
          0% { transform: scale(1); box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
          50% { transform: scale(1.01); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
          100% { transform: scale(1); box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-subtlePulse {
          animation: subtlePulse 6s ease-in-out infinite;
        }
      `}</style>

      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 transition-opacity duration-500">
            Contact Us
          </h1>
          <p className="text-gray-600 mb-8 max-w-lg transition-opacity duration-500">
            Whether you have questions about prescriptions, over-the-counter products, or services, we're here to help.
          </p>
          
          <form className="space-y-4">
            <div>
              <input 
                type="text" 
                placeholder="Name" 
                className="w-full p-3 border border-gray-300 rounded-md transition-all duration-300 
                          hover:border-teal-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-200"
                required
              />
            </div>
            <div>
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full p-3 border border-gray-300 rounded-md transition-all duration-300 
                          hover:border-teal-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-200"
                required
              />
            </div>
            <div>
              <textarea 
                placeholder="Message" 
                className="w-full p-3 border border-gray-300 rounded-md h-36 resize-y transition-all duration-300 
                          hover:border-teal-300 focus:border-teal-500 focus:ring-1 focus:ring-teal-200"
                required
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-4 rounded-md 
                        transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] 
                        shadow-md hover:shadow-lg"
            >
              Send Message
            </button>
          </form>
        </div>
        
        <div className="flex-1 flex justify-center items-center">
          <div className="relative w-full max-w-md">
            <div className="rounded-full bg-teal-100 w-64 h-64 md:w-80 md:h-80 mx-auto relative 
                          transition-all duration-500 hover:shadow-lg">
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-white rounded-md flex 
                            items-center justify-center shadow-md animate-float transition-all duration-300 
                            hover:shadow-lg">
                <div className="text-teal-500 text-4xl transition-transform duration-300 hover:scale-110">+</div>
              </div>
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-36 h-48 
                            bg-white rounded-t-full shadow-md animate-float transition-all duration-300 
                            hover:shadow-lg" style={{ animationDelay: "2s" }}>
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-28 h-28 
                              bg-teal-500 rounded-lg transition-all duration-300 hover:bg-teal-600 
                              flex items-center justify-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="40" 
                    height="40" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="white" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="transition-transform duration-300 hover:scale-110"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {contactItems.map((item, index) => (
          <div 
            key={index}
            className="flex items-center gap-3 p-4 bg-white rounded-lg transition-all duration-300 
                      hover:shadow-md hover:-translate-y-1 animate-subtlePulse"
            style={{ animationDelay: `${index * 0.5}s` }}
          >
            <AnimatedIcon>{item.icon}</AnimatedIcon>
            <span className="text-gray-700 transition-colors duration-300 hover:text-gray-900">
              {item.text}
            </span>
          </div>
        ))}
      </div>
      
      {/* Google Maps placeholder */}
      <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden relative 
                    transition-all duration-500 hover:shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-blue-500/10 
                      opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white bg-opacity-90 rounded-lg p-4 shadow-lg transition-all duration-300 
                        hover:scale-105">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-teal-100 transition-all duration-300 hover:scale-110">
                <IconMapPin />
              </div>
              <span className="font-medium text-gray-800 transition-colors duration-300 hover:text-gray-900">
                Pharmacy Location
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;