import React from 'react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';

const AboutPage = () => {
  // Array con los miembros del equipo/líderes
  const teamMembers = [
    {
      id: 1,
      name: 'Alex Hernández',
      role: 'Fundador & Presidente',
      description: 'Estudiante de Ingeniería Informática con especialización en ciberseguridad. Apasionado de CTFs y el hacking ético.',
      image: '/images/team/placeholder.png',
      links: {
        github: 'https://github.com/',
        linkedin: 'https://linkedin.com/',
        twitter: 'https://twitter.com/'
      }
    },
    {
      id: 2,
      name: 'Laura Gómez',
      role: 'Coordinadora de Eventos',
      description: 'Especializada en organización de hackathons y talleres técnicos. Estudiante de último año de Ingeniería de Software.',
      image: '/images/team/placeholder.png',
      links: {
        github: 'https://github.com/',
        linkedin: 'https://linkedin.com/'
      }
    },
    {
      id: 3,
      name: 'Carlos Ruiz',
      role: 'Responsable Técnico',
      description: 'Entusiasta de la programación funcional y DevOps. Experiencia en organización de talleres sobre tecnologías cloud.',
      image: '/images/team/placeholder.png',
      links: {
        github: 'https://github.com/',
        linkedin: 'https://linkedin.com/',
        website: 'https://example.com/'
      }
    },
    {
      id: 4,
      name: 'Marta Silva',
      role: 'Coordinadora de Comunicación',
      description: 'Estudiante de Marketing Digital con pasión por la tecnología. Gestiona las redes sociales y estrategias de difusión.',
      image: '/images/team/placeholder.png',
      links: {
        linkedin: 'https://linkedin.com/',
        twitter: 'https://twitter.com/'
      }
    }
  ];

  // Array con los valores principales del club
  const coreValues = [
    {
      title: 'Aprendizaje Colaborativo',
      description: 'Creemos en compartir conocimientos y aprender juntos. Todos tenemos algo que enseñar y algo que aprender.',
      icon: (
        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
      )
    },
    {
      title: 'Innovación Constante',
      description: 'Fomentamos la experimentación y el uso de nuevas tecnologías para resolver problemas relevantes.',
      icon: (
        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
        </svg>
      )
    },
    {
      title: 'Inclusión y Diversidad',
      description: 'Damos la bienvenida a personas de todos los niveles y procedencias. La diversidad fortalece nuestra comunidad.',
      icon: (
        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
      )
    },
    {
      title: 'Ética Tecnológica',
      description: 'Promovemos el uso responsable de la tecnología y la conciencia sobre sus implicaciones sociales.',
      icon: (
        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
        </svg>
      )
    }
  ];

  // Estadísticas del club
  const stats = [
    { value: '20+', label: 'Eventos Realizados' },
    { value: '120+', label: 'Miembros Activos' },
    { value: '1', label: 'Años de Actividad' },
    { value: '10+', label: 'Proyectos Desarrollados' }
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero section */}
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
        
        {/* Historia y misión */}
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
        
        {/* Valores */}
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
        
        {/* Equipo */}
        <section className="mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-white text-center">Nuestro Equipo</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map(member => (
                <div key={member.id} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all">
                  <div className="h-48 bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-500">[Foto del miembro]</span>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                    <p className="text-green-500 text-sm mb-4">{member.role}</p>
                    <p className="text-gray-400 text-sm mb-6">{member.description}</p>
                    
                    <div className="flex space-x-3">
                      {member.links.github && (
                        <a href={member.links.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </a>
                      )}
                      
                      {member.links.linkedin && (
                        <a href={member.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </a>
                      )}
                      
                      {member.links.twitter && (
                        <a href={member.links.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                          </svg>
                        </a>
                      )}
                      
                      {member.links.website && (
                        <a href={member.links.website} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQ */}
        <section className="mb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-white text-center">Preguntas Frecuentes</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-2">¿Cómo puedo unirme a 0xD3C0D3?</h3>
                <p className="text-gray-300">
                  Puedes unirte a nuestro servidor de Discord donde compartimos todas las actividades y eventos. 
                  También organizamos sesiones de bienvenida al inicio de cada semestre académico.
                </p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-2">¿Necesito tener conocimientos previos?</h3>
                <p className="text-gray-300">
                  ¡No! Tenemos miembros de todos los niveles, desde principiantes absolutos hasta personas con años de experiencia. 
                  Organizamos actividades para diferentes niveles de habilidad.
                </p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-2">¿Qué tipos de eventos organizáis?</h3>
                <p className="text-gray-300">
                  Organizamos talleres técnicos, charlas, hackathones, competiciones de CTF (Capture The Flag), sesiones de programación 
                  colaborativa y eventos sociales. Consulta nuestra página de eventos para ver el calendario actualizado.
                </p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-2">¿Cómo puedo colaborar o proponer una actividad?</h3>
                <p className="text-gray-300">
                  Nos encanta recibir propuestas! Puedes contactarnos a través del formulario en la página de contacto o 
                  hablar directamente con cualquiera de los coordinadores en Discord.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA para unirse */}
        <section>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-gray-800 to-green-900/30 rounded-xl p-8 text-center border border-green-500/30">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">¿Te gustaría formar parte de nuestra comunidad?</h2>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                Únete a un grupo de estudiantes apasionados por la tecnología, participa en nuestros eventos y aprende nuevas habilidades en un entorno colaborativo.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <a href="/join" className="px-8 py-3 bg-green-600 hover:bg-green-700 rounded-md text-white font-medium transition-all shadow-lg">
                  Únete al Discord
                </a>
                <a href="/contact" className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-md text-white font-medium transition-all border border-green-500/30">
                  Contacta con nosotros
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;