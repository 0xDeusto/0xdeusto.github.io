import React, { useState, useEffect, useRef } from 'react';

const StatsSection = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  const stats = [
    { number: 300, label: 'Miembros', suffix: '' },
    { number: 15, label: 'Eventos Totales', suffix: '' },
    { number: 5, label: 'Eventos Este año', suffix: '' }
  ];

  const [counters, setCounters] = useState(stats.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  const animateCounters = () => {
    stats.forEach((stat, index) => {
      const duration = 2000; // 2 segundos
      const steps = 60;
      const increment = stat.number / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current = Math.min(current + increment, stat.number);
        
        setCounters(prev => {
          const newCounters = [...prev];
          newCounters[index] = Math.floor(current);
          return newCounters;
        });

        if (step >= steps) {
          clearInterval(timer);
          setCounters(prev => {
            const newCounters = [...prev];
            newCounters[index] = stat.number;
            return newCounters;
          });
        }
      }, duration / steps);
    });
  };

  return (
    <section ref={sectionRef} className="min-h-screen  relative px-6 py-20 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto z-10 relative">
        {/* Slogan Principal */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-mono font-bold mb-6">
            <span className="text-green-400">APRENDE</span>
            <span className="text-white">. CONECTA. </span>
            <span className="text-green-400">CREA</span>
            <span className="text-white">.</span>
          </h2>
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-mono font-bold mb-4">
            <span className="text-white">CRECE. DECODE: </span>
            <span className="text-green-400">TECNOLOGÍA,</span>
          </h3>
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-mono font-bold">
            <span className="text-green-400">COMUNIDAD</span>
            <span className="text-white"> Y FUTURO.</span>
          </h3>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="relative group">
              <div className="bg-black bg-opacity-60 border border-green-600 p-8 hover:border-green-400 transition-all duration-300 hover:bg-opacity-80 hover:scale-105">
                <div className="text-5xl md:text-6xl lg:text-7xl font-mono font-bold text-green-400 mb-4">
                  {counters[index]}{stat.suffix}
                </div>
                <div className="text-lg md:text-xl text-white font-mono">
                  {stat.label}
                </div>
              </div>
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-green-400 opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
