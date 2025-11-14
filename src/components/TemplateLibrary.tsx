import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Receipt, CreditCard, FileSpreadsheet, Download } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  format: string;
  template_type: string;
  is_system: boolean;
}

interface TemplateLibraryProps {
  templates: Template[];
  onUseTemplate: (template: Template) => void;
  onDeleteTemplate?: (id: string) => void;
}

const typeIcons = {
  invoice: FileText,
  receipt: Receipt,
  business_card: CreditCard,
  form: FileSpreadsheet,
  custom: FileText,
};

export function TemplateLibrary({ templates, onUseTemplate, onDeleteTemplate }: TemplateLibraryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {templates.map((template) => {
        const Icon = typeIcons[template.template_type as keyof typeof typeIcons] || FileText;
        return (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <Icon className="h-8 w-8 text-primary mb-2" />
                <Badge variant={template.is_system ? 'secondary' : 'default'}>
                  {template.is_system ? 'System' : 'Custom'}
                </Badge>
              </div>
              <CardTitle className="text-lg">{template.name}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="outline">{template.format.toUpperCase()}</Badge>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => onUseTemplate(template)}>
                    <Download className="h-4 w-4 mr-1" />Use
                  </Button>
                  {!template.is_system && onDeleteTemplate && (
                    <Button size="sm" variant="destructive" onClick={() => onDeleteTemplate(template.id)}>
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
