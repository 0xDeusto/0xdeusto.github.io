import React from 'react';

const Areas = () => {
  const areas = [
    {
      title: "Ciberseguridad",
      icon: (
        <svg className="w-12 h-12 text-green-500 mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg>
      ),
      description: "Participamos en CTFs, analizamos vulnerabilidades y aprendemos técnicas de hacking ético. Organizamos talleres prácticos y desafíos internos.",
    },
    {
      title: "Inteligencia Artificial",
      icon: (
        <svg className="w-12 h-12 text-green-500 mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
      ),
      description: "Exploramos machine learning, procesamiento de lenguaje natural y visión por computadora. Desarrollamos proyectos y competimos en desafíos de IA.",
    },
    {
      title: "Sistemas Linux",
      icon: (
        <svg className="w-12 h-12 text-green-500 mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
        </svg>
      ),
      description: "Aprendemos administración de sistemas, automatización, scripting y personalización de entornos Linux. Experimentamos con diferentes distribuciones.",
    },
    {
      title: "Desarrollo de Software",
      icon: (
        <svg className="w-12 h-12 text-green-500 mb-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
        </svg>
      ),
      description: "Colaboramos en proyectos de código abierto, aprendemos frameworks modernos y metodologías ágiles. Realizamos hackathons y code reviews entre pares.",
    },
  ];

  return (
    <section className="py-16 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-500">Áreas de conocimiento</h2>
          <div className="h-1 w-20 bg-green-500 mx-auto mb-8"></div>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            En 0xD3C0D3 exploramos diversas áreas de la informática, fomentando
            un aprendizaje práctico y colaborativo entre todos los miembros.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {areas.map((area, index) => (
            <div 
              key={index}
              className="bg-gray-900 p-6 rounded-xl border border-green-500/20 shadow-lg hover:border-green-500/40 transition-all transform hover:-translate-y-1 hover:shadow-green-500/5"
            >
              <div className="text-center mb-3">
                {area.icon}
                <h3 className="text-xl font-bold text-white mb-3">{area.title}</h3>
              </div>
              <p className="text-gray-400 text-center">{area.description}</p>
            </div>
          ))}
        </div>

        {/* Terminal con comandos para los curiosos */}
        <div className="bg-gray-900 rounded-lg border border-green-500/20 p-4 mt-16 max-w-3xl mx-auto">
          <div className="flex mb-2">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="ml-4 text-gray-400 text-sm">terminal@0xD3C0D3:~$</div>
          </div>
          <div className="font-mono text-sm space-y-1 text-gray-300">
            <p><span className="text-green-500">cat</span> areas_of_interest.txt</p>
            <p className="pl-4 text-gray-400"># Estas son algunas de las tecnologías que exploramos</p>
            <p className="pl-4 text-gray-400"># ¡Ven y descubre más!</p>
            <div className="pl-4 grid grid-cols-3 gap-1">
              <span>- Python</span>
              <span>- JavaScript</span>
              <span>- Rust</span>
              <span>- Kali Linux</span>
              <span>- Docker</span>
              <span>- TensorFlow</span>
              <span>- Git</span>
              <span>- CTFs</span>
              <span>- React</span>
              <span>- PyTorch</span>
              <span>- AWS</span>
              <span>- Blockchain</span>
            </div>
            <p className="animate-pulse">_</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Areas;