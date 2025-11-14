import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { ScreenshotUploader } from './ScreenshotUploader';

interface UploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUploadComplete: () => void;
}

export default function UploadModal({ open, onOpenChange, onUploadComplete }: UploadModalProps) {
  const handleComplete = () => {
    onUploadComplete();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload Screenshot</DialogTitle>
          <p className="text-sm text-gray-500">
            AI will automatically detect the topic and organize it into the right folder
          </p>
        </DialogHeader>
        <ScreenshotUploader onUploadComplete={handleComplete} />
      </DialogContent>
    </Dialog>
  );
}
