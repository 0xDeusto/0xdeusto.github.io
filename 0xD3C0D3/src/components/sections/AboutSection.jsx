import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="relative px-6 py-20 flex flex-col justify-center">
      <div className="max-w-4xl mx-auto z-10 relative">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-mono font-bold text-green-400 mb-12">
          Sobre nosotros
        </h2>

        {/* Content */}
        <div className="space-y-8">
          <div className="bg-black bg-opacity-60 border border-green-600 p-8 hover:border-green-400 transition-all duration-300">
            <p className="text-white text-lg md:text-xl leading-relaxed font-mono">
              Somos una asociación estudiantil de la Universidad de Deusto formada por entusiastas de la 
              informática y la tecnología. Nuestro objetivo es crear un espacio donde los estudiantes puedan 
              expandir sus conocimientos más allá del aula, explorar nuevas tecnologías y desarrollar habilidades 
              prácticas en un entorno colaborativo.
            </p>
          </div>

          <div className="bg-black bg-opacity-60 border border-green-600 p-8 hover:border-green-400 transition-all duration-300">
            <p className="text-white text-lg md:text-xl leading-relaxed font-mono">
              Desde competiciones de ciberseguridad (CTFs) hasta proyectos de inteligencia artificial, abordamos 
              múltiples disciplinas y fomentamos el aprendizaje entre pares.
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="mt-12 flex justify-center space-x-4">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
