import React from 'react';
import eventsData from '../../data/events.json';

const EventsSection = () => {
  return (
    <section id="events" className="relative px-6 py-20">
      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-mono font-bold text-green-400 mb-16">
          Eventos
        </h2>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {eventsData.map((event) => (
            <div 
              key={event.id}
              className="bg-black bg-opacity-60 border border-green-600 hover:border-green-400 transition-all duration-300 overflow-hidden group"
            >
              {/* Event Image */}
              <div className="relative h-48 overflow-hidden bg-gray-900">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300/1a1a1a/22c55e?text=Event+Image';
                  }}
                />
              </div>

              {/* Event Info */}
              <div className="p-6">
                <h3 className="text-white font-mono font-bold text-lg mb-2">
                  {event.title}
                </h3>
                <p className="text-green-400 font-mono text-sm mb-3">
                  {event.date}
                </p>
                <button className="w-full bg-transparent border border-green-600 text-green-400 font-mono px-4 py-2 hover:bg-green-600 hover:text-black transition-all duration-300">
                  Saber más
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
