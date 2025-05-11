import React from 'react';
import FeaturedPartnerCard from './FeaturedPartnerCard';

const FeaturedPartnersSection = ({ partners }) => {
  return (
    <div className="mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {partners.map((partner) => (
          <FeaturedPartnerCard key={partner.id} partner={partner} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedPartnersSection;