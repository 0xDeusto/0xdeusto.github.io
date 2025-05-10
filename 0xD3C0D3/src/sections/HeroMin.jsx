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


        <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a 
            href="/0xD3C0D3-site/join" 
            className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-md text-white font-medium transition-all transform hover:scale-105 shadow-lg shadow-green-600/30 flex items-center justify-center"
        >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z"></path>
            </svg>
            Únete a Discord
        </a>
        
        <a 
            href="https://twitter.com/0xd3c0d3" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-md text-white font-medium border border-green-500/30 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
        >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
            </svg>
            Síguenos
        </a>
        
        <a 
            href="https://ctftime.org/team/373961" 
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-md text-white font-medium border border-green-500/30 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
        >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5 1.5c-1.78 0-3.48.71-4.74 1.97L12.5 8.22l4.74-4.74C16 2.22 14.29 1.5 12.5 1.5zM8.35 4.58L3.5 9.44c-1.94 1.94-1.94 5.18 0 7.13 1.94 1.94 5.18 1.94 7.13 0L15.97 11 8.35 4.58zM16.5 12.03l-5.34 5.34c1.95 1.95 5.2 1.95 7.14.01 1.95-1.95 1.95-5.19 0-7.14l-1.8-1.79V12.03z"></path>
            </svg>
            CTFTime
        </a>
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