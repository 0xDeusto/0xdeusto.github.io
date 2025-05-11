// filepath: /home/hjasi/Documentos/DECODE_PRIVATE/website-private/0xD3C0D3/src/components/contact/ContactInfo.jsx
import React from 'react';

const ContactInfo = () => {
  return (
    <div className="bg-gray-800 rounded-xl p-8 border border-green-500/20 shadow-lg mb-8">
      <h2 className="text-2xl font-semibold text-white mb-6">Información de contacto</h2>
      
      <ul className="space-y-6">
        <li className="flex items-start">
          <div className="bg-gray-700 rounded-full p-3 mr-4">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div>
            <h3 className="text-gray-300 text-lg font-medium">Email</h3>
            <a href="mailto:info@0xd3c0d3.org" className="text-green-500 hover:text-green-400">info@0xd3c0d3.org</a>
          </div>
        </li>
        
        <li className="flex items-start">
          <div className="bg-gray-700 rounded-full p-3 mr-4">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <div>
            <h3 className="text-gray-300 text-lg font-medium">Ubicación</h3>
            <p className="text-gray-400">Universidad de Deusto<br />Bilbao, España</p>
          </div>
        </li>
        
        <li className="flex items-start">
          <div className="bg-gray-700 rounded-full p-3 mr-4">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
          </div>
          <div>
            <h3 className="text-gray-300 text-lg font-medium">Discord</h3>
            <a href="/join" className="text-green-500 hover:text-green-400">Únete a nuestro servidor</a>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ContactInfo;