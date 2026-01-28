import React, { useState, useEffect } from 'react';

const AboutSection = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const fullText = `> Somos una asociación estudiantil de la Universidad de Deusto formada por entusiastas de la informática y la tecnología. Nuestro objetivo es crear un espacio donde los estudiantes puedan expandir sus conocimientos más allá del aula, explorar nuevas tecnologías y desarrollar habilidades prácticas en un entorno colaborativo.`;

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 20);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  const areas = [
    {
      title: 'Ciberseguridad',
      description: 'CTFs, pentesting y ethical hacking',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      delay: '0s'
    },
    {
      title: 'Inteligencia Artificial',
      description: 'Machine Learning y Deep Learning',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      delay: '0.1s'
    },
    {
      title: 'Desarrollo',
      description: 'Web, mobile y software engineering',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      delay: '0.2s'
    },
    {
      title: 'Hackathons',
      description: 'Competiciones y eventos de programación',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      delay: '0.3s'
    },
    {
      title: 'Linux y Software Libre',
      description: 'Open source, GNU/Linux y FOSS',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      delay: '0.4s'
    },
    {
      title: 'Comunidad',
      description: 'Networking, charlas y colaboración',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      delay: '0.5s'
    }
  ];

  return (
    <section id="about" className="relative px-6 py-20 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-mono font-bold text-green-400 mb-12">
          Sobre nosotros
        </h2>

        {/* Terminal Effect */}
        <div className="mb-16 bg-black border-2 border-green-600 p-6 rounded-lg shadow-lg shadow-green-600/20">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-2 text-gray-500 text-sm font-mono">0xDeusto@terminal:~$</span>
          </div>
          <div className="font-mono text-green-400 text-base md:text-lg leading-relaxed">
            {displayedText}
            <span className="animate-pulse">█</span>
          </div>
        </div>

        {/* Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area, index) => (
            <div
              key={index}
              className="group bg-black border-2 border-green-600 p-6 hover:border-green-400 hover:shadow-lg hover:shadow-green-400/30 transition-all duration-300 hover:-translate-y-2"
              style={{ animationDelay: area.delay }}
            >
              <div className="flex items-start gap-4">
                <div className="text-green-400 group-hover:text-green-300 group-hover:scale-110 transition-all duration-300">
                  {area.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-mono font-bold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">
                    {area.title}
                  </h3>
                  <p className="text-gray-400 font-mono text-sm">
                    {area.description}
                  </p>
                </div>
              </div>
              {/* Decorative corner */}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
