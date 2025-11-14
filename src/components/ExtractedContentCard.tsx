import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2, ExternalLink } from 'lucide-react';
import { ReprocessDialog } from './ReprocessDialog';

interface ExtractedContentCardProps {
  item: {
    id: string;
    image_url: string;
    extraction_type: string;
    extracted_data: any;
    custom_prompt?: string;
    language?: string;
    ocr_quality?: string;
    created_at: string;
  };
  onDelete: (id: string) => void;
  onReprocess?: () => void;
}

export function ExtractedContentCard({ item, onDelete, onReprocess }: ExtractedContentCardProps) {
  const data = item.extracted_data || {};
  const title = data.title || 'Extracted Content';

  const renderContent = () => {
    if (item.extraction_type === 'recipe') {
      return (
        <div className="space-y-2">
          <p className="text-sm"><strong>Prep:</strong> {data.prepTime}</p>
          <p className="text-sm"><strong>Cook:</strong> {data.cookTime}</p>
          <p className="text-sm"><strong>Servings:</strong> {data.servings}</p>
          <div className="text-sm">
            <strong>Ingredients:</strong>
            <ul className="list-disc list-inside">
              {data.ingredients?.slice(0, 3).map((ing: string, i: number) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
    
    if (data.keyPoints) {
      return (
        <ul className="list-disc list-inside text-sm space-y-1">
          {data.keyPoints.slice(0, 3).map((point: string, i: number) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      );
    }
    
    return <p className="text-sm line-clamp-3">{data.content || data.summary}</p>;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={item.image_url} 
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold line-clamp-1">{title}</h3>
          <Badge variant="secondary">{item.extraction_type}</Badge>
        </div>
        {renderContent()}
        <div className="flex gap-2 pt-2">
          <Button size="sm" variant="outline" asChild>
            <a href={item.image_url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-1" />
              View
            </a>
          </Button>
          <ReprocessDialog 
            screenshot={item} 
            onComplete={onReprocess || (() => {})} 
          />
          <Button size="sm" variant="destructive" onClick={() => onDelete(item.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
