import React, { useEffect } from 'react';
import { AppProvider } from '@/contexts/AppContext';
import AppBar from '@/components/AppBar';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Processing: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => navigate('/library'), 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <AppProvider>
      <div className="min-h-screen bg-[#0F1020]">
        <AppBar />
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="bg-gray-800/50 rounded-lg p-8 text-center">
            {progress < 100 ? (
              <>
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-white mb-4">Processing Your Content</h2>
                <p className="text-gray-400 mb-6">Extracting text and organizing...</p>
                <Progress value={progress} className="mb-4" />
                <p className="text-sm text-gray-500">{progress}% complete</p>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-white mb-4">Complete!</h2>
                <p className="text-gray-400">Redirecting to your library...</p>
              </>
            )}
          </div>
        </div>
      </div>
    </AppProvider>
  );
};

export default Processing;
