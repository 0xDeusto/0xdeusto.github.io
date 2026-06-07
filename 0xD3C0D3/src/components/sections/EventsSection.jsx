import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import eventsData from '../../data/events.json';
import { API_ENDPOINTS, API_DOMAIN } from '../../config/api';
import logoNav from '../../assets/logonav.png';

const EventsSection = () => {
  const [events, setEvents] = useState(eventsData);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventDetails, setEventDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [visibleCards, setVisibleCards] = useState(4);
  const [userInteracted, setUserInteracted] = useState(false);

  const scrollContainerRef = useRef(null);

  // Detectar número de cards visibles según pantalla
  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else {
        setVisibleCards(4);
      }
    };
    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  // Obtener eventos de la API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.events);
        if (response.ok) {
          const data = await response.json();
          const formattedEvents = data.events.map(event => {
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
              image: imageUrl,
              timestamp: event.start_time ? new Date(event.start_time).getTime() : 0
            };
          });
          const sortedEvents = formattedEvents.sort((a, b) => b.timestamp - a.timestamp);
          setEvents(sortedEvents);
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

  // Auto-slide: avanza cada 4s hasta que el usuario interactúe
  useEffect(() => {
    if (events.length === 0 || userInteracted) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      const firstCard = container.querySelector('[data-event-card]');
      if (!firstCard) return;
      const cardWidth = firstCard.offsetWidth + 24;
      const maxScroll = container.scrollWidth - container.offsetWidth;

      if (container.scrollLeft >= maxScroll - 5) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [events, userInteracted, visibleCards]);

  const handleUserInteraction = () => {
    setUserInteracted(true);
  };

  const getCardWidth = () => {
    const container = scrollContainerRef.current;
    if (!container) return 300;
    const firstCard = container.querySelector('[data-event-card]');
    if (!firstCard) return 300;
    return firstCard.offsetWidth + 24;
  };

  const nextSlide = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
    setUserInteracted(true);
  };

  const prevSlide = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
    setUserInteracted(true);
  };

  // Abrir modal
  const openEventModal = async (eventId) => {
    setSelectedEvent(eventId);
    setLoadingDetails(true);
    try {
      const response = await fetch(`${API_ENDPOINTS.events}`);
      if (response.ok) {
        const data = await response.json();
        const eventDetail = data.events.find(e => e.id === eventId);
        if (eventDetail) {
          let mainImageUrl = logoNav;
          if (eventDetail.image_url) {
            mainImageUrl = eventDetail.image_url.startsWith('http')
              ? eventDetail.image_url
              : `${API_DOMAIN}${eventDetail.image_url}`;
          } else if (eventDetail.discord_image_url) {
            mainImageUrl = eventDetail.discord_image_url;
          }
          const complementaryImages = eventDetail.custom_metadata?.complementary_images?.map(img =>
            img.startsWith('http') ? img : `${API_DOMAIN}${img}`
          ) || [];
          const allImages = complementaryImages.length > 0
            ? [...complementaryImages, mainImageUrl]
            : [mainImageUrl];
          setEventDetails({
            ...eventDetail,
            complementaryImages: allImages,
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
          {/* Scrollable Track */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 select-none cursor-grab active:cursor-grabbing"
            onScroll={handleUserInteraction}
            onTouchStart={handleUserInteraction}
            onMouseDown={handleUserInteraction}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {events.map((event) => (
              <div
                key={event.id}
                data-event-card
                className="snap-start flex-shrink-0 w-[85%] sm:w-[calc(25%-1.125rem)] bg-black bg-opacity-60 border border-green-600 hover:border-green-400 transition-all duration-300 overflow-hidden group"
              >
                {/* Event Image */}
                <div className="relative h-48 overflow-hidden bg-gray-900">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 pointer-events-none"
                    draggable={false}
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
                    className="w-full bg-transparent border border-green-600 text-green-400 font-mono px-4 py-2 hover:bg-green-600 hover:text-black transition-all duration-300 cursor-pointer"
                  >
                    Saber más
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Hide scrollbar */}
          <style>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {/* Navigation Buttons (desktop only) */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-black border-2 border-green-600 hover:border-green-400 hover:bg-green-400/10 text-green-400 font-mono font-bold text-2xl w-12 h-12 hidden sm:flex items-center justify-center transition-all duration-300 z-10"
          >
            &lt;
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-black border-2 border-green-600 hover:border-green-400 hover:bg-green-400/10 text-green-400 font-mono font-bold text-2xl w-12 h-12 hidden sm:flex items-center justify-center transition-all duration-300 z-10"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Modal usando Portal */}
      {selectedEvent && createPortal(
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4"
          style={{ zIndex: 99999 }}
          onClick={closeModal}
        >
          <div
            className="bg-black border-2 border-green-600 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
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
                    <div className="space-y-4">
                      {/* Imágenes complementarias */}
                      {eventDetails.complementaryImages.length > 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {eventDetails.complementaryImages.slice(0, -1).map((img, index) => (
                            <div
                              key={index}
                              className="border border-green-600 overflow-hidden"
                            >
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
                      )}

                      {/* Última imagen (cover) */}
                      {eventDetails.complementaryImages.length > 0 && (
                        <div className="flex justify-center">
                          <div className="border border-green-600 overflow-hidden inline-block bg-black">
                            <img
                              src={eventDetails.complementaryImages[eventDetails.complementaryImages.length - 1]}
                              alt={`${eventDetails.name} - cover`}
                              className="max-h-96 object-contain hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                e.target.src = logoNav;
                              }}
                            />
                          </div>
                        </div>
                      )}
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
