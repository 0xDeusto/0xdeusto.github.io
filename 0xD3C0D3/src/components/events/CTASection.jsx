import React from 'react';

const CTASection = () => {
  return (
    <div className="mt-16 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 border border-green-500/30">
      <div className="md:flex items-center justify-between">
        <div className="mb-6 md:mb-0">
          <h3 className="text-2xl font-bold text-white mb-2">¿Tienes una idea para un evento?</h3>
          <p className="text-gray-300">Ayúdanos a crear una comunidad más activa proponiendo actividades</p>
        </div>
        <button className="px-8 py-3 bg-green-600 hover:bg-green-700 rounded-md text-white font-medium transition-all shadow-lg">
          Proponer evento
        </button>
      </div>
    </div>
  );
};

export default CTASection;