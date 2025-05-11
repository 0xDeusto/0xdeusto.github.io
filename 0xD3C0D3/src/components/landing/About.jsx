import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-500">Sobre nosotros</h2>
          <div className="h-1 w-20 bg-green-500 mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">¿Qué es 0xD3C0D3?</h3>
            <p className="text-gray-300">
              Somos una asociación estudiantil de la Universidad de Deusto formada por entusiastas
              de la informática y la tecnología. Nuestro objetivo es crear un espacio donde los estudiantes
              puedan expandir sus conocimientos más allá del aula, explorar nuevas tecnologías y
              desarrollar habilidades prácticas en un entorno colaborativo.
            </p>
            <p className="text-gray-300">
              Desde competiciones de ciberseguridad (CTFs) hasta proyectos de inteligencia artificial,
              abordamos múltiples disciplinas y fomentamos el aprendizaje entre pares.
            </p>
            
            <div className="pt-4">
              <h4 className="text-xl font-semibold text-white mb-3">Nuestros valores</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="bg-green-800/30 rounded-full p-2 mr-3">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <span className="text-gray-300">Innovación</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-800/30 rounded-full p-2 mr-3">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                  </div>
                  <span className="text-gray-300">Comunidad</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-800/30 rounded-full p-2 mr-3">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                    </svg>
                  </div>
                  <span className="text-gray-300">Conocimiento</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-800/30 rounded-full p-2 mr-3">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                    </svg>
                  </div>
                  <span className="text-gray-300">Colaboración</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl p-6 border border-green-500/20">
            <div className="bg-gray-900 rounded-lg p-4 mb-6">
              <div className="flex mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <pre className="text-green-500 font-mono text-sm">
                <code>{`#!/bin/bash
                # 0xD3C0D3 - Deusto Electronic Club
                # Welcome script

                echo "Initializing 0xD3C0D3 environment..."
                echo "Loading modules..."

                for module in cybersecurity ai linux programming; do
                  echo "- $module module loaded"
                  sleep 0.5
                done

                echo -e "\\nAll systems ready!"
                echo "Welcome to 0xD3C0D3 - Where code meets community"

                # Join us:
                # discord.gg/0xD3C0D3
                `}</code>
              </pre>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="px-6 py-3 bg-green-600/20 rounded-lg border border-green-500/30">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-green-500 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z"></path>
                  </svg>
                  <span className="text-white font-medium">Únete a nuestro Discord</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;