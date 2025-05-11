import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 border-b border-green-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <span className="font-['Orbitron',_sans-serif]  text-green-500 font-bold text-2xl">0xD3C0D3</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className="text-white hover:bg-gray-800 hover:text-green-500 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/about" className="text-white hover:bg-gray-800 hover:text-green-500 px-3 py-2 rounded-md text-sm font-medium">About Us</Link>
              <Link to="/events" className="text-white hover:bg-gray-800 hover:text-green-500 px-3 py-2 rounded-md text-sm font-medium">Events</Link>
              <Link to="/partners" className="text-white hover:bg-gray-800 hover:text-green-500 px-3 py-2 rounded-md text-sm font-medium">Partners</Link>
              <Link to="/contact" className="text-white hover:bg-gray-800 hover:text-green-500 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
              <Link to="/join" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium transition-all">Join Us</Link>
            </div>
          </div>
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-green-500 hover:text-white hover:bg-gray-800"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="text-white hover:bg-gray-800 hover:text-green-500 block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link to="/about" className="text-white hover:bg-gray-800 hover:text-green-500 block px-3 py-2 rounded-md text-base font-medium">About Us</Link>
            <Link to="/events" className="text-white hover:bg-gray-800 hover:text-green-500 block px-3 py-2 rounded-md text-base font-medium">Events</Link>
            <Link to="/partners" className="text-white hover:bg-gray-800 hover:text-green-500 block px-3 py-2 rounded-md text-base font-medium">Partners</Link>
            <Link to="/contact" className="text-white hover:bg-gray-800 hover:text-green-500 block px-3 py-2 rounded-md text-base font-medium">Contact</Link>
            <Link to="/join" className="bg-green-600 hover:bg-green-700 block px-4 py-2 rounded-md text-base font-medium text-center">Join Us</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;