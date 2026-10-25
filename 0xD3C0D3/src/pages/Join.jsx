import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import JoinPanel from '../components/join/JoinPanel';
import logoNav from '../assets/logonav.png';

// Página independiente (0xdecode.es/unete): pensada para QR en carteles y enlaces en redes.
const Join = () => {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Únete · 0xDecode';
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-black px-4 py-10">
      {/* Mismo fondo de rejilla que la landing */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.08]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,0,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,0,0.8) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative z-10 flex w-full max-w-xl flex-col items-stretch">
        <Link to="/" className="mb-6 self-center" aria-label="Volver a la web de 0xDecode">
          <img src={logoNav} alt="0xDecode" className="h-16 w-auto" />
        </Link>
        <JoinPanel as="h1" />
        <Link
          to="/"
          className="mt-6 self-center font-mono text-sm text-green-400 underline-offset-4 hover:text-green-300 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300"
        >
          Volver a la web
        </Link>
      </div>
    </main>
  );
};

export default Join;
