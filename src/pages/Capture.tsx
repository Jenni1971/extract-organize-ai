import React, { useState } from 'react';
import { AppProvider } from '@/contexts/AppContext';
import AppBar from '@/components/AppBar';
import { Button } from '@/components/ui/button';
import { Upload, Camera, Link as LinkIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Capture: React.FC = () => {
  const navigate = useNavigate();
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    navigate('/processing');
  };

  return (
    <AppProvider>
      <div className="min-h-screen bg-[#0F1020]">
        <AppBar />
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">Capture Content</h1>

          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-12 text-center transition ${
              dragActive ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600'
            }`}
          >
            <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Drop files here</h3>
            <p className="text-gray-400 mb-6">or choose a method below</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <Button onClick={() => navigate('/processing')} className="h-24 flex-col">
                <Upload className="w-8 h-8 mb-2" />
                Upload Image
              </Button>
              <Button onClick={() => navigate('/processing')} className="h-24 flex-col">
                <Camera className="w-8 h-8 mb-2" />
                Take Photo
              </Button>
              <Button onClick={() => navigate('/processing')} className="h-24 flex-col">
                <LinkIcon className="w-8 h-8 mb-2" />
                From URL
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppProvider>
  );
};

export default Capture;
