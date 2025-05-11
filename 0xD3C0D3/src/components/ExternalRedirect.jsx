import { useEffect } from 'react';

const ExternalRedirect = ({ to, message = "Redirigiendo..." }) => {
  useEffect(() => {
    window.location.href = to;
  }, [to]);
  
  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <h2 className="text-2xl text-green-500 mb-4">{message}</h2>
        <div className="animate-spin h-10 w-10 border-4 border-green-500 rounded-full border-t-transparent mx-auto"></div>
      </div>
    </div>
  );
};

export default ExternalRedirect;