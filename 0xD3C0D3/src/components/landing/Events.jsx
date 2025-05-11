import React from 'react';
import { Link } from 'react-router-dom';
import { upcomingEvents, pastEvents } from '../../data/eventsData';

const Events = () => {
  // Mostraremos solo 3 eventos próximos en la landing
  const displayedUpcomingEvents = upcomingEvents.slice(0, 3);
  // Y solo 3 eventos pasados
  const displayedPastEvents = pastEvents.slice(0, 3);

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-500">Eventos</h2>
          <div className="h-1 w-20 bg-green-500 mx-auto mb-8"></div>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            Organizamos eventos regulares para aprender, competir y conectar con otros entusiastas de la tecnología.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Próximos eventos</h3>
            
            {displayedUpcomingEvents.map((event) => (
              <div key={event.id} className="bg-gray-800 rounded-xl overflow-hidden border border-green-500/20 flex hover:border-green-500/40 transition-all">
                {/* Fecha del evento */}
                <div className="bg-green-800/30 flex flex-col items-center justify-center px-6 py-4">
                  <span className="text-xl font-bold text-green-500">{event.date.split(' ')[0]}</span>
                  <span className="text-sm text-gray-300">{event.date.split(' ')[1]}</span>
                </div>
                
                {/* Detalles del evento */}
                <div className="p-4 flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="px-2 py-1 bg-green-900/50 text-green-400 text-xs rounded-full">
                        {event.type}
                      </span>
                      <h4 className="text-xl font-semibold text-white mt-2">
                        {event.title}
                      </h4>
                    </div>
                    <Link to={event.link} className="text-green-500 hover:text-green-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                    </Link>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">
                    {event.description}
                  </p>
                  
                  <div className="flex items-center mt-4 text-sm text-gray-400">
                    <div className="flex items-center mr-4">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      {event.location}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      {event.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="text-center pt-6">
              <Link to="/events" className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-md text-white font-medium transition-all">
                Ver todos los eventos
              </Link>
            </div>
          </div>
          
          <div>
            <div className="bg-gray-800 rounded-xl border border-green-500/20 p-6">
              <h3 className="text-xl font-bold text-white mb-6">Eventos pasados</h3>
              
              <div className="space-y-4">
                {displayedPastEvents.map((event) => (
                  <div key={event.id} className="border-b border-gray-700 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="px-2 py-1 bg-green-900/50 text-green-400 text-xs rounded-full">
                          {event.type}
                        </span>
                        <h4 className="text-white mt-2">
                          {event.title}
                        </h4>
                      </div>
                      <span className="text-xs text-gray-400">
                        {event.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 border-t border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-white mb-4">¿Proponer un evento?</h3>
                <p className="text-gray-400 text-sm mb-4">
                  ¿Tienes una idea para un taller, charla o competición? ¡Compártela con nosotros!
                </p>
                <button className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white font-medium transition-all border border-green-500/20">
                  Proponer evento
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;