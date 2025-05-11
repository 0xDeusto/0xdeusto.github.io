import React from 'react';

const HistoryMissionSection = () => {
  return (
    <section className="mb-16 bg-gray-800/50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-white">Nuestra Historia</h2>
            <div className="space-y-4">
              <p className="text-gray-300">
                0xD3C0D3 nació en 2025 como una iniciativa de estudiantes de Ingeniería Informática de la Universidad de Deusto,
                con la visión de crear un espacio donde los apasionados por la tecnología pudieran compartir conocimientos y experiencias.
              </p>
              <p className="text-gray-300">
                Desde entonces, hemos crecido y evolucionado, organizando eventos, talleres y competiciones que fomentan el aprendizaje práctico
                y la colaboración entre estudiantes de diversas disciplinas.
              </p>
              <p className="text-gray-300">
                Nuestro enfoque se basa en la ética hacker, el software libre y la innovación, promoviendo un ambiente inclusivo y diverso
                donde todos puedan contribuir y aprender.
              </p>
            </div>
          </div>
          
          <div>
            <div className="bg-gray-700 rounded-xl p-8 border border-green-500/20">
              <h3 className="text-2xl font-semibold text-white mb-4">Nuestra Misión</h3>
              <p className="text-gray-300 mb-6">
                Crear un entorno de aprendizaje colaborativo donde estudiantes de todas las disciplinas puedan desarrollar 
                habilidades técnicas, compartir conocimientos y crear soluciones innovadoras a problemas reales.
              </p>
              
              <h3 className="text-2xl font-semibold text-white mb-4">Nuestra Visión</h3>
              <p className="text-gray-300">
                Ser un referente universitario en formación tecnológica complementaria, fomentando la cultura hacker ética, 
                el software libre y la innovación en un ambiente inclusivo y diverso.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistoryMissionSection;