import React, { useState, useMemo, useEffect } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const GallerySection = () => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);

  // Cargar automáticamente todas las imágenes de la carpeta galería
  const images = useMemo(() => {
    const imageModules = import.meta.glob('../../assets/galería/*.{jpg,jpeg,png,gif}', { eager: true });
    return Object.entries(imageModules).map(([path, module]) => ({
      src: module.default,
      alt: `0xDeusto - ${path.split('/').pop().split('.')[0]}`
    }));
  }, []);

  // Auto-deslizamiento del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % Math.max(1, images.length - 4));
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval);
  }, [images.length]);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  const nextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % Math.max(1, images.length - 4));
  };

  const prevSlide = () => {
    setSlideIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(0, images.length - 5) : prevIndex - 1
    );
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
          {/* Carousel */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-4"
              style={{ transform: `translateX(-${slideIndex * (100 / 5)}%)` }}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 w-[calc(20%-0.8rem)] aspect-square overflow-hidden border border-green-600 hover:border-green-400 transition-all duration-300 cursor-pointer group"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-green-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-black border-2 border-green-600 hover:border-green-400 hover:bg-green-400/10 text-green-400 font-mono font-bold text-2xl w-12 h-12 flex items-center justify-center transition-all duration-300"
          >
            &lt;
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-black border-2 border-green-600 hover:border-green-400 hover:bg-green-400/10 text-green-400 font-mono font-bold text-2xl w-12 h-12 flex items-center justify-center transition-all duration-300"
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
