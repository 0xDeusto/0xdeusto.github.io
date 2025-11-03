import React from 'react';
import { getSectionEffects } from '../../data/sectionGradients';

const SectionEffects = ({ sectionId, sectionIndex, currentSection }) => {
  const effects = getSectionEffects(sectionId);
  
  // Solo mostrar efectos si la sección está activa o cerca (+-1 sección)
  const isNearby = Math.abs(currentSection - sectionIndex) <= 1;
  
  if (!isNearby && effects.type !== 'gradient') {
    return null;
  }

  if (effects.type === 'gradient') {
    // Solo para hero section - gradiente completo
    return (
      <div 
        className="absolute w-full pointer-events-none transition-opacity duration-1000"
        style={{
          top: `calc(${sectionIndex * 100}vh)`,
          height: '100vh',
          background: effects.gradient,
          zIndex: 1,
          opacity: currentSection === sectionIndex ? 1 : 0.6
        }}
      />
    );
  }

  if (effects.type === 'orbs') {
    // Para el resto de secciones - esferas difuminadas
    return (
      <div 
        className="absolute w-full h-full pointer-events-none transition-opacity duration-1000"
        style={{
          top: `calc(${sectionIndex * 100}vh)`,
          height: '100vh',
          zIndex: 1,
          opacity: currentSection === sectionIndex ? 1 : 0.4
        }}
      >
        {effects.orbs?.map((orb, orbIndex) => (
          <div
            key={`${sectionId}-orb-${orbIndex}`}
            className={`absolute rounded-full ${orb.animation} transition-all duration-1000`}
            style={{
              top: orb.position.top,
              left: orb.position.left,
              width: orb.size,
              height: orb.size,
              background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
              filter: `blur(${orb.blur})`,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none'
            }}
          />
        ))}
      </div>
    );
  }

  return null;
};

export default SectionEffects;
