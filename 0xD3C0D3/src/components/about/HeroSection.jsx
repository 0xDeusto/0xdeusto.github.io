import React from 'react';
import { stats } from '../../data/aboutPageData';

const HeroSection = () => {
  return (
    <section className="mb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="font-['Orbitron',_sans-serif] text-4xl md:text-5xl font-bold mb-6 text-green-500 tracking-wider">Sobre Nosotros</h1>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            Somos una comunidad universitaria apasionada por la tecnología, la programación y la ciberseguridad.
            Nuestro objetivo es fomentar el aprendizaje colaborativo y el intercambio de conocimiento entre estudiantes.
          </p>
        </div>
        
        {/* Estadísticas */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-green-500 mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;