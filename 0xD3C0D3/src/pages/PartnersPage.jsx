import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import HeaderSection from '../components/partners/HeaderSection';
import FeaturedPartnersSection from '../components/partners/FeaturedPartnersSection';
import RegularPartnersSection from '../components/partners/RegularPartnersSection';
import CTASection from '../components/partners/CTASection';
import { partners } from '../data/partnersData';

const PartnersPage = () => {
  // Split partners into featured and regular
  const featuredPartners = partners.slice(0, 2);
  const regularPartners = partners.slice(2);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HeaderSection />
          <FeaturedPartnersSection partners={featuredPartners} />
          <RegularPartnersSection partners={regularPartners} />
          <CTASection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PartnersPage;