import { useEffect, useState } from 'react';

const NotFound = () => {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center p-8 border border-green-500 bg-gray-800 bg-opacity-50 rounded-md max-w-lg">
        <div className="mb-4 text-green-500 text-xs">
          <p className="font-mono">[ERROR] :: CONNECTION_FAILED</p>
        </div>
        <div className="flex items-center justify-center mb-6">
          <svg className="w-20 h-20 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938-9L12 4.062l6.938 2.938M18.938 9L12 11.938 5.062 9M12 19.938l-6.938-2.938 6.938-2.937 6.938 2.937-6.938 2.938z" />
          </svg>
        </div>
        <h2 className="text-3xl text-green-500 font-mono mb-2">404_NOT_FOUND</h2>
        <p className="text-green-400 font-mono mb-4">The requested resource could not be located on this server.</p>
        <div className="p-2 bg-gray-900 border border-green-500 rounded font-mono text-sm text-green-500 mb-4">
          <p className="flex">
            <span className="mr-2">root@0xdeusto:~$</span>
            <span>locate target_file{showCursor ? '|' : ' '}</span>
          </p>
        </div>
        <a href="/" className="inline-block px-4 py-2 bg-green-500 hover:bg-green-600 text-black font-mono rounded transition-colors duration-200">
          RETURN_TO_BASE
        </a>
      </div>
    </div>
  );
};

export default NotFound;