import React from 'react';
import { coreValues } from '../../data/aboutPageData';

const ValuesSection = () => {
  return (
    <section className="mb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-12 text-white text-center">Nuestros Valores</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreValues.map((value, index) => (
            <div key={index} className="bg-gray-800 rounded-xl p-6 border border-green-500/20 hover:border-green-500/40 transition-all">
              <div className="bg-green-900/30 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
              <p className="text-gray-400">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;