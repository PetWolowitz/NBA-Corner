import React, { useState, useEffect } from 'react';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const [bounceHeight, setBounceHeight] = useState(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBounceHeight(prev => (prev === 0 ? -20 : 0));
      setRotation(prev => prev + 180);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-700 to-red-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full text-center relative overflow-hidden">
        {/* Animated Basketball */}
        <div 
          className="w-16 h-16 mx-auto mb-6 transition-all duration-1000 ease-in-out"
          style={{ 
            transform: `translateY(${bounceHeight}px) rotate(${rotation}deg)` 
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="#ff6b00" />
            <path
              d="M50 5 C50 95 50 95 50 95"
              stroke="black"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M5 50 C95 50 95 50 95 50"
              stroke="black"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M20 20 C80 80 80 80 80 80"
              stroke="black"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M80 20 C20 80 20 80 20 80"
              stroke="black"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl font-black mb-4" style={{ fontFamily: '"Archivo Black", sans-serif' }}>
          TECHNICAL FOUL!
        </h2>
        <p className="text-gray-600 mb-6">
          Looks like our API call got blocked! Coach is reviewing the tape...
        </p>
        <div className="bg-gray-100 rounded-lg p-4 mb-6 text-left">
          <p className="font-mono text-sm text-red-600 break-all">
            {error?.message || 'API Connection Error'}
          </p>
        </div>

        {/* Basketball Court Lines */}
        <div className="absolute bottom-0 left-0 w-full h-12 opacity-10">
          <div className="absolute bottom-0 left-1/2 w-px h-full bg-black"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-black"></div>
          <div className="absolute bottom-6 left-4 w-8 h-8 border-2 border-black rounded-full"></div>
          <div className="absolute bottom-6 right-4 w-8 h-8 border-2 border-black rounded-full"></div>
        </div>

        {/* Retry Button */}
        <button
          onClick={resetErrorBoundary}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
        >
          BACK TO THE COURT
        </button>

        {/* Scoreboard */}
        <div className="absolute top-4 right-4 bg-black text-red-500 px-3 py-1 rounded font-mono text-sm">
          ERR: 401
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;