import React from 'react';

const PartnerCard = ({ partner }) => {
  // Generate initials for the partner logo placeholder
  const initials = partner.name.split(' ').map(word => word[0]).join('');
  
  return (
    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700 hover:border-gray-600 transition-all">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center text-gray-800 font-bold text-xs mr-4">
          {initials}
        </div>
        <div>
          <h3 className="font-medium text-white">{partner.name}</h3>
          <span className="text-xs text-gray-400">{partner.type}</span>
        </div>
      </div>
      <a 
        href={partner.website} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-green-500 hover:text-green-400 text-sm flex justify-between items-center mt-2"
      >
        <span>Ver más información</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
        </svg>
      </a>
    </div>
  );
};

export default PartnerCard;