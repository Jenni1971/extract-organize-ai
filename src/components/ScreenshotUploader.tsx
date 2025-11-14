
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function ScreenshotUploader({ onUploadComplete }: { onUploadComplete: () => void }) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const processFile = async (file: File) => {
    if (!file) return;
    setUploading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('You must be logged in to upload.');
        setUploading(false);
        return;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('screenshots')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: insertError } = await supabase
        .from('screenshots')
        .insert({
          user_id: user.id,
          image_url: filePath,
          title: file.name
        });

      if (insertError) throw insertError;

      toast.success(`"${file.name}" uploaded and is being categorized!`);

      setTimeout(() => {
        onUploadComplete();
      }, 1500);

    } catch (error: any) {
      console.error("Upload process failed:", error);
      toast.error(error.message || 'Failed to upload screenshot.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="p-6">
      <div
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
          }
        }}
      >
        {uploading ? (
          <div>
            <Loader2 className="w-12 h-12 mx-auto animate-spin text-blue-600" />
            <p className="mt-4 text-sm text-gray-600">Uploading and processing...</p>
          </div>
        ) : (
          <>
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="mb-2 font-medium">Drag and drop any image here</p>
            <p className="text-xs text-gray-500 mb-4">
              It will be automatically categorized into the correct book.
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  processFile(e.target.files[0]);
                }
              }}
              className="hidden"
              id="file-upload"
            />
            <Button asChild variant="outline">
              <label htmlFor="file-upload" className="cursor-pointer">Select File</label>
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}

