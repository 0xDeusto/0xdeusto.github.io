import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const collageImages = [];

const imageModules = import.meta.glob('../../assets/collage/*.(png|jpg|jpeg|svg)', { eager: true });


Object.values(imageModules).forEach(module => {
  collageImages.push(module.default);
});


function PhotoMesh({
  addImageInterval = 4000, // Tiempo entre añadir imágenes (ms)
  removeImageInterval = 2500, // Tiempo entre quitar imágenes (ms)
  maxVisibleImages = 6, // Máximo número de imágenes visibles
  minVisibleImages = 5, // Mínimo número de imágenes visibles
  width = "400px",
  height = "600px"
}) {
  const [images, setImages] = useState([]);
  const [visibleImages, setVisibleImages] = useState([]);
  const instanceCounter = useRef(0);


const getRandomPosition = (imageCount) => {
  const aspectRatio = Math.floor(Math.random() * 3); // 0: cuadrado, 1: vertical, 2: horizontal
  const baseSize = (imageCount <= 3 ? 210 : 160) + Math.floor(Math.random() * 100);

  let w, h;
  if (aspectRatio === 0) { w = baseSize; h = baseSize; }
  else if (aspectRatio === 1) { w = baseSize * 0.75; h = baseSize * 1.25; }
  else { w = baseSize * 1.25; h = baseSize * 0.75; }

  const containerWidth = 400;
  const containerHeight = 600;
  const widthPercent = (w / containerWidth) * 100;
  const heightPercent = (h / containerHeight) * 100;

  const gridSize = Math.ceil(Math.sqrt(Math.max(1, imageCount)));
  const cellWidth = 100 / gridSize;
  const gridX = Math.floor(Math.random() * gridSize);
  const gridY = Math.floor(Math.random() * gridSize);
  const baseX = gridX * cellWidth;
  const baseY = gridY * cellWidth;

  const maxOffsetX = Math.min(cellWidth * 0.75, 100 - baseX - widthPercent);
  const maxOffsetY = Math.min(cellWidth * 0.75, 100 - baseY - heightPercent);

  const offsetX = Math.random() * Math.max(0, maxOffsetX);
  const offsetY = Math.random() * Math.max(0, maxOffsetY);

  const x = Math.min(baseX + offsetX, 100 - widthPercent);
  const y = Math.min(baseY + offsetY, 100 - heightPercent);

  return {
    x: Math.max(0, x),
    y: Math.max(0, y),
    rotate: Math.random() * 30 - 15,
    scale: 0.7 + Math.random() * 0.6,
    zIndex: Math.floor(Math.random() * 10),
    width: `${w}px`,
    height: `${h}px`,
    widthPercent,
    heightPercent
  };
};



  useEffect(() => {
  const expectedCount = Math.floor((minVisibleImages + maxVisibleImages) / 2);
  const loadedImages = collageImages.map((img, i) => ({
    id: i + 1,
    src: img,
    ...getRandomPosition(expectedCount)
  }));
  
  setImages(loadedImages);
}, [minVisibleImages, maxVisibleImages]);

useEffect(() => {
  if (images.length === 0) return;

  const initialCount = Math.min(minVisibleImages, images.length);
  setVisibleImages(
    Array.from({ length: initialCount }, (_, i) => ({
      ...images[i % images.length],
      ...getRandomPosition(initialCount), 
      instanceId: ++instanceCounter.current 
    }))
  );

  // Configurar un único intervalo que refresque todas las imágenes
  const refreshInterval = setInterval(() => {

    const count = minVisibleImages + Math.floor(Math.random() * (maxVisibleImages - minVisibleImages + 1));

    const shuffledImages = [...images]
      .sort(() => Math.random() - 0.5)
      .slice(0, count)
      .map((img) => ({
        ...img,
        ...getRandomPosition(count), 
        instanceId: Date.now() + Math.random()
      }));
    
    setVisibleImages(shuffledImages);
  }, addImageInterval);

  return () => {
    clearInterval(refreshInterval);
  };
}, [images, addImageInterval, removeImageInterval, maxVisibleImages, minVisibleImages]);
  return (
    <div 
      className="relative rounded-lg overflow-hidden shadow-lg" 
      style={{ width, height }}
    >
      <AnimatePresence>
        {visibleImages.map((image) => (
          // Dentro del return, en el mapeo de visibleImages
      <motion.div
        key={image.instanceId}
        className="absolute rounded-md overflow-hidden shadow-md"
        style={{
          left: `${image.x}%`,
          top: `${image.y}%`,
          zIndex: image.zIndex,
          width: image.width,  // Aplicar ancho personalizado
          height: image.height // Aplicar alto personalizado
        }}
        initial={{ opacity: 0, scale: 0, rotate: image.rotate * 2 }}
        animate={{
          opacity: 1,
          scale: image.scale,
          rotate: image.rotate,
          transition: { type: "spring", stiffness: 100 }
        }}
        exit={{
          opacity: 0,
          scale: 0,
          rotate: image.rotate * -1,
          transition: { duration: 0.5 }
        }}
      >
        <img
          src={image.src}
          alt={`Collage image ${image.id}`}
          className="w-full h-full object-cover" 
          onError={(e) => {
            // Fallback si la imagen no carga
            e.target.src = `/0xD3C0D3-site/collage/fallback.jpeg`;
          }}
        />
      </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default PhotoMesh;