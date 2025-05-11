import React from 'react';

const FeaturedPartnerCard = ({ partner }) => {
  return (
    <div 
      className="bg-gray-800 rounded-lg overflow-hidden flex flex-col md:flex-row border border-green-500/20 hover:border-green-500/40 transition-all"
    >
      <div className="bg-white p-6 flex items-center justify-center md:w-1/3">
        <div className="text-center">
          <div className="text-gray-800 font-bold text-xl">{partner.name}</div>
          <div className="text-sm text-gray-500 mt-1">[Logo]</div>
        </div>
      </div>
      <div className="p-6 md:w-2/3">
        <div className="mb-2">
          <span className="px-3 py-1 bg-green-900/50 text-green-400 text-xs rounded-full">
            {partner.type}
          </span>
        </div>
        <p className="text-gray-300 mb-4">
          {partner.description}
        </p>
        <a 
          href={partner.website} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-green-500 hover:text-green-400 inline-flex items-center text-sm font-medium"
        >
          Visitar sitio web
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default FeaturedPartnerCard;