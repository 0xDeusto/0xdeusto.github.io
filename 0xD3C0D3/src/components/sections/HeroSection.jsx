import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const HeroSection = () => {
  // Estado y refs para el texto flotante que sigue al ratón
  const [floatingTextPos, setFloatingTextPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const floatingTarget = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const heroRef = useRef(null);
  const asciiBgRef = useRef(null);
  const [asciiOffset, setAsciiOffset] = useState({ x: 0, y: 0 });
  const targetOffset = useRef({ x: 0, y: 0 });
  const [asciiArt, setAsciiArt] = useState('');
  const [backgroundAsccii, setBackgroundAscii] = useState('');
  const [currentMessage, setCurrentMessage] = useState('');
  
  const messages = [
    'CONNECTING TO DEUSTO MAINFRAME...',
    'LOADING NEURAL NETWORKS...',
    'ACTIVATING HACKER PROTOCOLS...',
    'SYSTEM READY: WELCOME TO 0xDECODE',
    'ELITE CYBERSECURITY COLLECTIVE',
    'WHERE CODE MEETS CREATIVITY'
  ];

  // Cargar ASCII art
  useEffect(() => {
    fetch('/0xD3C0D3-site/deusto-ascii-art.txt')
      .then(response => response.text())
      .then(text => setAsciiArt(text))
      .catch(() => {
        console.error('Error loading ASCII art');
      });
  }, []);

  // Cargar fondo ASCII art
  useEffect(() => {
    fetch('/0xD3C0D3-site/deusto-background-ascii.txt')
      .then(response => response.text())
      .then(text => setBackgroundAscii(text))
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

  // Animación de mensajes
  useEffect(() => {
    if (!asciiArt) return;
    
    let messageIndex = 0;
    const typeMessage = () => {
      const message = messages[messageIndex];
      let charIndex = 0;
      
      const typeInterval = setInterval(() => {
        setCurrentMessage(message.substring(0, charIndex + 1));
        charIndex++;
        
        if (charIndex > message.length) {
          clearInterval(typeInterval);
          setTimeout(() => {
            messageIndex = (messageIndex + 1) % messages.length;
            setTimeout(typeMessage, 500);
          }, 2000);
        }
      }, 50);
    };

    const timer = setTimeout(typeMessage, 1000);
    return () => clearTimeout(timer);
  }, [asciiArt]);

  // Movimiento del fondo ASCII con el mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      // Para el fondo ASCII
      const normX = ((e.clientX / innerWidth) - 0.5) * 2;
      const normY = ((e.clientY / innerHeight) - 0.5) * 2;
      targetOffset.current = {
        x: -normX * 30, 
        y: -normY * 7
      };
      // Para el texto flotante
      floatingTarget.current = {
        x: e.clientX,
        y: e.clientY
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationFrame;
    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      setAsciiOffset(prev => {
        const next = {
          x: lerp(prev.x, targetOffset.current.x, 0.38),
          y: lerp(prev.y, targetOffset.current.y, 0.38)
        };
        return next;
      });
      setFloatingTextPos(prev => {
        const next = {
          x: lerp(prev.x, floatingTarget.current.x, 0.18),
          y: lerp(prev.y, floatingTarget.current.y, 0.18)
        };
        return next;
      });
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
      className="min-h-screen flex flex-col items-center justify-center relative px-6 overflow-hidden"
    >

      
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


        {/* Fondo dibujo asscii */}
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
                  leading-none
                  filter
                  drop-shadow-lg
                  opacity-30
                "
                style={{
                  transform: `translate(${asciiOffset.x}px, ${asciiOffset.y}px)`,
                  transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)'
                }}
              >
                {backgroundAsccii}
              </pre>
              {/* Texto flotante que sigue al ratón */}
              <span
                style={{
                  position: 'fixed',
                  left: floatingTextPos.x,
                  top: floatingTextPos.y,
                  pointerEvents: 'none',
                  transform: 'translate(-50%, -50%)',
                  color: '#22c55e',
                  fontFamily: 'monospace',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  textShadow: '0 0 8px #22c55e, 0 0 2px #000',
                  opacity: 0.7,
                  zIndex: 1
                }}
              >
                [SCROLL_TO_EXPLORE]
              </span>
            </div>
          )}




      {/* Main content */}
      <div className="text-center z-10 relative">
        {/* ASCII Art */}
        <div className="mb-8">
          <pre className="text-green-400 font-mono text-xs sm:text-sm md:text-base lg:text-lg leading-tight filter drop-shadow-lg">
            {asciiArt}
          </pre>
        </div>

        {/* Subtitle con efecto glitch */}
        <div className="text-sm md:text-lg text-green-300 font-mono mb-6 relative">
          <span className="opacity-80">DEUSTO ELECTRONIC CLUB OF DEVELOPERS & ENGINEERS</span>
          <div className="absolute inset-0 text-red-500 opacity-30 animate-pulse transform translate-x-0.5">
            DEUSTO ELECTRONIC CLUB OF DEVELOPERS & ENGINEERS
          </div>
        </div>

        {/* Terminal de mensajes */}
        <div className="bg-black bg-opacity-80 border border-green-600 rounded-lg p-4 max-w-2xl mx-auto mb-8">
          <div className="flex items-center mb-2">
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-green-400 font-mono text-xs ml-4">user@deusto-decode:~$</span>
          </div>
          <div className="text-green-400 font-mono text-sm min-h-6">
            {currentMessage}
            <span className="animate-pulse">|</span>
          </div>
        </div>

        {/* Call to action más sutil */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="group relative px-6 py-3 bg-transparent border border-green-600 text-green-400 font-mono font-bold uppercase tracking-wider hover:bg-green-600 hover:text-black transition-all duration-300 overflow-hidden">
            <span className="relative z-10">EXPLORAR_PROYECTOS</span>
            <div className="absolute inset-0 bg-green-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          </button>
        </div>
      </div>






      {/* Elementos flotantes con información */}
      <div className="absolute top-20 left-10 text-green-600 font-mono text-xs opacity-60 animate-bounce">
        [CYBERSECURITY_MODULE_ACTIVE]
      </div>
      <div className="absolute top-32 right-16 text-green-600 font-mono text-xs opacity-60 animate-bounce" style={{animationDelay: '1s'}}>
        [AI_NEURAL_NETWORKS_ONLINE]
      </div>
      <div className="absolute bottom-32 left-20 text-green-600 font-mono text-xs opacity-60 animate-bounce" style={{animationDelay: '2s'}}>
        [LINUX_TERMINALS_READY]
      </div>
      <div className="absolute bottom-40 right-20 text-green-600 font-mono text-xs opacity-60 animate-bounce" style={{animationDelay: '3s'}}>
        [DEVELOPMENT_STACK_LOADED]
      </div>
      
      {/* Scroll indicator mejorado */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-green-400 animate-bounce">
        <div className="flex flex-col items-center">
          <span className="text-xs font-mono mb-2 opacity-80">[DESCUBRE_LO_QUE_HACEMOS]</span>
          <div className="w-6 h-10 border-2 border-green-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-green-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>



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
