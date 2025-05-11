import React from 'react';

const Community = () => {
  const stats = [
    { number: "120+", label: "Miembros" },
    { number: "25+", label: "Eventos anuales" },
    { number: "8+", label: "Proyectos activos" },
    { number: "3+", label: "Años de experiencia" },
  ];

  const testimonials = [
    {
      content: "Unirme a 0xD3C0D3 fue lo mejor que hice en la universidad. He aprendido más sobre ciberseguridad aquí que en muchas clases.",
      author: "Estudiante Ing. Informática",
      year: "3er curso"
    },
    {
      content: "Los talleres y competiciones me han ayudado a desarrollar habilidades prácticas que ahora aplico en mi trabajo como desarrollador.",
      author: "Alumni",
      year: "Graduado 2023"
    },
    {
      content: "Gracias a los conocimientos adquiridos en CTFs con 0xD3C0D3, conseguí mi primera certificación en ciberseguridad.",
      author: "Estudiante Ing. Sistemas",
      year: "4º curso"
    },
  ];

  return (
    <section className="py-16 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-500">Nuestra comunidad</h2>
          <div className="h-1 w-20 bg-green-500 mx-auto mb-8"></div>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-900 border border-green-500/20 rounded-xl p-6 text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-500 mb-2">{stat.number}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Gallery section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 bg-gray-700 h-64 rounded-xl flex items-center justify-center overflow-hidden">
              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Galería de eventos</h3>
                <p className="text-gray-300 mb-4">Visita nuestra galería para ver las fotos y recuerdos de eventos pasados</p>
                <button className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white font-medium transition-all">
                  Ver galería
                </button>
              </div>
            </div>
            <div className="grid grid-rows-2 gap-4">
              <div className="bg-gray-700 rounded-xl h-full flex items-center justify-center overflow-hidden">
                <div className="p-4 text-center">
                  <h4 className="text-white font-bold">Hackathon 2024</h4>
                </div>
              </div>
              <div className="bg-gray-700 rounded-xl h-full flex items-center justify-center overflow-hidden">
                <div className="p-4 text-center">
                  <h4 className="text-white font-bold">CTF Team</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Lo que dicen nuestros miembros</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-900 border border-green-500/20 rounded-xl p-6 shadow-lg">
                <svg className="w-8 h-8 text-green-500 mb-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-gray-300 mb-4">"{testimonial.content}"</p>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-white font-medium">{testimonial.author}</div>
                    <div className="text-gray-400 text-sm">{testimonial.year}</div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-xl p-8 border border-green-500/30">
          <div className="md:flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">¿Preparado para unirte a 0xD3C0D3?</h3>
              <p className="text-gray-300 mb-6 md:mb-0">Forma parte de nuestra comunidad y desarrolla tus habilidades tecnológicas</p>
            </div>
            <div className="flex space-x-4">
              <button className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-md text-white font-medium transition-all shadow-lg">
                Unirse ahora
              </button>
              <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 border border-green-500/30 rounded-md text-white font-medium transition-all">
                Contactar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;