import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState({
    header: false,
    mission: false,
    vision: false,
    history: false,
    team: false,
    reasons: false,
    footer: false
  });

  useEffect(() => {
    // Staggered animation timing
    const timers = [
      setTimeout(() => setIsVisible(prev => ({ ...prev, header: true })), 100),
      setTimeout(() => setIsVisible(prev => ({ ...prev, mission: true })), 300),
      setTimeout(() => setIsVisible(prev => ({ ...prev, vision: true })), 500),
      setTimeout(() => setIsVisible(prev => ({ ...prev, history: true })), 700),
      setTimeout(() => setIsVisible(prev => ({ ...prev, team: true })), 900),
      setTimeout(() => setIsVisible(prev => ({ ...prev, reasons: true })), 1100),
      setTimeout(() => setIsVisible(prev => ({ ...prev, footer: true })), 1300)
    ];
    
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  // Team members data
  const teamMembers = [
    {
      name: "Eleanor R. Lorenzo",
      title: "Owner",
      image: "/api/placeholder/200/200",
    },
    {
      name: "John Doe",
      title: "Head Pharmacist",
      image: "/api/placeholder/200/200",
    },
    {
      name: "Sarah Johnson",
      title: "Pharmacist",
      image: "/api/placeholder/200/200",
    },
    {
      name: "James Williams",
      title: "Pharmacist",
      image: "/api/placeholder/200/200",
    }
  ];

  // Timeline data
  const timelineItems = [
    {
      year: "2024",
      title: "Founded",
      description: "was an amazing year for us!",
    },
    {
      year: "2025",
      title: "First aniversary",
      description: "and we are still going strong!",
    }
  ];

  // Why choose us data
  const reasons = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500 mx-auto">
          <path d="M8 3v9a4 4 0 0 0 8 0V3"></path>
          <path d="M4 13h16"></path>
          <path d="M6 16h12a2 2 0 0 1 2 2v1H4v-1a2 2 0 0 1 2-2z"></path>
        </svg>
      ),
      title: "Certified Pharmacists"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500 mx-auto">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
          <line x1="9" y1="9" x2="9.01" y2="9"></line>
          <line x1="15" y1="9" x2="15.01" y2="9"></line>
        </svg>
      ),
      title: "Fast & Friendly Service"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500 mx-auto">
          <rect x="1" y="3" width="15" height="13"></rect>
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
          <circle cx="5.5" cy="18.5" r="2.5"></circle>
          <circle cx="18.5" cy="18.5" r="2.5"></circle>
        </svg>
      ),
      title: "Prescription Delivery"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500 mx-auto">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      title: "Trusted by Thousands"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Hero Section */}
      <div 
        className={`relative overflow-hidden mb-12 transition-all duration-1000 transform ${
          isVisible.header ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold text-navy-800 mb-4">
            Caring for your health, every day.
          </h1>
          <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
            Meet Our Team
          </button>
        </div>
      </div>

      {/* Mission & Vision Cards */}
      <div className="flex flex-col md:flex-row gap-6 mb-16">
        <div 
          className={`flex-1 bg-white p-6 rounded-lg shadow-sm transition-all duration-700 transform ${
            isVisible.mission ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}
        >
          <div className="flex items-start mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
            </svg>
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
              <p className="text-gray-600 mt-2">Providing quality, accessible healthcare and personalized service to our community.</p>
            </div>
          </div>
        </div>

        <div 
          className={`flex-1 bg-white p-6 rounded-lg shadow-sm transition-all duration-700 transform ${
            isVisible.vision ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}
        >
          <div className="flex items-start mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
              <p className="text-gray-600 mt-2">To be the trusted leader in innovative pharmacy care and wellness solutions.</p>
            </div>
          </div>
        </div>
      </div>

      {/* History Timeline */}
      <div 
        className={`mb-20 transition-all duration-1000 transform ${
          isVisible.history ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <h2 className="text-3xl font-bold text-center mb-10">Our History</h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gray-200"></div>
          
          {/* Timeline items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {timelineItems.map((item, index) => (
              <div 
                key={index} 
                className={`relative transition-all duration-500 ${
                  index % 2 === 0 ? 'md:col-start-1' : 'md:col-start-2'
                }`}
              >
                <div 
                  className={`flex items-center mb-2 ${
                    index % 2 === 0 ? 'md:justify-end' : 'justify-start'
                  }`}
                >
                  <span className="text-teal-500 font-bold text-lg">{item.year}</span>
                  <div className="w-4 h-4 rounded-full bg-teal-500 mx-4 relative z-10"></div>
                </div>
                <div 
                  className={`bg-white p-4 rounded-lg shadow-sm transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                    index % 2 === 0 ? 'md:text-right' : 'text-left'
                  }`}
                >
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  {item.description && <p className="text-gray-600">{item.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div 
        className={`mb-20 transition-all duration-1000 transform ${
          isVisible.team ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <h2 className="text-3xl font-bold text-center mb-10">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="flex flex-col items-center transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="w-48 h-48 mb-4 rounded-lg overflow-hidden bg-gray-100">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-xl text-gray-800">{member.name}</h3>
              <p className="text-gray-600">{member.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div 
        className={`mb-20 transition-all duration-1000 transform ${
          isVisible.reasons ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <h2 className="text-3xl font-bold text-center mb-10">Why Choose Us</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div 
              key={index}
              className="text-center transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="mb-4">
                {reason.icon}
              </div>
              <h3 className="font-bold text-lg">{reason.title}</h3>
            </div>
          ))}
        </div>
      </div>

      <div 
  className={`bg-teal-500 rounded-lg p-8 text-center text-white transition-all duration-1000 transform ${
    isVisible.footer ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
  }`}
>
  <h2 className="text-2xl font-bold mb-4">Have questions? We're always here to help.</h2>
  <Link 
    to="/contact" 
    className="bg-white text-teal-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
  >
    Contact Us
  </Link>
</div>
    </div>
  );
};

export default AboutPage;