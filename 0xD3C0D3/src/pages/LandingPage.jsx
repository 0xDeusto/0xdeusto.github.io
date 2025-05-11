import React from 'react';
import Navbar from '../components/common/Navbar';
import Hero from '../components/landing/Hero';
import About from '../components/landing/About';
import Areas from '../components/landing/Areas';
import Events from '../components/landing/Events';
import Community from '../components/landing/Community';
import Footer from '../components/common/Footer';

function LandingPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Areas />
      <Events />
      <Community />
      <Footer />
    </div>
  )
}

export default LandingPage;