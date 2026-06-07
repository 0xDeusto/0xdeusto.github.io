import React, { useState, useMemo, useEffect, useRef } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const GallerySection = () => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);

  const scrollContainerRef = useRef(null);

  // Cargar automáticamente todas las imágenes de la carpeta galería
  const images = useMemo(() => {
    const imageModules = import.meta.glob('../../assets/galería/*.{jpg,jpeg,png,gif,webp}', { eager: true });
    return Object.entries(imageModules).map(([path, module]) => ({
      src: module.default,
      alt: `0xDecode - ${path.split('/').pop().split('.')[0]}`
    }));
  }, []);

  // Auto-slide: avanza cada 3s hasta que el usuario interactúe
  useEffect(() => {
    if (images.length === 0 || userInteracted) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      const firstCard = container.querySelector('[data-gallery-card]');
      if (!firstCard) return;
      const cardWidth = firstCard.offsetWidth + 16; // ancho + gap-4 (16px)
      const maxScroll = container.scrollWidth - container.offsetWidth;

      if (container.scrollLeft >= maxScroll - 5) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [images, userInteracted]);

  const handleUserInteraction = () => {
    setUserInteracted(true);
  };

  const getCardWidth = () => {
    const container = scrollContainerRef.current;
    if (!container) return 300;
    const firstCard = container.querySelector('[data-gallery-card]');
    if (!firstCard) return 300;
    return firstCard.offsetWidth + 16;
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

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  return (
    <section id="gallery" className="relative px-6 py-20">
      <div className="max-w-7xl mx-auto relative">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-mono font-bold text-green-400 mb-16">
          Galería
        </h2>

        {/* Carousel Container */}
        <div className="relative mb-12">
          {/* Scrollable Track */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 select-none cursor-grab active:cursor-grabbing"
            onScroll={handleUserInteraction}
            onTouchStart={handleUserInteraction}
            onMouseDown={handleUserInteraction}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                data-gallery-card
                className="snap-start relative flex-shrink-0 w-[85%] sm:w-[calc(20%-0.8rem)] aspect-square overflow-hidden border border-green-600 hover:border-green-400 transition-all duration-300 cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 pointer-events-none"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-green-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
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
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-black border-2 border-green-600 hover:border-green-400 hover:bg-green-400/10 text-green-400 font-mono font-bold text-2xl w-12 h-12 hidden sm:flex items-center justify-center transition-all duration-300 cursor-pointer z-10"
          >
            &lt;
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-black border-2 border-green-600 hover:border-green-400 hover:bg-green-400/10 text-green-400 font-mono font-bold text-2xl w-12 h-12 hidden sm:flex items-center justify-center transition-all duration-300 cursor-pointer z-10"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={images}
        index={currentIndex}
        styles={{
          container: { backgroundColor: 'rgba(0, 0, 0, 0.95)', zIndex: 9000 },
        }}
      />
    </section>
  );
};

export default GallerySection;
