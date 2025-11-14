import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RefreshCw, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AdvancedExtractionOptions } from './AdvancedExtractionOptions';

interface ReprocessDialogProps {
  screenshot: {
    id: string;
    image_url: string;
    extraction_type: string;
    custom_prompt?: string;
    language?: string;
    ocr_quality?: string;
  };
  onComplete: () => void;
}

export function ReprocessDialog({ screenshot, onComplete }: ReprocessDialogProps) {
  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [extractionType, setExtractionType] = useState(screenshot.extraction_type);
  const [customPrompt, setCustomPrompt] = useState(screenshot.custom_prompt || '');
  const [language, setLanguage] = useState(screenshot.language || 'en');
  const [ocrQuality, setOcrQuality] = useState(screenshot.ocr_quality || 'standard');
  const { toast } = useToast();

  const handleReprocess = async () => {
    setProcessing(true);
    try {
      const { data, error: fnError } = await supabase.functions.invoke('extract-screenshot', {
        body: { 
          imageUrl: screenshot.image_url, 
          extractionType,
          customPrompt: customPrompt || undefined,
          language,
          ocrQuality
        }
      });

      if (fnError) throw fnError;

      await supabase.from('Screenshots')
        .update({
          extraction_type: extractionType,
          extracted_data: data.data,
          custom_prompt: customPrompt || null,
          language,
          ocr_quality: ocrQuality
        })
        .eq('id', screenshot.id);


      toast({ title: 'Success!', description: 'Screenshot reprocessed successfully' });
      setOpen(false);
      onComplete();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Reprocess
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Reprocess Screenshot</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <AdvancedExtractionOptions
            extractionType={extractionType}
            setExtractionType={setExtractionType}
            customPrompt={customPrompt}
            setCustomPrompt={setCustomPrompt}
            language={language}
            setLanguage={setLanguage}
            ocrQuality={ocrQuality}
            setOcrQuality={setOcrQuality}
          />
          <Button 
            onClick={handleReprocess} 
            disabled={processing}
            className="w-full"
          >
            {processing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              'Reprocess with New Settings'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
