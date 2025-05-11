import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event, isUpcoming }) => {
  return (
    <div 
      className={`bg-gray-800 rounded-xl overflow-hidden border ${
        isUpcoming 
          ? 'border-green-500/20 hover:border-green-500/40' 
          : 'border-gray-700 hover:border-gray-600'
      } transition-all flex flex-col`}
    >
      {/* Imagen del evento (de muestra - en un entorno real usaríamos imágenes reales) */}
      <div className="h-48 bg-gray-700 flex items-center justify-center">
        <span className="text-2xl text-gray-500">[Imagen del Evento]</span>
      </div>
      
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <span className={`px-3 py-1 ${
            isUpcoming 
              ? 'bg-green-900/50 text-green-400' 
              : 'bg-gray-700 text-gray-300'
          } text-xs rounded-full`}>
            {event.type}
          </span>
          <div className={isUpcoming ? "bg-gray-700 rounded-md px-2 py-1 text-sm text-white" : "text-sm text-gray-400"}>
            {event.date}
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-2">
          {event.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          {event.description}
        </p>
        
        {isUpcoming ? (
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
        ) : (
          <Link 
            to={event.link} 
            className="text-green-500 hover:text-green-400 flex items-center text-sm font-medium"
          >
            Ver resumen
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
};

export default EventCard;