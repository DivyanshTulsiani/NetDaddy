
import React, { useState, useEffect } from 'react';
import './styles/main.css';

// Import components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import TestimonialsSection from './components/TestimonialsSection';
import PricingSection from './components/PricingSection';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        {/* <TestimonialsSection />
        <PricingSection />
        <CtaSection /> */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
