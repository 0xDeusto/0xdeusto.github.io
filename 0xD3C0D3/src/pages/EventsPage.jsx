import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import { upcomingEvents, pastEvents } from '../data/eventsData';

const EventsPage = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrado combinado por tipo y búsqueda
  const filteredUpcomingEvents = upcomingEvents.filter(event => {
    const matchesFilter = filter === 'all' || event.type.toLowerCase() === filter.toLowerCase();
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filteredPastEvents = pastEvents.filter(event => {
    const matchesFilter = filter === 'all' || event.type.toLowerCase() === filter.toLowerCase();
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Todos los tipos únicos de eventos para el filtro
  const eventTypes = ['all', ...new Set([
    ...upcomingEvents.map(event => event.type.toLowerCase()),
    ...pastEvents.map(event => event.type.toLowerCase())
  ])];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      
      <main className="pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cabecera de la página */}
          <div className="text-center mb-16">
            <h1 className="font-['Orbitron',_sans-serif] text-4xl md:text-5xl font-bold mb-4 text-green-500">Eventos</h1>
            <div className="h-1 w-20 bg-green-500 mx-auto mb-8"></div>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg">
              Descubre todos nuestros talleres, competiciones, charlas y más. 
              Únete a nosotros para aprender y compartir conocimientos.
            </p>
          </div>

          {/* Filtros y búsqueda */}
          <div className="mb-12 flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
              {eventTypes.map((type, index) => (
                <button 
                  key={index}
                  onClick={() => setFilter(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                    ${filter === type 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                >
                  {type === 'all' ? 'Todos' : type}
                </button>
              ))}
            </div>
            <div className="w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar eventos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Próximos eventos */}
          {filteredUpcomingEvents.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-8">Próximos Eventos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUpcomingEvents.map(event => (
                  <div 
                    key={event.id} 
                    className="bg-gray-800 rounded-xl overflow-hidden border border-green-500/20 hover:border-green-500/40 transition-all flex flex-col"
                  >
                    {/* Imagen del evento (de muestra - en un entorno real usaríamos imágenes reales) */}
                    <div className="h-48 bg-gray-700 flex items-center justify-center">
                      <span className="text-2xl text-gray-500">[Imagen del Evento]</span>
                    </div>
                    
                    <div className="p-6 flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <span className="px-3 py-1 bg-green-900/50 text-green-400 text-xs rounded-full">
                          {event.type}
                        </span>
                        <div className="bg-gray-700 rounded-md px-2 py-1 text-sm text-white">
                          {event.date}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-6">
                        {event.description}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center text-sm text-gray-400">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          {event.time}
                        </div>
                        <Link 
                          to={event.link} 
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white text-sm font-medium transition-all"
                        >
                          Ver detalles
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Eventos pasados */}
          {filteredPastEvents.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Eventos Pasados</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPastEvents.map(event => (
                  <div 
                    key={event.id} 
                    className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all flex flex-col"
                  >
                    <div className="h-48 bg-gray-700 flex items-center justify-center">
                      <span className="text-2xl text-gray-500">[Imagen del Evento]</span>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <span className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                          {event.type}
                        </span>
                        <div className="text-sm text-gray-400">
                          {event.date}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">
                        {event.description}
                      </p>
                      
                      <Link 
                        to={event.link} 
                        className="text-green-500 hover:text-green-400 flex items-center text-sm font-medium"
                      >
                        Ver resumen
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mensaje cuando no hay eventos coincidentes */}
          {filteredUpcomingEvents.length === 0 && filteredPastEvents.length === 0 && (
            <div className="text-center py-16">
              <div className="text-green-500 text-5xl mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No se encontraron eventos</h3>
              <p className="text-gray-400">Intenta con otros filtros o términos de búsqueda</p>
              <button 
                onClick={() => {setFilter('all'); setSearchQuery('');}} 
                className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white text-sm font-medium transition-all"
              >
                Mostrar todos los eventos
              </button>
            </div>
          )}

          {/* CTA para proponer eventos */}
          <div className="mt-16 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 border border-green-500/30">
            <div className="md:flex items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-2xl font-bold text-white mb-2">¿Tienes una idea para un evento?</h3>
                <p className="text-gray-300">Ayúdanos a crear una comunidad más activa proponiendo actividades</p>
              </div>
              <button className="px-8 py-3 bg-green-600 hover:bg-green-700 rounded-md text-white font-medium transition-all shadow-lg">
                Proponer evento
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventsPage;