import React, { useEffect, useRef } from 'react';

const Hero = () => {
  const canvasRef = useRef(null);

  // Efecto Matrix para el fondo
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }
    
    const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$+=<>[]{}:;',.?/|\\~`!@#%^&*()_-";
    
    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = "#0f0";
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        drops[i]++;
      }
    }
    
    const interval = setInterval(draw, 35);
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full opacity-80" />
      
      {/* Panel con fondo semi-transparente para mejorar legibilidad */}
      <div className="relative z-10 text-center px-4 py-12 max-w-5xl mx-auto  shadow-xl ">
        {/* Título con fuente tecno */}
        <h1 className="font-['Orbitron',_sans-serif] text-6xl md:text-8xl font-bold mb-6 text-green-400 glow-text tracking-wider">
          0xD3C0D3
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white font-['Space_Mono',_monospace]">
          Deusto Electronic Club Of Developers & Engineers
        </p>
        <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-white">
          Una comunidad universitaria apasionada por la informática, 
          donde exploramos desde ciberseguridad y CTFs hasta IA y desarrollo de software.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-green-600 hover:bg-green-700 rounded-md text-white font-medium transition-all transform hover:scale-105 shadow-lg shadow-green-600/30">
            Únete a nosotros
          </button>
          <button className="px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-md text-white font-medium border border-green-500/30 transition-all transform hover:scale-105 shadow-lg">
            Próximos eventos
          </button>
        </div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>

      {/* Estilos CSS adicionales para el efecto glow en el título */}
      <style jsx>{`
        .glow-text {
          text-shadow: 0 0 10px rgba(74, 222, 128, 0.7), 
                       0 0 20px rgba(74, 222, 128, 0.5),
                       0 0 30px rgba(74, 222, 128, 0.3);
        }
      `}</style>
    </div>
  );
};

export default Hero;