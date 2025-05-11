import React from 'react';

const FAQSection = () => {
  return (
    <section className="mb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-12 text-white text-center">Preguntas Frecuentes</h2>
        
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-2">¿Cómo puedo unirme a 0xD3C0D3?</h3>
            <p className="text-gray-300">
              Puedes unirte a nuestro servidor de Discord donde compartimos todas las actividades y eventos. 
              También organizamos sesiones de bienvenida al inicio de cada semestre académico.
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-2">¿Necesito tener conocimientos previos?</h3>
            <p className="text-gray-300">
              ¡No! Tenemos miembros de todos los niveles, desde principiantes absolutos hasta personas con años de experiencia. 
              Organizamos actividades para diferentes niveles de habilidad.
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-2">¿Qué tipos de eventos organizáis?</h3>
            <p className="text-gray-300">
              Organizamos talleres técnicos, charlas, hackathones, competiciones de CTF (Capture The Flag), sesiones de programación 
              colaborativa y eventos sociales. Consulta nuestra página de eventos para ver el calendario actualizado.
            </p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-2">¿Cómo puedo colaborar o proponer una actividad?</h3>
            <p className="text-gray-300">
              Nos encanta recibir propuestas! Puedes contactarnos a través del formulario en la página de contacto o 
              hablar directamente con cualquiera de los coordinadores en Discord.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;