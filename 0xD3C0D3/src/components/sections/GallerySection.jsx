import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const GallerySection = () => {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Placeholder images - replace with actual images from assets/collage
  const images = [
    { src: 'https://via.placeholder.com/600x400/1a1a1a/22c55e?text=Gallery+1', alt: 'Gallery 1' },
    { src: 'https://via.placeholder.com/600x400/1a1a1a/22c55e?text=Gallery+2', alt: 'Gallery 2' },
    { src: 'https://via.placeholder.com/600x400/1a1a1a/22c55e?text=Gallery+3', alt: 'Gallery 3' },
    { src: 'https://via.placeholder.com/600x400/1a1a1a/22c55e?text=Gallery+4', alt: 'Gallery 4' },
    { src: 'https://via.placeholder.com/600x400/1a1a1a/22c55e?text=Gallery+5', alt: 'Gallery 5' },
    { src: 'https://via.placeholder.com/600x400/1a1a1a/22c55e?text=Gallery+6', alt: 'Gallery 6' },
  ];

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  return (
    <section id="gallery" className="relative px-6 py-20">
      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-mono font-bold text-green-400 mb-16">
          Galería
        </h2>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden border border-green-600 hover:border-green-400 transition-all duration-300 cursor-pointer group"
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

        {/* Interactive Gallery Text */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-mono font-bold text-white mb-4">
            Aquí una galería interactiva
          </h3>
          <p className="text-green-400 font-mono">
            Haz clic en cualquier imagen para ver en detalle
          </p>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={images}
        index={currentIndex}
        styles={{
          container: { backgroundColor: 'rgba(0, 0, 0, 0.95)' },
        }}
      />
    </section>
  );
};

export default GallerySection;
