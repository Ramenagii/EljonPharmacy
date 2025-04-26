import React from "react";
import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";
import UploadPrescription from "../components/UploadPrescription";
import FeaturedProducts from "../components/FeaturedProducts";
import Testimonials from "../components/Testimonials";

const HomePage = () => {
  return (
    <div className="bg-gradient-to-b from-teal-300/20 via-teal-200/15 to-blue-100/10 min-h-screen">
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <UploadPrescription />
      <Testimonials />
    </div>
  );
};

export default HomePage;
