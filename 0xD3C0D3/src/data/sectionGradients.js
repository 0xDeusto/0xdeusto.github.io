// Configuración de efectos visuales para cada sección
export const sectionVisualEffects = {
  hero: {
    type: 'gradient',
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

  stats: {
    type: 'orbs',
    orbs: [
      {
        color: 'rgba(0, 255, 0, 0.15)',
        size: '40vw',
        position: { top: '10%', right: '80%' },
        animation: 'float-slow',
        blur: '60px'
      },
      {
        color: 'rgba(0, 255, 0, 0.12)',
        size: '30vw',
        position: { top: '60%', left: '10%' },
        animation: 'float-medium',
        blur: '80px'
      }
    ],
    colors: {
      primary: '#00ff00',
      secondary: '#008000',
      accent: '#22c55e'
    }
  },

  about: {
    type: 'orbs',
    orbs: [
      {
        color: 'rgba(0, 255, 0, 0.18)',
        size: '35vw',
        position: { top: '30%', left: '20%' },
        animation: 'float-medium',
        blur: '70px'
      },
      {
        color: 'rgba(0, 255, 0, 0.15)',
        size: '45vw',
        position: { top: '70%', left: '70%' },
        animation: 'float-slow',
        blur: '90px'
      }
    ],
    colors: {
      primary: '#00ff00',
      secondary: '#008000',
      accent: '#22c55e'
    }
  },

  events: {
    type: 'orbs',
    orbs: [
      {
        color: 'rgba(0, 255, 0, 0.12)',
        size: '40vw',
        position: { top: '20%', left: '80%' },
        animation: 'float-slow',
        blur: '60px'
      },
      {
        color: 'rgba(0, 255, 0, 0.15)',
        size: '50vw',
        position: { top: '40%', left: '60%' },
        animation: 'float-slow-reverse',
        blur: '100px'
      }
    ],
    colors: {
      primary: '#00ff00',
      secondary: '#008000',
      accent: '#22c55e'
    }
  },

  gallery: {
    type: 'orbs',
    orbs: [
      {
        color: 'rgba(0, 255, 0, 0.20)',
        size: '45vw',
        position: { top: '15%', left: '15%' },
        animation: 'float-fast',
        blur: '80px'
      },
      {
        color: 'rgba(0, 255, 0, 0.18)',
        size: '35vw',
        position: { top: '65%', right: '15%' },
        animation: 'float-medium',
        blur: '70px'
      }
    ],
    colors: {
      primary: '#00ff00',
      secondary: '#008000',
      accent: '#22c55e'
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
