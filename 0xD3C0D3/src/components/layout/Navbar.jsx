import React, { useState, useRef, useEffect } from 'react';
import logoNav from '../../assets/logonav.png';
import { TerminalIcon } from '../icons';
import { useJoin } from '../join/JoinContext';

const Navbar = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItemRefs = useRef([]);
  const { openJoin } = useJoin();

  const scrollToSection = (sectionId, index) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveIndex(index);
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Home', section: 'hero' },
    { label: 'Sobre Nosotros', section: 'about' },
    { label: 'Eventos', section: 'events' },
    { label: 'Summer School', href: '/cursos-de-verano/', external: true },
    { label: 'Contáctanos', mailto: '0xdecode@deusto.es' }
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
                      className="text-green-400 hover:text-green-300 font-mono text-sm transition-colors duration-200 px-4 py-2 relative z-10 cursor-pointer"
                    >
                      {item.label}
                      <ExternalIcon />
                    </button>
                  );
                }

                if(item.mailto){
                  return (
                    <button
                      key={index}
                      ref={(el) => (navItemRefs.current[index] = el)}
                      onClick={() => window.location.href = `mailto:${item.mailto}`}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                      className="text-green-400 hover:text-green-300 font-mono text-sm transition-colors duration-200 px-4 py-2 relative z-10 cursor-pointer"
                    >
                      {item.label}
                    </button>
                  );
                }

                return (<button
                  key={index}
                  ref={(el) => (navItemRefs.current[index] = el)}
                  onClick={() => scrollToSection(item.section, index)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  className="text-green-400 hover:text-green-300 font-mono text-sm transition-colors duration-200 px-4 py-2 relative z-10 cursor-pointer"
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

          {/* Action Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Botón único: abre la ventana "Únete" (Discord + lista de correo) */}
            <button
              type="button"
              onClick={openJoin}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-500 text-black font-mono font-bold px-5 py-2 rounded transition-all duration-300 cursor-pointer"
            >
              <TerminalIcon />
              <span>Únete</span>
            </button>
          </div>

          {/* Hamburger Menu Button - Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex items-center justify-center p-2 text-green-400 hover:text-green-300 transition-colors duration-200"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-0 z-40 bg-black/95 backdrop-blur-md flex flex-col justify-center items-center">
            <div className="flex flex-col items-center space-y-6 w-full max-w-xs px-6">
              {navItems.map((item, index) => {
                if (item.external) {
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        window.open(item.href, '_blank', 'noopener,noreferrer');
                        setIsMenuOpen(false);
                      }}
                      className="text-green-400 hover:text-green-300 font-mono text-lg transition-colors duration-200 px-4 py-2 text-center cursor-pointer hover:bg-green-900/20 rounded w-full"
                    >
                      {item.label}
                      <ExternalIcon />
                    </button>
                  );
                }

                if (item.mailto) {
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        window.location.href = `mailto:${item.mailto}`;
                        setIsMenuOpen(false);
                      }}
                      className="text-green-400 hover:text-green-300 font-mono text-lg transition-colors duration-200 px-4 py-2 text-center cursor-pointer hover:bg-green-900/20 rounded w-full"
                    >
                      {item.label}
                    </button>
                  );
                }

                return (
                  <button
                    key={index}
                    onClick={() => scrollToSection(item.section, index)}
                    className={`text-green-400 hover:text-green-300 font-mono text-lg transition-colors duration-200 px-4 py-2 text-center cursor-pointer hover:bg-green-900/20 rounded w-full ${
                      activeIndex === index ? 'bg-green-900/20 text-green-300' : ''
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  openJoin();
                }}
                className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-500 text-black font-mono font-bold px-6 py-3 rounded transition-all duration-300 mt-4 w-full cursor-pointer"
              >
                <TerminalIcon />
                <span>Únete</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
