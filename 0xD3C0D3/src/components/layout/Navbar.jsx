import React, { useState, useRef, useEffect } from 'react';
import logoNav from '../../assets/logonav.png';

const Navbar = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const navItemRefs = useRef([]);

  const scrollToSection = (sectionId, index) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveIndex(index);
    }
  };

  const navItems = [
    { label: 'Home', section: 'hero' },
    { label: 'Sobre Nosotros', section: 'about' },
    { label: 'Eventos', section: 'events' },
    { label: 'Cursos de Verano', href: '/cursos-de-verano/', external: true },
    { label: 'Contactanos', section: 'contact' }
  ];

  const ExternalIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-3 h-3 inline-block ml-1"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );

  useEffect(() => {
    updateIndicator(activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.section));
      const scrollPosition = window.scrollY + 100; // offset para detectar mejor

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveIndex(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Ejecutar al montar

    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const updateIndicator = (index) => {
    const element = navItemRefs.current[index];
    if (element) {
      setIndicatorStyle({
        left: element.offsetLeft,
        width: element.offsetWidth
      });
    }
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    updateIndicator(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    updateIndicator(activeIndex);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={logoNav} alt="0xDecode Logo" className="h-30 w-auto" />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 relative">
            {navItems.map((item, index) => {
                if(item.external){
                  return (
                    <button
                      key={index}
                      ref={(el) => (navItemRefs.current[index] = el)}
                      onClick={() => window.open(item.href, '_blank', 'noopener,noreferrer')}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                      className="text-green-400 hover:text-green-300 font-mono text-sm transition-colors duration-200 px-4 py-2 relative z-10"
                    >
                      {item.label}
                      <ExternalIcon />
                    </button>
                  );
                }

                return (<button
                  key={index}
                  ref={(el) => (navItemRefs.current[index] = el)}
                  onClick={() => scrollToSection(item.section, index)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  className="text-green-400 hover:text-green-300 font-mono text-sm transition-colors duration-200 px-4 py-2 relative z-10"
                >
                  {item.label}
                </button>
                );
              }
            )}
            
            {/* Sliding indicator */}
            <div
              className="absolute border-2 border-green-600 transition-all duration-300 ease-out pointer-events-none"
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
                height: '100%',
                top: 0,
              }}
            />
          </div>

          {/* Discord Button */}
          <a
            href="https://discord.gg/B6sdc2yDEP"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center space-x-2 bg-green-600 hover:bg-green-500 text-black font-mono font-bold px-4 py-2 rounded transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            <span>Únete en Discord</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
