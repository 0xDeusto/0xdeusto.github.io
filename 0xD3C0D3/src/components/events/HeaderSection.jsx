import React from 'react';

const HeaderSection = () => {
  return (
    <div className="text-center mb-16">
      <h1 className="font-['Orbitron',_sans-serif] text-4xl md:text-5xl font-bold mb-4 text-green-500">Eventos</h1>
      <div className="h-1 w-20 bg-green-500 mx-auto mb-8"></div>
      <p className="text-gray-300 max-w-3xl mx-auto text-lg">
        Descubre todos nuestros talleres, competiciones, charlas y más. 
        Únete a nosotros para aprender y compartir conocimientos.
      </p>
    </div>
  );
};

export default HeaderSection;