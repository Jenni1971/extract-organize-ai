import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
  duration?: number;
}

export default function SplashScreen({ onFinish, duration = 1500 }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onFinish, 500);
    }, duration);

    return () => clearTimeout(timer);
  }, [onFinish, duration]);

  const handleSkip = () => {
    setFadeOut(true);
    setTimeout(onFinish, 300);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`} style={{ backgroundColor: '#0F1020' }}>
      <div className="relative">
        <img 
          src="https://d64gsuwffb70l.cloudfront.net/6912124599dc49d542f6ba1f_1762879465120_b89014b8.png"
          alt="Snap Xtract Logo"
          className="w-[600px] h-auto object-contain animate-slideX"
        />



        <div className="absolute inset-0 bg-blue-400/10 blur-3xl animate-pulse" />
      </div>

      <button
        onClick={handleSkip}
        className="absolute bottom-12 right-12 px-6 py-3 bg-white/90 hover:bg-white text-blue-600 font-semibold rounded-full shadow-lg transition-all hover:scale-105"
      >
        Skip
      </button>

      
      <style>{`
        @keyframes slideX {
          0%, 100% { transform: translateX(-20px); opacity: 0.8; }
          50% { transform: translateX(20px); opacity: 1; }
        }
        .animate-slideX {
          animation: slideX 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
