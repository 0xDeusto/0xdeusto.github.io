import React, { useState, useEffect } from 'react';
import eventsData from '../../data/events.json';
import { API_ENDPOINTS } from '../../config/api';

const EventsSection = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [events, setEvents] = useState(eventsData); // Usar JSON local por defecto
  const [loading, setLoading] = useState(true);
  const visibleCards = 4; // Número de cards visibles a la vez

  // Obtener eventos de la API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.eventsAll);
        if (response.ok) {
          const data = await response.json();
          // Transformar datos de la API al formato esperado
          const formattedEvents = data.events.map(event => ({
            id: event.id,
            title: event.name,
            date: event.start_time ? new Date(event.start_time).toLocaleDateString('es-ES') : event.date || '2025',
            description: event.description || '',
            image: event.image_url || event.discord_image_url || 'https://via.placeholder.com/400x300/1a1a1a/22c55e?text=Event'
          }));
          setEvents(formattedEvents);
          console.log('✅ Eventos cargados desde la API');
        } else {
          console.warn('⚠️ API no disponible, usando eventos locales');
        }
      } catch (error) {
        console.warn('⚠️ Error conectando con la API, usando eventos locales:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Auto-deslizamiento del carrusel
  useEffect(() => {
    if (events.length === 0) return;
    const maxIndex = Math.max(0, events.length - visibleCards);
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(interval);
  }, [events]);

  const nextSlide = () => {
    const maxIndex = Math.max(0, events.length - visibleCards);
    setSlideIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    const maxIndex = Math.max(0, events.length - visibleCards);
    setSlideIndex((prevIndex) => (prevIndex === 0 ? maxIndex : prevIndex - 1));
  };

  return (
    <section id="events" className="relative px-6 py-20">
      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-mono font-bold text-green-400 mb-16">
          Eventos
        </h2>

        {/* Carousel Container */}
        <div className="relative">
          {/* Events Carousel */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{ transform: `translateX(-${slideIndex * (100 / visibleCards)}%)` }}
            >
              {events.map((event) => (
                <div 
                  key={event.id}
                  className="flex-shrink-0 w-[calc(25%-1.125rem)] bg-black bg-opacity-60 border border-green-600 hover:border-green-400 transition-all duration-300 overflow-hidden group"
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

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-black border-2 border-green-600 hover:border-green-400 hover:bg-green-400/10 text-green-400 font-mono font-bold text-2xl w-12 h-12 flex items-center justify-center transition-all duration-300 z-10"
          >
            &lt;
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-black border-2 border-green-600 hover:border-green-400 hover:bg-green-400/10 text-green-400 font-mono font-bold text-2xl w-12 h-12 flex items-center justify-center transition-all duration-300 z-10"
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
