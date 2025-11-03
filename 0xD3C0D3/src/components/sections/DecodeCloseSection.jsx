import React, { useState, useEffect, useRef, useCallback } from 'react';

const DecodeAnimation = () => {
  const [progress, setProgress] = useState(0);
  const [initialPositions, setInitialPositions] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const initialLettersRef = useRef([]);
  const normalLettersRef = useRef([]);
  const stickyHolderRef = useRef(null);
  const stickyContainerRef = useRef(null);
  const observerRef = useRef(null);

  // Palabras del texto original
  const words = [
    { word: 'Deusto', initial: 'D', index: 0 },
    { word: 'Electronic', initial: 'E', index: 1 },
    { word: 'Club', initial: 'C', index: 2 },
    { word: 'Of', initial: 'O', index: 3 },
    { word: 'Developers', initial: 'D', index: 4 },
    { word: 'Engineers', initial: 'E', index: 5 }
  ];

  // Inicializar posiciones
  const initializePositions = useCallback(() => {
    if (!stickyContainerRef.current) return;

    const allElementsReady = initialLettersRef.current.every(el => el !== null && el !== undefined);
    if (!allElementsReady) {
      setTimeout(() => initializePositions(), 50);
      return;
    }

    const containerRect = stickyContainerRef.current.getBoundingClientRect();
    const positions = [];

    initialLettersRef.current.forEach((letter, index) => {
      if (letter) {
        const rect = letter.getBoundingClientRect();
        positions[index] = {
          absoluteLeft: rect.left,
          absoluteTop: rect.top,
          relativeLeft: rect.left - containerRect.left,
          relativeTop: rect.top - containerRect.top
        };
      }
    });

    setInitialPositions(positions);
    setIsInitialized(true);
  }, []);

  // Intersection Observer
  useEffect(() => {
    if (!stickyHolderRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            setTimeout(() => {
              initializePositions();
            }, 100);
          }
        });
      },
      {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    observerRef.current.observe(stickyHolderRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [initializePositions, isVisible]);

  // Manejar scroll
  const handleScroll = useCallback(() => {
    if (!stickyHolderRef.current) return;

    const holderRect = stickyHolderRef.current.getBoundingClientRect();
    const holderHeight = stickyHolderRef.current.offsetHeight;
    const windowHeight = window.innerHeight;

    if (holderRect.bottom < 0 || holderRect.top > windowHeight) {
      return;
    }

    const maxScroll = holderHeight - windowHeight;
    const scrolled = Math.max(0, -holderRect.top);
    const scrollProgress = Math.min(Math.max(scrolled / maxScroll, 0), 1);

    setProgress(scrollProgress);
  }, []);

  // Animaciones y fondo
  useEffect(() => {
    if (!initialPositions.length) return;

    // Fondo de la animación (blanco si progress = 1)
    if (stickyContainerRef.current) {
      stickyContainerRef.current.style.background = progress >= 1 ? '#fff' : 'transparent';
      stickyContainerRef.current.style.transition = 'background 0.3s cubic-bezier(.59,-0.16,.37,1.25)';
    }

    // FASE INICIAL: Cambio de color de iniciales (0% - 15%)
    const initialColorProgress = Math.min(Math.max(progress / 0.15, 0), 1);

    // FASE 1: Fade out de letras normales (15% - 40%)
    const fadeProgress = Math.min(Math.max((progress - 0.15) / 0.25, 0), 1);

    // Cambiar color de las iniciales de blanco a verde al inicio del scroll
    initialLettersRef.current.forEach(letter => {
      if (letter) {
        if (progress === 0) {
          letter.style.color = '#ffffff';
          letter.style.fontWeight = 'bold';
          letter.style.textShadow = '';
          letter.style.transform = '';
        } else if (progress > 0 && progress <= 0.15) {
          const r = Math.round(255 * (1 - initialColorProgress));
          const g = Math.round(255 * (1 - initialColorProgress) + 255 * initialColorProgress);
          const b = Math.round(255 * (1 - initialColorProgress) + 136 * initialColorProgress);
          letter.style.color = `rgb(${r}, ${g}, ${b})`;
          if (initialColorProgress > 0.5) {
            letter.style.textShadow = `0 0 ${10 * (initialColorProgress - 0.5) * 2}px #00ff88`;
          }
        } else if (progress > 0.15 && fadeProgress > 0.2) {
          const glowIntensity = Math.min((fadeProgress - 0.2) / 0.8, 1);
          letter.style.textShadow = `0 0 ${20 * glowIntensity}px #00ff88`;
          const currentTransform = letter.style.transform;
          if (!currentTransform.includes('translate')) {
            letter.style.transform = `scale(${1 + (glowIntensity * 0.3)})`;
          }
        }
      }
    });

    normalLettersRef.current.forEach(letter => {
      if (letter) {
        if (progress <= 0.15) {
          letter.style.opacity = 1;
          letter.style.transform = 'scale(1)';
        } else {
          const opacity = Math.max(1 - fadeProgress, 0);
          const scale = Math.max(1 - (fadeProgress * 0.3), 0.7);
          letter.style.opacity = opacity;
          letter.style.transform = `scale(${scale})`;
        }
      }
    });


    // FASE 2: Efecto imán (40% - 100%) - Las letras se juntan
    if (progress > 0.4) {
      const magnetProgress = (progress - 0.4) / 0.6;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const letterSpacing = 123; // Espaciado entre letras
      const totalWidth = (6 - 1) * letterSpacing;
      const startX = centerX - totalWidth / 2;

      initialLettersRef.current.forEach((letter, index) => {
        if (!letter || !initialPositions[index] || !stickyContainerRef.current) return;
        const initialPos = initialPositions[index];

        const targetX = startX + (index * letterSpacing);
        const targetY = centerY;

        const deltaX = targetX - initialPos.absoluteLeft;
        const deltaY = targetY - initialPos.absoluteTop;

        const currentX = deltaX * magnetProgress;
        const currentY = deltaY * magnetProgress;

        letter.style.position = 'fixed';
        letter.style.top = initialPos.absoluteTop + 'px';
        letter.style.left = initialPos.absoluteLeft + 'px';
        letter.style.transform = `translate(${currentX}px, ${currentY}px) scale(${1 + magnetProgress})`;
        letter.style.zIndex = '20';

        // Cambiar color gradualmente durante el movimiento
        const greenIntensity = magnetProgress;
        const r = Math.round(0 + greenIntensity * 0);
        const g = Math.round(255 * (1 - greenIntensity) + 204 * greenIntensity);
        const b = Math.round(136 * (1 - greenIntensity) + 68 * greenIntensity);
        letter.style.color = progress >= 1 ? '#333' : `rgb(${r}, ${g}, ${b})`; // Letras oscuras al terminar

        const fontSize = 3 + (magnetProgress * 3);
        letter.style.fontSize = fontSize + 'rem';
        letter.style.fontWeight = 'bold';
      });

    } else {
      initialLettersRef.current.forEach((letter) => {
        if (letter) {
          letter.style.position = '';
          letter.style.top = '';
          letter.style.left = '';
          letter.style.transform = letter.style.transform?.replace(/translate\([^)]*\)\s*/g, '') || '';
          letter.style.fontSize = '';
          letter.style.zIndex = '';
          letter.style.fontWeight = 'bold';
          if (progress === 0) {
            letter.style.color = '#ffffff';
            letter.style.textShadow = '';
          } else if (progress <= 0.15) {
            const initialColorProgress = Math.min(Math.max(progress / 0.15, 0), 1);
            const r = Math.round(255 * (1 - initialColorProgress));
            const g = Math.round(255 * (1 - initialColorProgress) + 255 * initialColorProgress);
            const b = Math.round(255 * (1 - initialColorProgress) + 136 * initialColorProgress);
            letter.style.color = `rgb(${r}, ${g}, ${b})`;
          } else {
            letter.style.color = '#00ff88';
          }
        }
      });
    }
  }, [progress, initialPositions]);

  // Effect para scroll y resize
  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => {
        setIsInitialized(false);
        setInitialPositions([]);
        normalLettersRef.current = [];
        initializePositions();
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    if (!isInitialized && isVisible) {
      const timer = setTimeout(() => {
        initializePositions();
      }, 200);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        clearTimeout(timer);
      };
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleScroll, initializePositions, isInitialized, isVisible]);

  // Renderizar cada palabra con refs de inicial y normales
  const renderWord = (wordData, wordIndex) => {
    const { word, initial, index } = wordData;

    return (
      <span key={`word-${wordIndex}`} style={{ display: 'inline-flex', margin: '0 0.5rem 0.5rem 0.5rem', position: 'relative' }}>
        {word.split('').map((letter, letterIndex) => {
          const isInitial = letterIndex === 0 && letter === initial;
          const uniqueKey = `${wordIndex}-${letterIndex}`;

          return (
            <span
              key={uniqueKey}
              style={{
                display: 'inline-block',
                position: 'relative',
                color: '#ffffff',
                fontWeight: isInitial ? 'bold' : 'normal',
                zIndex: isInitial ? '5' : 'auto'
              }}
              ref={el => {
                if (isInitial && el) {
                  initialLettersRef.current[index] = el;
                } else if (!isInitial && el) {
                  if (!normalLettersRef.current.includes(el)) {
                    normalLettersRef.current.push(el);
                  }
                }
              }}
            >
              {letter}
            </span>
          );
        })}
        {wordIndex < words.length - 2 && (
          <span
            style={{ display: 'inline-block', position: 'relative' }}
            ref={el => {
              if (el && !normalLettersRef.current.includes(el)) {
                normalLettersRef.current.push(el);
              }
            }}
          > </span>
        )}
        {wordIndex === words.length - 2 && (
          <span
            style={{ display: 'inline-block', position: 'relative', marginLeft: '1rem' }}
            ref={el => {
              if (el && !normalLettersRef.current.includes(el)) {
                normalLettersRef.current.push(el);
              }
            }}
          > & </span>
        )}
      </span>
    );
  };

  return (
    <div
      ref={stickyHolderRef}
      style={{
        height: '300vh',
        width: '100%',
      }}
    >
      <div
        ref={stickyContainerRef}
        style={{
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          width: '100%',
          fontFamily: 'Arial, sans-serif',
          overflow: 'hidden',
          background: progress >= 1 ? '#fff' : '#030a10',
          transition: 'background 0.8s cubic-bezier(.59,-0.16,.37,1.25)'
        }}
      >
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            fontSize: '1.5rem',
            color: '#00ff88',
            opacity: 0.6,
            marginBottom: '3rem',
            zIndex: 10
          }}>
            Welcome to the
          </div>
          <h1 style={{
            position: 'relative',
            width: '100%',
            height: 'auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '3rem',
            color: progress >= 1 ? 'transparent' : '#ffffff', // Letras oscuras en fondo blanco
            fontWeight: 300,
            lineHeight: 1.2,
            textAlign: 'center',
            padding: '0 2rem'
          }}>
            {words.map((wordData, index) => renderWord(wordData, index))}
          </h1>
        </div>
        <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#00ff88',
          textAlign: 'center',
          zIndex: 30,
          opacity: 0.7,
          fontSize: '1rem'
        }}>
        </div>
      </div>
    </div>
  );
};

export default DecodeAnimation;
