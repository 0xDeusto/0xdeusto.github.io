import React, { useState, useEffect } from "react";
import HeroSection from "../components/sections/HeroSection";
import StatsSection from "../components/sections/StatsSection";
import AboutSection from "../components/sections/AboutSection";
import EventsSection from "../components/sections/EventsSection";
import GallerySection from "../components/sections/GallerySection";
import SectionEffects from "../components/landing/SectionEffects";
import EventAnnouncement from "../components/landing/EventAnnouncement";
import Footer from "../components/layout/Footer";

function NewLanding2() {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    { id: 'hero', component: HeroSection },
    { id: 'stats', component: StatsSection },
    { id: 'about', component: AboutSection },
    { id: 'events', component: EventsSection },
    { id: 'gallery', component: GallerySection }
  ];


  return (
    <div className={`w-full bg-black relative transition-all duration-1000`}>
      {/* Anuncio de evento Summer School */}
      <EventAnnouncement />

      {/* Secciones */}
      <div className="relative z-10">
        {/* Efectos visuales dinámicos para cada sección */}
        {sections.map((section, index) => (
          <SectionEffects 
            key={`effects-${section.id}`}
            sectionId={section.id}
            sectionIndex={index}
            currentSection={currentSection}
          />
        ))}

        {/* Renderizado de secciones */}
        {sections.map((section, index) => {
          const Component = section.component;
          const isCurrentSection = currentSection === index;
          
          return (
            <div
              key={section.id}
              className="w-full relative"
              id={section.id}
              style={{
                zIndex: 10
              }}
            >
              <Component 
                theme={section.theme}
              />
            </div>
          );
        })}

        {/* Footer */}
        <Footer />

        {/* Fondo grid verde retro - extendido a toda la web */}
        <div className="fixed inset-0 opacity-[0.08] z-0 pointer-events-none">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,255,0,0.8) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,255,0,0.8) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>
      </div>


    </div>
  );
}

export default NewLanding2;
