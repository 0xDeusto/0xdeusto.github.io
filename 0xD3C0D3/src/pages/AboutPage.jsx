import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import HeroSection from '../components/about/HeroSection';
import HistoryMissionSection from '../components/about/HistoryMissionSection';
import ValuesSection from '../components/about/ValuesSection';
import TeamSection from '../components/about/TeamSection';
import FAQSection from '../components/about/FAQSection';
import CTASection from '../components/about/CTASection';

const AboutPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <HeroSection />
        <HistoryMissionSection />
        <ValuesSection />
        <TeamSection />
        <FAQSection />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;