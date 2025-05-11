import React from 'react';

const EmptyStateSection = ({ resetFilters }) => {
  return (
    <div className="text-center py-16">
      <div className="text-green-500 text-5xl mb-4">
        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">No se encontraron eventos</h3>
      <p className="text-gray-400">Intenta con otros filtros o términos de búsqueda</p>
      <button 
        onClick={resetFilters} 
        className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white text-sm font-medium transition-all"
      >
        Mostrar todos los eventos
      </button>
    </div>
  );
};

export default EmptyStateSection;