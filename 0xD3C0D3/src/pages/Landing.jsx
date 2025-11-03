import React, { useState, useEffect } from "react";
import HeroSection from "../components/sections/HeroSection";
import SectionEffects from "../components/landing/SectionEffects";
import DiscoverQHCM from "../components/sections/DiscoverQHCMSection";
import DecodeCloseSection from "../components/sections/DecodeCloseSection";

function NewLanding2() {
  const [currentSection, setCurrentSection] = useState(0);
  const [showBoot, setShowBoot] = useState(false);


  const sections = [
    { id: 'hero', component: HeroSection },
    { id: 'discover', component: DiscoverQHCM },
    { id: 'decodeClosing', component: DecodeCloseSection }

  ];


  return (
    <div className={`w-full bg-black relative transition-all duration-1000`}>
      
      {/* Secciones */}
      {!showBoot && (
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
                className="min-h-screen w-full relative"
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


          {/* Fondo grid */}
          <div className="absolute inset-0 opacity-5 z-0">
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





      )}

      {/* Indicador de progreso lateral */}
      {!showBoot && (
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
          <div className="flex flex-col space-y-2">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => {
                  document.getElementById(section.id)?.scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                }}
                className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  currentSection === index 
                    ? 'bg-green-400 border-green-400 scale-125' 
                    : 'bg-transparent border-green-600 hover:border-green-400'
                }`}
                title={section.id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}




export default NewLanding2;
