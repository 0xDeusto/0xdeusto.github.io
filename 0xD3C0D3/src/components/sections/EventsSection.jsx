import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import eventsData from '../../data/events.json';
import { API_ENDPOINTS, API_DOMAIN } from '../../config/api';
import logoNav from '../../assets/logonav.png';


const EventsSection = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [events, setEvents] = useState(eventsData); // Usar JSON local por defecto
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventDetails, setEventDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const visibleCards = 4; // Número de cards visibles a la vez

  // Obtener eventos de la API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.eventsAll);
        if (response.ok) {
          const data = await response.json();
          // Transformar datos de la API al formato esperado
          const formattedEvents = data.events.map(event => {
            // Construir URL completa para imágenes relativas
            let imageUrl = logoNav;
            if (event.image_url) {
              imageUrl = event.image_url.startsWith('http') 
                ? event.image_url 
                : `${API_DOMAIN}${event.image_url}`;
            } else if (event.discord_image_url) {
              imageUrl = event.discord_image_url;
            }

            return {
              id: event.id,
              title: event.name,
              date: event.start_time ? new Date(event.start_time).toLocaleDateString('es-ES') : event.date || '2025',
              description: event.description || '',
              image: imageUrl
            };
          });
          setEvents(formattedEvents);
          console.log('Eventos cargados');
        } else {
          console.warn('API no disponible, usando eventos locales');
        }
      } catch (error) {
        console.warn('Error conectando con la API, usando eventos locales:', error);
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

  // Función para abrir el modal y cargar detalles del evento
  const openEventModal = async (eventId) => {
    setSelectedEvent(eventId);
    setLoadingDetails(true);
    
    try {
      const response = await fetch(`${API_ENDPOINTS.eventsAll}`);
      if (response.ok) {
        const data = await response.json();
        const eventDetail = data.events.find(e => e.id === eventId);
        
        if (eventDetail) {
          // Procesar imágenes complementarias
          const complementaryImages = eventDetail.custom_metadata?.complementary_images?.map(img => 
            img.startsWith('http') ? img : `${API_DOMAIN}${img}`
          ) || [];

          setEventDetails({
            ...eventDetail,
            complementaryImages,
            extendedDescription: eventDetail.custom_metadata?.extended_description || eventDetail.description,
            tags: eventDetail.custom_metadata?.tags || []
          });
        }
      }
    } catch (error) {
      console.error('Error cargando detalles del evento:', error);
    } finally {
      setLoadingDetails(false);
    }
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setSelectedEvent(null);
    setEventDetails(null);
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
                        e.target.src = logoNav;
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
                    <button 
                      onClick={() => openEventModal(event.id)}
                      className="w-full bg-transparent border border-green-600 text-green-400 font-mono px-4 py-2 hover:bg-green-600 hover:text-black transition-all duration-300"
                    >
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

      {/* Modal usando Portal para renderizar fuera del DOM normal */}
      {selectedEvent && createPortal(
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4"
          style={{ zIndex: 99999 }}
          onClick={closeModal}
        >
          <div 
            className="bg-black border-2 border-green-600 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-green-400 hover:text-green-300 text-3xl font-mono font-bold z-10"
            >
              ×
            </button>

            {loadingDetails ? (
              <div className="p-12 text-center">
                <p className="text-green-400 font-mono text-xl">Cargando detalles...</p>
              </div>
            ) : eventDetails ? (
              <div className="p-8">
                {/* Title */}
                <h3 className="text-3xl md:text-4xl font-mono font-bold text-green-400 mb-4 pr-8">
                  {eventDetails.name}
                </h3>

                {/* Date and Location */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <p className="text-green-400 font-mono">
                    📅 {eventDetails.start_time ? new Date(eventDetails.start_time).toLocaleDateString('es-ES', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }) : 'Fecha por confirmar'}
                  </p>
                  {eventDetails.location && (
                    <p className="text-green-400 font-mono">
                      📍 {eventDetails.location}
                    </p>
                  )}
                </div>

                {/* Tags */}
                {eventDetails.tags && eventDetails.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {eventDetails.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 border border-green-600 text-green-400 font-mono text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Extended Description */}
                <div className="mb-6">
                  <h4 className="text-xl font-mono font-bold text-green-400 mb-3">Descripción</h4>
                  <div className="text-gray-300 font-mono text-sm whitespace-pre-line leading-relaxed">
                    {eventDetails.extendedDescription}
                  </div>
                </div>

                {/* Complementary Images */}
                {eventDetails.complementaryImages && eventDetails.complementaryImages.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-xl font-mono font-bold text-green-400 mb-3">Galería</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {eventDetails.complementaryImages.map((img, index) => (
                        <div key={index} className="border border-green-600 overflow-hidden">
                          <img 
                            src={img} 
                            alt={`${eventDetails.name} - imagen ${index + 1}`}
                            className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.target.src = logoNav;
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Status Badge */}
                {eventDetails.status && (
                  <div className="mt-6 pt-6 border-t border-green-600">
                    <span className={`px-4 py-2 font-mono text-sm ${
                      eventDetails.status === 'completed' 
                        ? 'bg-gray-800 text-gray-400 border border-gray-600' 
                        : 'bg-green-900 bg-opacity-30 text-green-400 border border-green-600'
                    }`}>
                      {eventDetails.status === 'completed' ? 'Evento finalizado' : 'Próximamente'}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-12 text-center">
                <p className="text-red-400 font-mono">Error al cargar los detalles del evento</p>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default EventsSection;
