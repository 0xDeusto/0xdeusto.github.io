import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <div className="mt-16 bg-gradient-to-r from-green-900/20 to-gray-800 rounded-lg p-6 text-center">
      <h3 className="text-xl font-semibold text-white mb-3">¿Interesado en colaborar con nosotros?</h3>
      <p className="text-gray-300 mb-5">
        Si tu organización quiere apoyar a nuestra comunidad, ponte en contacto con nosotros.
      </p>
      <Link to="/contact" className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white font-medium transition-all shadow-lg inline-block">
        Contactar
      </Link>
    </div>
  );
};

export default CTASection;