// Configuración de efectos visuales para cada sección
export const sectionVisualEffects = {
  hero: {
    type: 'gradient', // La única sección que mantiene gradiente completo
    gradient: `
      linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.95) 0%,
        rgba(0, 20, 0, 0.7) 30%,
        rgba(0, 50, 0, 0.4) 60%,
        rgba(0, 100, 0, 0.2) 80%,
        transparent 100%
      )
    `,
    colors: {
      primary: '#00ff00',
      secondary: '#008000',
      accent: '#90EE90'
    }
  },

  cybersecurity: {
    type: 'orbs',
    orbs: [
      {
        color: 'rgba(220, 38, 38, 0.35)',
        size: '40vw',
        position: { top: '10%', right: '80%' },
        animation: 'float-slow',
        blur: '60px'
      },
      {
        color: 'rgba(220, 38, 38, 0.35)',
        size: '40vw',
        position: { top: '20%', left: '80%' },
        animation: 'float-slow',
        blur: '60px'
      },
      {
        color: 'rgba(185, 28, 28, 0.22)',
        size: '30vw',
        position: { top: '60%', left: '10%' },
        animation: 'float-medium',
        blur: '80px'
      },
      {
        color: 'rgba(127, 29, 29, 0.25)',
        size: '50vw',
        position: { top: '40%', left: '60%' },
        animation: 'float-slow-reverse',
        blur: '100px'
      }
    ],
    colors: {
      primary: '#dc2626',
      secondary: '#7f1d1d',
      accent: '#ef4444'
    }
  },

  ai: {
    type: 'orbs',
    orbs: [
      {
        color: 'rgba(147, 51, 234, 0.1z2)',
        size: '35vw',
        position: { top: '30%', left: '20%' },
        animation: 'float-medium',
        blur: '70px'
      },
      {
        color: 'rgba(139, 92, 246, 0.20)',
        size: '45vw',
        position: { top: '70%', left: '70%' },
        animation: 'float-slow',
        blur: '90px'
      },
      {
        color: 'rgba(59, 130, 246, 0.28)',
        size: '25vw',
        position: { top: '15%', left: '75%' },
        animation: 'float-fast',
        blur: '50px'
      },
      {
        color: 'rgba(19, 130, 226, 0.18)',
        size: '25vw',
        position: { top: '65%', right: '75%' },
        animation: 'float-fast',
        blur: '50px'
      }
    ],
    colors: {
      primary: '#9333ea',
      secondary: '#581c87',
      accent: '#a855f7'
    }
  },

  linux: {
    type: 'orbs',
    orbs: [
      {
        color: 'rgba(34, 197, 94, 0.10)',
        size: '40vw',
        position: { top: '25%', left: '15%' },
        animation: 'float-slow',
        blur: '75px'
      },
      {
        color: 'rgba(22, 163, 74, 0.08)',
        size: '35vw',
        position: { top: '65%', left: '80%' },
        animation: 'float-medium',
        blur: '65px'
      }
    ],
    colors: {
      primary: '#22c55e',
      secondary: '#16a34a',
      accent: '#4ade80'
    }
  },

  development: {
    type: 'orbs',
    orbs: [
      {
        color: 'rgba(249, 115, 22, 0.12)',
        size: '38vw',
        position: { top: '40%', left: '25%' },
        animation: 'float-medium',
        blur: '80px'
      },
      {
        color: 'rgba(234, 88, 12, 0.09)',
        size: '42vw',
        position: { top: '20%', left: '75%' },
        animation: 'float-slow-reverse',
        blur: '70px'
      },
      {
        color: 'rgba(194, 65, 12, 0.07)',
        size: '30vw',
        position: { top: '75%', left: '50%' },
        animation: 'float-fast',
        blur: '60px'
      }
    ],
    colors: {
      primary: '#f97316',
      secondary: '#ea580c',
      accent: '#fb923c'
    }
  },

  eventos: {
    type: 'orbs',
    orbs: [
      {
        color: 'rgba(168, 85, 247, 0.11)',
        size: '45vw',
        position: { top: '30%', left: '70%' },
        animation: 'float-slow',
        blur: '85px'
      },
      {
        color: 'rgba(217, 70, 239, 0.09)',
        size: '35vw',
        position: { top: '70%', left: '20%' },
        animation: 'float-medium',
        blur: '75px'
      }
    ],
    colors: {
      primary: '#a855f7',
      secondary: '#9333ea',
      accent: '#c084fc'
    }
  },

  community: {
    type: 'orbs',
    orbs: [
      {
        color: 'rgba(236, 72, 153, 0.10)',
        size: '40vw',
        position: { top: '35%', left: '30%' },
        animation: 'float-medium',
        blur: '70px'
      },
      {
        color: 'rgba(244, 114, 182, 0.08)',
        size: '50vw',
        position: { top: '15%', left: '80%' },
        animation: 'float-slow',
        blur: '90px'
      },
      {
        color: 'rgba(251, 146, 60, 0.06)',
        size: '30vw',
        position: { top: '80%', left: '10%' },
        animation: 'float-fast',
        blur: '55px'
      }
    ],
    colors: {
      primary: '#ec4899',
      secondary: '#be185d',
      accent: '#f472b6'
    }
  }
};

// Función helper para obtener efectos visuales de una sección
export const getSectionEffects = (sectionId) => {
  return sectionVisualEffects[sectionId] || sectionVisualEffects.hero;
};

// Función helper para obtener colores de una sección
export const getSectionColors = (sectionId) => {
  return sectionVisualEffects[sectionId]?.colors || sectionVisualEffects.hero.colors;
};

// Animaciones CSS para las esferas
export const orbAnimations = `
  @keyframes float-slow {
    0%, 100% { 
      transform: translate(0, 0) scale(1); 
    }
    25% { 
      transform: translate(10px, -20px) scale(1.05); 
    }
    50% { 
      transform: translate(-5px, -10px) scale(0.95); 
    }
    75% { 
      transform: translate(-15px, 5px) scale(1.02); 
    }
  }

  @keyframes float-medium {
    0%, 100% { 
      transform: translate(0, 0) scale(1); 
    }
    33% { 
      transform: translate(15px, -15px) scale(1.08); 
    }
    66% { 
      transform: translate(-10px, 10px) scale(0.92); 
    }
  }

  @keyframes float-fast {
    0%, 100% { 
      transform: translate(0, 0) scale(1); 
    }
    20% { 
      transform: translate(8px, -12px) scale(1.03); 
    }
    40% { 
      transform: translate(-12px, -8px) scale(0.97); 
    }
    60% { 
      transform: translate(5px, 15px) scale(1.05); 
    }
    80% { 
      transform: translate(-8px, 5px) scale(0.98); 
    }
  }

  @keyframes float-slow-reverse {
    0%, 100% { 
      transform: translate(0, 0) scale(1); 
    }
    25% { 
      transform: translate(-10px, 20px) scale(0.95); 
    }
    50% { 
      transform: translate(5px, 10px) scale(1.05); 
    }
    75% { 
      transform: translate(15px, -5px) scale(0.98); 
    }
  }

  .float-slow { animation: float-slow 20s ease-in-out infinite; }
  .float-medium { animation: float-medium 15s ease-in-out infinite; }
  .float-fast { animation: float-fast 10s ease-in-out infinite; }
  .float-slow-reverse { animation: float-slow-reverse 22s ease-in-out infinite; }
`;
