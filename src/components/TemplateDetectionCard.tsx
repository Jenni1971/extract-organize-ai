import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, AlertCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TemplateDetectionCardProps {
  detectedTemplate: string;
  confidence: number;
  onConfirm: (template: string) => void;
  onCorrect: (correctedTemplate: string) => void;
}

const TEMPLATE_TYPES = [
  { value: 'invoice', label: 'Invoice' },
  { value: 'receipt', label: 'Receipt' },
  { value: 'business_card', label: 'Business Card' },
  { value: 'form', label: 'Form' },
  { value: 'table', label: 'Table' },
  { value: 'handwriting', label: 'Handwriting' },
  { value: 'general', label: 'General Text' }
];

export function TemplateDetectionCard({ 
  detectedTemplate, 
  confidence, 
  onConfirm, 
  onCorrect 
}: TemplateDetectionCardProps) {
  const [correcting, setCorrecting] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(detectedTemplate);

  const confidenceColor = confidence >= 0.8 ? 'bg-green-500' : confidence >= 0.6 ? 'bg-yellow-500' : 'bg-orange-500';
  const templateLabel = TEMPLATE_TYPES.find(t => t.value === detectedTemplate)?.label || detectedTemplate;

  return (
    <Card className="p-4 border-blue-200 bg-blue-50">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-blue-900">Template Detected</span>
          </div>
          
          {!correcting ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-sm">
                  {templateLabel}
                </Badge>
                <Badge className={`${confidenceColor} text-white text-xs`}>
                  {(confidence * 100).toFixed(0)}% confident
                </Badge>
              </div>
              <p className="text-sm text-gray-600">
                Is this correct? This helps improve future detection.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TEMPLATE_TYPES.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {!correcting ? (
            <>
              <Button size="sm" onClick={() => onConfirm(detectedTemplate)} className="gap-1">
                <Check className="w-4 h-4" />
                Correct
              </Button>
              <Button size="sm" variant="outline" onClick={() => setCorrecting(true)} className="gap-1">
                <X className="w-4 h-4" />
                Wrong
              </Button>
            </>
          ) : (
            <>
              <Button size="sm" onClick={() => {
                onCorrect(selectedTemplate);
                setCorrecting(false);
              }}>
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={() => setCorrecting(false)}>
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
