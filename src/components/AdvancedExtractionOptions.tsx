import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface AdvancedExtractionOptionsProps {
  extractionType: string;
  setExtractionType: (type: string) => void;
  customPrompt: string;
  setCustomPrompt: (prompt: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
  ocrQuality: string;
  setOcrQuality: (quality: string) => void;
}

export function AdvancedExtractionOptions({
  extractionType,
  setExtractionType,
  customPrompt,
  setCustomPrompt,
  language,
  setLanguage,
  ocrQuality,
  setOcrQuality
}: AdvancedExtractionOptionsProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Extraction Type</Label>
        <Select value={extractionType} onValueChange={setExtractionType}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General</SelectItem>
            <SelectItem value="text">Text Extraction</SelectItem>
            <SelectItem value="recipe">Recipe</SelectItem>
            <SelectItem value="pattern">Pattern Analysis</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Language</Label>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Spanish</SelectItem>
            <SelectItem value="fr">French</SelectItem>
            <SelectItem value="de">German</SelectItem>
            <SelectItem value="zh">Chinese</SelectItem>
            <SelectItem value="ja">Japanese</SelectItem>
            <SelectItem value="ko">Korean</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>OCR Quality</Label>
        <Select value={ocrQuality} onValueChange={setOcrQuality}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fast">Fast (Lower accuracy)</SelectItem>
            <SelectItem value="standard">Standard</SelectItem>
            <SelectItem value="high">High (Best accuracy)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Custom Prompt (Optional)</Label>
        <Textarea
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          placeholder="Enter a custom extraction prompt..."
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
}
