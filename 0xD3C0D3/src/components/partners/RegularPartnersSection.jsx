import React from 'react';
import PartnerCard from './PartnerCard';

const RegularPartnersSection = ({ partners }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-white mb-6 border-b border-gray-700 pb-2">Otros colaboradores</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {partners.map((partner) => (
          <PartnerCard key={partner.id} partner={partner} />
        ))}
      </div>
    </div>
  );
};

export default RegularPartnersSection;