import { useState } from 'react';
import { Upload, CheckCircle2, Clock, Zap } from 'lucide-react';

export default function BatchProcessing() {
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const startDemo = () => {
    setIsProcessing(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-950/80 to-purple-950/60 rounded-2xl sm:rounded-3xl p-6 sm:p-12 border border-purple-400/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Batch Processing Power</h3>
          <p className="text-sm sm:text-base text-gray-300">Upload and process multiple screenshots simultaneously with real-time progress tracking</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-indigo-900/40 rounded-xl p-4 border border-purple-500/20">
            <Upload className="w-8 h-8 text-cyan-400 mb-2" />
            <h4 className="text-white font-semibold mb-1">Multi-Upload</h4>
            <p className="text-gray-400 text-sm">Select multiple files at once</p>
          </div>
          <div className="bg-indigo-900/40 rounded-xl p-4 border border-purple-500/20">
            <Zap className="w-8 h-8 text-purple-400 mb-2" />
            <h4 className="text-white font-semibold mb-1">Parallel Processing</h4>
            <p className="text-gray-400 text-sm">Process all files simultaneously</p>
          </div>
          <div className="bg-indigo-900/40 rounded-xl p-4 border border-purple-500/20">
            <CheckCircle2 className="w-8 h-8 text-green-400 mb-2" />
            <h4 className="text-white font-semibold mb-1">Individual Progress</h4>
            <p className="text-gray-400 text-sm">Track each file's status</p>
          </div>
        </div>

        <div className="bg-indigo-900/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-purple-500/20">
          <div className="flex justify-between text-xs sm:text-sm text-gray-400 mb-2">
            <span>Processing 247 screenshots...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-indigo-950 rounded-full h-3 sm:h-4 mb-4 sm:mb-6 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm mb-4">
            <div className="bg-indigo-950/50 rounded-lg p-3">
              <div className="text-cyan-400 font-semibold">Duplicates Found</div>
              <div className="text-white text-xl sm:text-2xl">23</div>
            </div>
            <div className="bg-indigo-950/50 rounded-lg p-3">
              <div className="text-purple-400 font-semibold">Auto-Organized</div>
              <div className="text-white text-xl sm:text-2xl">224</div>
            </div>
          </div>
          <button 
            onClick={startDemo}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold py-2.5 sm:py-3 rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 text-sm sm:text-base"
          >
            {isProcessing ? 'Processing...' : 'Start Demo'}
          </button>
        </div>
      </div>
    </div>
  );
}

