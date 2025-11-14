import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Upload, X, CheckCircle, AlertCircle, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AdvancedExtractionOptions } from './AdvancedExtractionOptions';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

type FileStatus = {
  file: File;
  id: string;
  extractionType: string;
  customPrompt: string;
  language: string;
  ocrQuality: string;
  status: 'pending' | 'uploading' | 'processing' | 'success' | 'error';
  progress: number;
  error?: string;
};

export function BatchUploader({ onComplete }: { onComplete: () => void }) {
  const [files, setFiles] = useState<FileStatus[]>([]);
  const [globalType, setGlobalType] = useState('general');
  const [globalPrompt, setGlobalPrompt] = useState('');
  const [globalLanguage, setGlobalLanguage] = useState('en');
  const [globalQuality, setGlobalQuality] = useState('standard');
  const [useGlobalSettings, setUseGlobalSettings] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  const addFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    const fileArray = Array.from(newFiles).map(file => ({
      file,
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      extractionType: globalType,
      customPrompt: globalPrompt,
      language: globalLanguage,
      ocrQuality: globalQuality,
      status: 'pending' as const,
      progress: 0
    }));
    setFiles(prev => [...prev, ...fileArray]);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const processFile = async (fileStatus: FileStatus) => {
    try {
      setFiles(prev => prev.map(f => 
        f.id === fileStatus.id ? { ...f, status: 'uploading' as const, progress: 25 } : f
      ));

      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error('Not authenticated');

      const fileExt = fileStatus.file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}-${Math.random()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('Screenshots')
        .upload(fileName, fileStatus.file);

      if (uploadError) throw uploadError;

      setFiles(prev => prev.map(f => 
        f.id === fileStatus.id ? { ...f, status: 'processing' as const, progress: 50 } : f
      ));

      const { data: { publicUrl } } = supabase.storage
        .from('Screenshots')
        .getPublicUrl(fileName);

      const { data, error: fnError } = await supabase.functions.invoke('extract-screenshot', {
        body: { 
          imageUrl: publicUrl, 
          extractionType: fileStatus.extractionType,
          customPrompt: fileStatus.customPrompt || undefined,
          language: fileStatus.language,
          ocrQuality: fileStatus.ocrQuality
        }
      });

      if (fnError) throw fnError;

      setFiles(prev => prev.map(f => 
        f.id === fileStatus.id ? { ...f, progress: 75 } : f
      ));

      await supabase.from('Screenshots').insert({
        user_id: user.id,
        image_url: publicUrl,
        extraction_type: fileStatus.extractionType,
        extracted_data: data.data,
        custom_prompt: fileStatus.customPrompt || null,
        language: fileStatus.language,
        ocr_quality: fileStatus.ocrQuality
      });

      setFiles(prev => prev.map(f => 
        f.id === fileStatus.id ? { ...f, status: 'success' as const, progress: 100 } : f
      ));
    } catch (error: any) {
      setFiles(prev => prev.map(f => 
        f.id === fileStatus.id ? { ...f, status: 'error' as const, error: error.message } : f
      ));
    }
  };

  const processAll = async () => {
    setProcessing(true);
    await Promise.all(files.filter(f => f.status === 'pending').map(processFile));
    setProcessing(false);
    toast({ title: 'Batch Complete', description: 'All files processed' });
    onComplete();
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full">
              <Settings className="w-4 h-4 mr-2" />
              {showAdvanced ? 'Hide' : 'Show'} Advanced Options
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={useGlobalSettings}
                onChange={(e) => setUseGlobalSettings(e.target.checked)}
                className="w-4 h-4"
              />
              <span>Use same settings for all files</span>
            </label>
            {useGlobalSettings && (
              <AdvancedExtractionOptions
                extractionType={globalType}
                setExtractionType={(val) => {
                  setGlobalType(val);
                  setFiles(prev => prev.map(f => ({ ...f, extractionType: val })));
                }}
                customPrompt={globalPrompt}
                setCustomPrompt={(val) => {
                  setGlobalPrompt(val);
                  setFiles(prev => prev.map(f => ({ ...f, customPrompt: val })));
                }}
                language={globalLanguage}
                setLanguage={(val) => {
                  setGlobalLanguage(val);
                  setFiles(prev => prev.map(f => ({ ...f, language: val })));
                }}
                ocrQuality={globalQuality}
                setOcrQuality={(val) => {
                  setGlobalQuality(val);
                  setFiles(prev => prev.map(f => ({ ...f, ocrQuality: val })));
                }}
              />
            )}
          </CollapsibleContent>
        </Collapsible>

        <div
          className="border-2 border-dashed rounded-lg p-8 text-center"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            addFiles(e.dataTransfer.files);
          }}
        >
          <Upload className="w-10 h-10 mx-auto mb-3 text-gray-400" />
          <p className="mb-2">Drag multiple screenshots here</p>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => addFiles(e.target.files)}
            className="hidden"
            id="batch-upload"
          />
          <Button asChild variant="outline">
            <label htmlFor="batch-upload" className="cursor-pointer">Select Files</label>
          </Button>
        </div>

        {files.length > 0 && (
          <div className="space-y-3">
            {files.map(f => (
              <Card key={f.id} className="p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{f.file.name}</p>
                    {f.status !== 'pending' && (
                      <Progress value={f.progress} className="mt-2" />
                    )}
                    {f.error && <p className="text-sm text-red-600 mt-1">{f.error}</p>}
                  </div>
                  {f.status === 'success' && <CheckCircle className="w-5 h-5 text-green-600" />}
                  {f.status === 'error' && <AlertCircle className="w-5 h-5 text-red-600" />}
                  {f.status === 'pending' && (
                    <Button size="sm" variant="ghost" onClick={() => removeFile(f.id)}>
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </Card>
            ))}
            <Button 
              onClick={processAll} 
              disabled={processing || files.every(f => f.status !== 'pending')}
              className="w-full"
            >
              Process All ({files.filter(f => f.status === 'pending').length} files)
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
