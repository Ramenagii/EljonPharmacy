import React from 'react';
import HeroSection from '../components/HeroSection';
import CategorySection from '../components/CategorySection';
import UploadPrescription from '../components/UploadPrescription';
import FeaturedProducts from '../components/FeaturedProducts';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <CategorySection />
      <UploadPrescription />
      <FeaturedProducts />
    </div>
  );
};

export default HomePage;