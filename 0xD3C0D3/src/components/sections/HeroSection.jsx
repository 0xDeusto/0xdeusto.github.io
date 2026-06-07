import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Navbar from '../layout/Navbar';
import decodeAsciiSvg from '../../assets/ascii-art.svg';

const HeroSection = () => {
  const heroRef = useRef(null);
  const asciiBgRef = useRef(null);
  const targetOffset = useRef({ x: 0, y: 0 });
  const currentOffset = useRef({ x: 0, y: 0 });
  const [asciiArt, setAsciiArt] = useState('');
  const [backgroundAsccii, setBackgroundAscii] = useState('');
  const [heroHeight, setHeroHeight] = useState('100vh');

  // Cargar ASCII art
  useEffect(() => {
    fetch('/decode-ascii-art.txt')
      .then(response => response.text())
      .then(text => setAsciiArt(text))
      .catch(() => {
        console.error('Error loading ASCII art');
      });
  }, []);

  // Cargar fondo ASCII art
  useEffect(() => {
    fetch('/deusto-background-ascii.txt')
      .then(response => response.text())
      .then(text => setBackgroundAscii(text))
  }, []);

  // Altura exacta del viewport (evita problemas con 100vh en móvil)
  useEffect(() => {
    const updateHeight = () => {
      setHeroHeight(`${window.innerHeight}px`);
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // Efecto de entrada con GSAP
  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(heroRef.current, 
        { opacity: 0, y: -50 }, 
        { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }
      );
    }
  }, []);

  // Movimiento del fondo ASCII con el mouse (actualiza style directamente, sin setState)
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const normX = ((e.clientX / innerWidth) - 0.5) * 2;
      const normY = ((e.clientY / innerHeight) - 0.5) * 2;
      targetOffset.current = {
        x: -normX * 30,
        y: -normY * 7
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrame;
    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      currentOffset.current = {
        x: lerp(currentOffset.current.x, targetOffset.current.x, 0.38),
        y: lerp(currentOffset.current.y, targetOffset.current.y, 0.38)
      };
      if (asciiBgRef.current) {
        asciiBgRef.current.style.transform = `translate(${currentOffset.current.x}px, ${currentOffset.current.y}px)`;
      }
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      id="hero"
      className="flex flex-col relative px-6 overflow-hidden"
      style={{ height: heroHeight }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Scanning lines effect */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 50 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-full h-px bg-green-400"
              style={{ 
                top: `${i * 2}%`,
                animation: `pulse ${2 + Math.random()}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Fondo dibujo ascii */}
      {backgroundAsccii && (
        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
          <pre
            ref={asciiBgRef}
            className="
              text-green-400
              font-mono
              text-[0.20rem] 
              sm:text-[0.3rem]
              md:text-[0.35rem]
              lg:text-[0.4rem]
              xl:text-[0.5rem]
              3xl:text-[0.7rem]
              4xl:text-[0.85rem]
              5xl:text-[1rem]
              6xl:text-[1.2rem]
              7xl:text-[1.5rem]
              8xl:text-[1.8rem]
              leading-none
              filter
              drop-shadow-lg
              opacity-30
            "
            style={{
              transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)'
            }}
          >
            {backgroundAsccii}
          </pre>
        </div>
      )}

      {/* Main content - a la izqueirda */}
      <div className="flex-1 flex flex-col justify-center z-10 relative pt-10 sm:pt-20">
        <div className="max-w-4xl 
        sm:ml-40">
          {/* ASCII Art / Imagen móvil */}
          <div className="mb-8">
            {/* Imagen en móvil (< sm) */}
            <img
              src={decodeAsciiSvg}
              alt="0xDecode ASCII"
              className="block sm:hidden w-full max-w-md mx-auto drop-shadow-lg"
              draggable={false}
            />
            {/* Texto ASCII en desktop (sm en adelante) */}
            <pre className="hidden sm:block text-green-400 font-mono 
            text-sm 
            md:text-base 
            lg:text-xl 
            leading-tight filter drop-shadow-lg">
              {asciiArt}
            </pre>
          </div>

          {/* Subtitle con efecto glitch */}
          <div className="text-sm md:text-lg text-green-300 font-mono mb-8 relative">
            <span className="opacity-80">Deusto Electronic Club Of Developers & Engineers</span>
            <div className="absolute inset-0 text-red-500 opacity-30 animate-pulse transform translate-x-0.5">
              Deusto Electronic Club Of Developers & Engineers
            </div>
          </div>

          {/* Discord Button */}
          <div className="flex">
            <a
              href="https://discord.gg/B6sdc2yDEP"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-transparent border-2 border-green-600 text-green-400 font-mono font-bold uppercase tracking-wider hover:bg-green-600 hover:text-black transition-all duration-300 overflow-hidden flex items-center space-x-3"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              <span className="relative z-10">¡Te esperamos en Discord!</span>
              <div className="absolute inset-0 bg-green-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </a>
          </div>
        </div>
      </div>






      {/* Elementos flotantes con información */}
      {/* <div className="absolute top-24 left-10 text-green-600 font-mono text-xs opacity-60 animate-bounce hidden sm:block">
        [CYBERSECURITY_MODULE_ACTIVE]
      </div>
      <div className="absolute top-36 right-16 text-green-600 font-mono text-xs opacity-60 animate-bounce hidden sm:block" style={{animationDelay: '1s'}}>
        [AI_NEURAL_NETWORKS_ONLINE]
      </div>
      <div className="absolute bottom-32 left-20 text-green-600 font-mono text-xs opacity-60 animate-bounce hidden sm:block" style={{animationDelay: '2s'}}>
        [LINUX_TERMINALS_READY]
      </div>
      <div className="absolute bottom-40 right-20 text-green-600 font-mono text-xs opacity-60 animate-bounce hidden sm:block" style={{animationDelay: '3s'}}>
        [DEVELOPMENT_STACK_LOADED]
      </div> */}



      {/* Efectos de partículas adicionales */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
