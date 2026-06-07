import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_ENDPOINTS, API_DOMAIN } from '../../config/api';

const resolveImageUrl = (url) => {
  if (!url) return url;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/')) return `${API_DOMAIN}${url}`;
  return url;
};

const EventAnnouncement = () => {
  const [announcement, setAnnouncement] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showWidget, setShowWidget] = useState(false);
  const [timeLeft, setTimeLeft] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.announcement);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        if (data.has_announcement && data.announcement) {
          setAnnouncement(data.announcement);
          const hasSeen = localStorage.getItem('announcementClosed');
          if (!hasSeen) {
            const timer = setTimeout(() => setIsVisible(true), 800);
            return () => clearTimeout(timer);
          } else {
            setShowWidget(true);
          }
        }
      } catch (e) {
        console.error('Error fetching announcement:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncement();
  }, []);

  useEffect(() => {
    if (!isVisible || !announcement?.event_date) return;
    const eventDate = new Date(announcement.event_date);
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = eventDate - now;
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [isVisible, announcement?.event_date]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('announcementClosed', 'true');
    setTimeout(() => setShowWidget(true), 400);
  };

  const handleRegister = () => {
    if (announcement?.registration_url) {
      window.open(announcement.registration_url, '_blank');
    }
    handleClose();
  };

  const handleReopen = () => {
    setShowWidget(false);
    setIsVisible(true);
  };

  const formatNumber = (num) => String(num).padStart(2, '0');

  if (loading) return null;
  if (!announcement) return null;

  const eventDate = announcement?.event_date ? new Date(announcement.event_date) : null;
  const allImages = (announcement.images || []).map(resolveImageUrl);
  const mainImage = allImages[0];
  const galleryImages = allImages;

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center px-3 py-4 sm:px-4 sm:py-8"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose} />

            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl max-h-[92dvh] sm:max-h-[90vh] bg-black border-2 border-green-500/60 shadow-[0_0_40px_rgba(34,197,94,0.25)] overflow-y-auto sm:overflow-visible"
            >
              {/* Scanning line */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                <div
                  className="absolute w-full h-px bg-green-400/40"
                  style={{ animation: 'scanLine 3.5s linear infinite', top: '0%' }}
                />
              </div>

              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-green-400 z-20" />
              <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-green-400 z-20" />
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-green-400 z-20" />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-green-400 z-20" />

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 sm:top-3 sm:right-3 text-green-500 hover:text-green-300 transition-colors z-30 p-1 bg-black/60 rounded"
                aria-label="Cerrar anuncio"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Content grid */}
              <div className="flex flex-col lg:flex-row">
                {/* Left: info */}
                <div className="flex-1 p-4 sm:p-6 lg:p-8">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-900/40 border border-green-500/40 text-green-400 font-mono text-[10px] sm:text-xs uppercase tracking-wider mb-3 sm:mb-4">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Próximo evento
                  </div>

                  {/* Title */}
                  <h2 className="font-orbitron text-xl sm:text-3xl lg:text-4xl font-bold text-white uppercase tracking-wider mb-1 sm:mb-2">
                    {announcement.title}
                  </h2>
                  <div className="text-green-400 font-mono text-xs sm:text-sm mb-4 sm:mb-6">
                    <span className="opacity-80">{announcement.subtitle}</span>
                  </div>

                  {/* Countdown */}
                  {eventDate && (
                    <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
                      {[
                        { label: 'DÍAS', value: timeLeft.days },
                        { label: 'HRS', value: timeLeft.hours },
                        { label: 'MIN', value: timeLeft.minutes },
                        { label: 'SEG', value: timeLeft.seconds },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="bg-green-950/50 border border-green-500/30 p-2 sm:p-3 text-center"
                        >
                          <div className="font-orbitron text-base sm:text-2xl font-bold text-green-400">
                            {formatNumber(item.value || 0)}
                          </div>
                          <div className="font-mono text-[9px] sm:text-xs text-green-500/70 uppercase mt-0.5 sm:mt-1">
                            {item.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-green-100/80 font-mono text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                    {announcement.description}
                  </p>

                  {/* Gallery thumbnails */}
                  {galleryImages.length > 0 && (
                    <div className="mb-4 sm:mb-6">
                      <p className="text-green-500/60 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider mb-2">
                        Galería del evento
                      </p>
                      <div className="flex gap-2">
                        {galleryImages.map((src, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedImage(src)}
                            className="relative w-14 h-14 sm:w-20 sm:h-20 border border-green-500/30 overflow-hidden hover:border-green-400 transition-colors group"
                          >
                            <img
                              src={src}
                              alt={`${announcement.title} ${idx + 1}`}
                              className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                              draggable={false}
                            />
                            <div className="absolute inset-0 bg-green-500/10 group-hover:bg-transparent transition-colors" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button
                      onClick={handleRegister}
                      className="flex-1 group relative px-5 sm:px-6 py-2.5 sm:py-3 bg-green-600 text-black font-mono font-bold uppercase tracking-wider hover:bg-green-500 transition-all duration-300 overflow-hidden flex items-center justify-center gap-2 text-xs sm:text-sm"
                    >
                      <span className="relative z-10">{announcement.cta_text || 'Apúntate ahora'}</span>
                      <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                      <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                    </button>

                    <button
                      onClick={handleClose}
                      className="px-5 sm:px-6 py-2.5 sm:py-3 border border-green-600/50 text-green-400 font-mono text-xs sm:text-sm uppercase tracking-wider hover:bg-green-900/30 transition-all duration-300"
                    >
                      Más tarde
                    </button>
                  </div>

                  {/* Footer note */}
                  {announcement.footer_text && (
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-green-500/20">
                      <p className="text-green-500/50 font-mono text-[9px] sm:text-xs text-center">
                        {announcement.footer_text}
                      </p>
                    </div>
                  )}
                </div>

                {/* Right: main image */}
                {mainImage && (
                  <div className="lg:w-[380px] xl:w-[440px] flex-shrink-0 border-t lg:border-t-0 lg:border-l border-green-500/20 bg-green-950/10 relative flex flex-col">
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-green-400/50 z-10 pointer-events-none" />
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-green-400/50 z-10 pointer-events-none" />
                    <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-green-400/50 z-10 pointer-events-none" />
                    <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-green-400/50 z-10 pointer-events-none" />

                    <div className="flex-1 min-h-0 p-3 sm:p-4 lg:p-6 flex flex-col justify-center">
                      <div
                        className="relative flex-1 overflow-hidden border border-green-500/30 group cursor-pointer min-h-0"
                        onClick={() => setSelectedImage(mainImage)}
                      >
                        <img
                          src={mainImage}
                          alt={announcement.title}
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                          draggable={false}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-green-400 font-mono text-[10px] sm:text-xs uppercase tracking-wider border border-green-400/50 px-2 sm:px-3 py-0.5 sm:py-1 bg-black/60">
                            Ver imagen
                          </span>
                        </div>
                      </div>

                      <div className="mt-2 sm:mt-3 flex items-center gap-2 flex-shrink-0">
                        <div className="h-px flex-1 bg-green-500/20" />
                        <span className="text-green-500/40 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider">
                          {announcement.title} 2025
                        </span>
                        <div className="h-px flex-1 bg-green-500/20" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            <style>{`
              @keyframes scanLine {
                0% { top: 0%; opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { top: 100%; opacity: 0; }
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Widget flotante para reabrir el anuncio */}
      <AnimatePresence>
        {showWidget && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 250 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[90] w-48 sm:w-56"
          >
            <div
              className="relative bg-black border-2 border-green-500/60 shadow-[0_0_20px_rgba(34,197,94,0.3)] overflow-hidden cursor-pointer group"
              onClick={handleReopen}
            >
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                <div
                  className="absolute w-full h-px bg-green-400/30"
                  style={{ animation: 'scanLine 2.5s linear infinite', top: '0%' }}
                />
              </div>

              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-green-400 z-10" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-green-400 z-10" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-green-400 z-10" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-green-400 z-10" />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowWidget(false);
                }}
                className="absolute top-1 right-1 z-20 text-green-500/70 hover:text-green-300 transition-colors p-0.5"
                aria-label="Ocultar widget"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="relative h-20 sm:h-24 overflow-hidden">
                {mainImage && (
                  <img
                    src={mainImage}
                    alt={announcement.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    draggable={false}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>

              <div className="p-2 sm:p-3 relative">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 font-mono text-[8px] sm:text-[9px] uppercase tracking-wider">
                    Próximo evento
                  </span>
                </div>
                <h3 className="font-orbitron text-sm sm:text-base font-bold text-white uppercase tracking-wider leading-tight">
                  {announcement.title}
                </h3>
                <p className="text-green-500/60 font-mono text-[9px] sm:text-[10px] mt-0.5">
                  {announcement.subtitle?.split('|')[0]?.trim()}
                </p>
                <div className="mt-2 flex items-center gap-1 text-green-400 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider group-hover:text-green-300 transition-colors">
                  <span>Ver anuncio</span>
                  <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox for enlarged images */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center px-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-8 sm:-top-10 right-0 text-green-500 hover:text-green-300 transition-colors"
              >
                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="border-2 border-green-500/40 p-1.5 sm:p-2 bg-black">
                <img
                  src={selectedImage}
                  alt="Vista ampliada"
                  className="w-full h-auto max-h-[60vh] sm:max-h-[70vh] object-contain"
                  draggable={false}
                />
              </div>
              <p className="text-green-500/40 font-mono text-[10px] sm:text-xs text-center mt-2 sm:mt-3 uppercase tracking-wider">
                Haz clic fuera de la imagen para cerrar
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EventAnnouncement;
