import React from 'react';

const CTASection = () => {
  return (
    <section>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-gray-800 to-green-900/30 rounded-xl p-8 text-center border border-green-500/30">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">¿Te gustaría formar parte de nuestra comunidad?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Únete a un grupo de estudiantes apasionados por la tecnología, participa en nuestros eventos y aprende nuevas habilidades en un entorno colaborativo.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="/join" className="px-8 py-3 bg-green-600 hover:bg-green-700 rounded-md text-white font-medium transition-all shadow-lg">
              Únete al Discord
            </a>
            <a href="/contact" className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-md text-white font-medium transition-all border border-green-500/30">
              Contacta con nosotros
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;