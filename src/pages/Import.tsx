import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function Import() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFolderSelect = () => {
    setUploading(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setUploading(false);
        alert('Import completed!');
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Bulk Import</h1>

        <Card className="p-8">
          <div className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-2">Import from Folder or Gallery</h2>
              <p className="text-gray-600">Select a folder to import all images at once</p>
            </div>

            {uploading ? (
              <div className="space-y-4">
                <Progress value={progress} />
                <p className="text-sm text-gray-600">Importing... {progress}%</p>
              </div>
            ) : (
              <div className="space-y-4">
                <Button onClick={handleFolderSelect} size="lg" className="w-full">
                  Select Folder
                </Button>
                <Button variant="outline" size="lg" className="w-full">
                  Select from Gallery
                </Button>
              </div>
            )}

            <div className="text-sm text-gray-500 space-y-1">
              <p>• Supports JPG, PNG, PDF files</p>
              <p>• Auto-detection and extraction</p>
              <p>• Organize into books automatically</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
