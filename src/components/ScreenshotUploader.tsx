import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, Loader2, FolderCheck } from 'lucide-react';
import { toast } from 'sonner';

export function ScreenshotUploader({ onUploadComplete }: { onUploadComplete: () => void }) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [assignedFolder, setAssignedFolder] = useState<string | null>(null);

  const processFile = async (file: File) => {
    setUploading(true);
    setAssignedFolder(null);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Upload to storage
     const fileExt = file.name.split('.').pop();
const fileName = `${Date.now()}.${fileExt}`;

console.log('User:', user);
console.log('User ID:', user?.id);
console.log('Uploading to:', `${user.id}/${fileName}`);

const { error: uploadError } = await supabase.storage
  .from('screenshots')
  .upload(`${user.id}/${fileName}`, file, { upsert: true });

if (uploadError) {
  console.error('Upload error:', uploadError);
  throw uploadError;
}

      // Create screenshot record
      const { data: screenshot, error: insertError } = await supabase
        .from('screenshots')
        .insert({
          user_id: user.id,
          file_path: `${user.id}/${fileName}`,
          title: file.name
        })
        .select()
        .single();


      if (insertError) throw insertError;

      // Extract content and auto-categorize
      const { data: extractData, error: extractError } = await supabase.functions.invoke('extract-screenshot', {
        body: { 
          screenshotId: screenshot.id,
          extractionType: 'text',
          language: 'auto',
          ocrQuality: 'standard'
        }
      });

      if (extractError) throw extractError;

      // Show success with folder assignment
      const category = extractData.category || 'Uncategorized';
      setAssignedFolder(category);
      toast.success(`Screenshot saved to "${category}" folder!`);
      
      setTimeout(() => {
        setAssignedFolder(null);
        onUploadComplete();
      }, 3000);

    } catch (error: any) {
      toast.error(error.message || 'Failed to upload screenshot');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {assignedFolder && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <FolderCheck className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium text-green-900">Auto-categorized!</p>
              <p className="text-sm text-green-700">Saved to "{assignedFolder}" folder</p>
            </div>
          </div>
        )}

        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
            dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            if (e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0]);
          }}
        >
          {uploading ? (
            <div>
              <Loader2 className="w-12 h-12 mx-auto animate-spin text-blue-600" />
              <p className="mt-4 text-sm text-gray-600">Processing screenshot...</p>
              <p className="text-xs text-gray-500 mt-2">AI is detecting the category</p>
            </div>
          ) : (
            <>
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="mb-2 font-medium">Drag and drop screenshot here</p>
              <p className="text-xs text-gray-500 mb-4">
                AI will automatically detect the topic and create/assign to a folder
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])}
                className="hidden"
                id="file-upload"
              />
              <Button asChild variant="outline">
                <label htmlFor="file-upload" className="cursor-pointer">Select File</label>
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
