import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, useScroll, useInView } from 'framer-motion';
import PhotoMesh from '../landing/PhotoMesh'

function DiscoverQHCM() {
  const sectionRef = useRef(null);
  const collageContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSectionInView, setIsSectionInView] = useState(false);
  
  // Referencias para cada texto
  const textRefs = Array(6).fill().map(() => useRef(null));

  // Contenido de los textos
  const discoverTexts = [
    {
      title: "Únete a nuestra comunidad",
      description: "Un grupo de estudiantes apasionados por la tecnología y el conocimiento compartido.",
      detail: "Participa en eventos, aprende sobre ciberseguridad, inteligencia artificial y mucho más."
    },
    {
      title: "Impartimos charlas y talleres",
      description: "Desde introducción a lenguajes de programación hasta temas avanzados como forensics y pwn.",
      detail: "Aprende sobre GNU/Linux, Docker, Android, Cloud y otras tecnologías punteras."
    },
    {
      title: "Participamos en CTFs y hackathones",
      description: "Pon a prueba tus habilidades en ciberseguridad y desarrollo en competiciones emocionantes.",
      detail: "Colabora con nosotros y mejora tus capacidades técnicas y de trabajo en equipo."
    },
    {
      title: "Ayudamos a desarrollar software",
      description: "Independientemente de tu nivel, te apoyamos en tus proyectos y dudas técnicas.",
      detail: "Trabajamos con Python, C, Rust, Java, JavaScript y muchos otros lenguajes."
    },
    {
      title: "Mantente al día con las últimas noticias",
      description: "Descubre lo último en tecnología, investigación académica y tendencias del sector.",
      detail: "Comparte y discute con una comunidad de amigos con intereses similares."
    },
    {
      title: "Fomentamos el código abierto",
      description: "Creemos en la colaboración y el aprendizaje a través de proyectos de código abierto.",
      detail: "Contribuye, aprende y crece con nosotros en un entorno inclusivo y motivador."
    }
  ];

  // Detectar cuando la sección está en vista
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionInView(entry.isIntersecting);
      },
      { threshold: 0.1 } // Detectar cuando al menos el 10% de la sección es visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Efecto para posicionar el collage cuando la sección está en vista
  useEffect(() => {
    const updateCollagePosition = () => {
      if (!isSectionInView || !sectionRef.current || !collageContainerRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const collageContainer = collageContainerRef.current;
      
      // Si la sección está en vista, calcular la posición del collage
      if (sectionRect.top <= 0 && sectionRect.bottom >= window.innerHeight) {
        // Sección completamente en vista o parcialmente visible pero cubriendo toda la pantalla
        collageContainer.style.position = 'fixed';
        collageContainer.style.top = '0';
        collageContainer.style.right = '0';
        collageContainer.style.opacity = '1';
      } else if (sectionRect.top > 0 && sectionRect.top < window.innerHeight) {
        // Sección entrando desde abajo
        collageContainer.style.position = 'absolute';
        collageContainer.style.top = '0';
        collageContainer.style.right = '0';
        collageContainer.style.opacity = '1';
      } else if (sectionRect.bottom < window.innerHeight && sectionRect.bottom > 0) {
        // Sección saliendo por arriba
        collageContainer.style.position = 'absolute';
        collageContainer.style.top = `${sectionRect.height - window.innerHeight}px`;
        collageContainer.style.right = '0';
        collageContainer.style.opacity = '1';
      } else {
        // Sección fuera de vista
        collageContainer.style.opacity = '0';
      }
    };

    // Actualizar posición inicialmente y en scroll
    updateCollagePosition();
    window.addEventListener('scroll', updateCollagePosition);
    window.addEventListener('resize', updateCollagePosition);

    return () => {
      window.removeEventListener('scroll', updateCollagePosition);
      window.removeEventListener('resize', updateCollagePosition);
    };
  }, [isSectionInView]);

  // Usar el scroll para controlar qué texto está activo
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !isSectionInView) return;
      
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const sectionTop = sectionRect.top;
      const sectionProgress = -sectionTop / (sectionRect.height - window.innerHeight);
      
      // Calcular el índice del texto activo basado en el progreso
      const clampedProgress = Math.max(0, Math.min(0.999, sectionProgress));
      const newIndex = Math.floor(clampedProgress * discoverTexts.length);
      
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < discoverTexts.length) {
        setCurrentIndex(newIndex);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentIndex, discoverTexts.length, isSectionInView]);

  // Animación para las orbes flotantes
  const orbVariants = {
    float: {
      y: [0, -20, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse",
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative bg-black text-white overflow-hidden"
      style={{ 
        minHeight: `${discoverTexts.length }vh`,
      }}
    >
      {/* Fondo grid sutil */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,128,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,128,0.8) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        ></div>
      </div>

      {/* Orbes decorativos */}
      <motion.div
        className="absolute rounded-full blur-[100px] bg-green-500/20 z-0"
        style={{
          width: "40vw",
          height: "40vw",
          top: "10%",
          left: "-20%",
        }}
        variants={orbVariants}
        animate="float"
      />

      <motion.div
        className="absolute rounded-full blur-[80px] bg-blue-500/15 z-0"
        style={{
          width: "30vw",
          height: "30vw",
          top: "45%",
          right: "-10%",
        }}
        variants={orbVariants}
        animate="float"
        transition={{ delay: 1, duration: 10 }}
      />

      <motion.div
        className="absolute rounded-full blur-[70px] bg-purple-500/10 z-0"
        style={{
          width: "25vw",
          height: "25vw",
          top: "70%",
          left: "5%",
        }}
        variants={orbVariants}
        animate="float"
        transition={{ delay: 2, duration: 9 }}
      />

      {/* Collage container con posición dinámica */}
      <div 
        ref={collageContainerRef}
        className="hidden lg:flex w-1/2 h-screen items-center justify-center pr-[5%] z-10 transition-opacity duration-300"
        style={{
          position: 'absolute', // Posición inicial
          top: 0,
          right: 0,
        }}
      >
        <div className="p-4 relative">
          {/* Efecto de marco/borde alrededor del collage */}
          <div className="absolute inset-0 border border-green-500/30 rounded-lg transform -rotate-1 scale-105"></div>
          <div className="absolute inset-0 border border-blue-500/20 rounded-lg transform rotate-2 scale-110"></div>
          
          <PhotoMesh 
            addImageInterval={3000}
            maxVisibleImages={8}
            minVisibleImages={4}
            width="680px"
            height="920px"
          />
        </div>
      </div>

      {/* Versión móvil del collage - Sticky en la parte superior */}
      <div className="lg:hidden sticky top-0 w-full z-20 bg-black bg-opacity-80 pt-4 pb-6">
        <div className="flex justify-center">
          <PhotoMesh 
            addImageInterval={3000}
            maxVisibleImages={5}
            minVisibleImages={3}
            width="300px"
            height="250px"
          />
        </div>
      </div>

      {/* Textos con efecto de scroll */}
      {discoverTexts.map((text, index) => (
        <div 
          key={index}
          ref={textRefs[index]}
          className="h-screen w-full flex items-center"
          style={{
            position: 'sticky',
            top: 0,
            left: 0,
            zIndex: 5,
            opacity: currentIndex === index ? 1 : 0,
            transition: 'opacity 0.5s ease',
            pointerEvents: currentIndex === index ? 'auto' : 'none',
          }}
        >
          <div className="container mx-auto px-4">
            <div className="lg:w-1/2 w-full pl-4 lg:pl-[10%]">
              <TextBlock 
                index={index}
                active={currentIndex === index}
                title={text.title}
                description={text.description}
                detail={text.detail}
              />
            </div>
          </div>
        </div>
      ))}


    </section>
  );
}

// Componente de bloque de texto con animación de iluminación
const TextBlock = ({ index, active, title, description, detail }) => {
  const controls = useAnimation();
  
  // Iniciar la animación de iluminación cuando el texto está activo
  useEffect(() => {
    if (active) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [active, controls]);
  
  const titleWords = title.split(' ');
  const descriptionWords = description.split(' ');
  const detailWords = detail.split(' ');
  
  return (
    <div className="py-10 lg:py-0 w-full">
      <motion.div
        initial="hidden"
        animate={controls}
        className="max-w-lg mx-auto lg:mx-0 mt-[50px] lg:mt-0 px-6 lg:px-0"
      >
        <motion.div className="flex flex-wrap mb-3 text-3xl font-bold">
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              className="mr-2 mb-1 inline-block"
              variants={{
                hidden: { color: "#FFFFFF" },
                visible: { 
                  color: "#4ADE80",
                  transition: { delay: i * 0.15 }
                }
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
        
        <motion.div className="flex flex-wrap mb-4 text-xl">
          {descriptionWords.map((word, i) => (
            <motion.span
              key={i}
              className="mr-2 mb-1 inline-block"
              variants={{
                hidden: { color: "#FFFFFF" },
                visible: { 
                  color: "#4ADE80",
                  transition: { delay: titleWords.length * 0.15 + i * 0.1 }
                }
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
        
        <motion.div className="flex flex-wrap text-sm text-gray-300">
          {detailWords.map((word, i) => (
            <motion.span
              key={i}
              className="mr-2 mb-1 inline-block"
              variants={{
                hidden: { color: "#9CA3AF" },
                visible: { 
                  color: "#4ADE80",
                  transition: { 
                    delay: titleWords.length * 0.15 + descriptionWords.length * 0.1 + i * 0.05 
                  }
                }
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DiscoverQHCM;