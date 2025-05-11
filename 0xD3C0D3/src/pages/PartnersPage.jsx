import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { partners } from '../data/partnersData';

const PartnersPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cabecera más simple */}
          <div className="text-center mb-16">
            <h1 className="font-['Orbitron',_sans-serif] text-4xl md:text-5xl font-bold mb-6 text-green-500 tracking-wider">Colaboradores</h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Organizaciones que hacen posible nuestras actividades y nos apoyan en nuestro crecimiento.
            </p>
          </div>
          
          {/* Lista de partners destacados */}
          <div className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {partners.slice(0, 2).map((partner) => (
                <div 
                  key={partner.id} 
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
              ))}
            </div>
          </div>
          
          {/* Resto de partners */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-6 border-b border-gray-700 pb-2">Otros colaboradores</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {partners.slice(2).map((partner) => (
                <div 
                  key={partner.id} 
                  className="bg-gray-800 rounded-lg p-5 border border-gray-700 hover:border-gray-600 transition-all"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center text-gray-800 font-bold text-xs mr-4">
                      {partner.name.split(' ').map(word => word[0]).join('')}
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
              ))}
            </div>
          </div>
          
          {/* CTA para convertirse en partner  */}
          <div className="mt-16 bg-gradient-to-r from-green-900/20 to-gray-800 rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-white mb-3">¿Interesado en colaborar con nosotros?</h3>
            <p className="text-gray-300 mb-5">
              Si tu organización quiere apoyar a nuestra comunidad, ponte en contacto con nosotros.
            </p>
            <button className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white font-medium transition-all shadow-lg">
              Contactar
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PartnersPage;