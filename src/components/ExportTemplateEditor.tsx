import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';

interface FieldMapping {
  name: string;
  type: string;
  transformation?: string;
}

interface ExportTemplateEditorProps {
  onSave: (template: any) => void;
  onCancel: () => void;
  initialTemplate?: any;
}

export function ExportTemplateEditor({ onSave, onCancel, initialTemplate }: ExportTemplateEditorProps) {
  const [name, setName] = useState(initialTemplate?.name || '');
  const [description, setDescription] = useState(initialTemplate?.description || '');
  const [format, setFormat] = useState(initialTemplate?.format || 'json');
  const [templateType, setTemplateType] = useState(initialTemplate?.template_type || 'custom');
  const [fields, setFields] = useState<FieldMapping[]>(
    initialTemplate?.field_mappings ? Object.entries(initialTemplate.field_mappings).map(([name, type]) => ({ name, type: type as string })) : []
  );

  const addField = () => {
    setFields([...fields, { name: '', type: 'text' }]);
  };

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const updateField = (index: number, key: string, value: string) => {
    const updated = [...fields];
    updated[index] = { ...updated[index], [key]: value };
    setFields(updated);
  };

  const handleSave = () => {
    const fieldMappings = fields.reduce((acc, field) => {
      if (field.name) acc[field.name] = field.type;
      return acc;
    }, {} as Record<string, string>);

    onSave({ name, description, format, template_type: templateType, field_mappings: fieldMappings });
  };

  return (
    <Card className="p-6 space-y-4">
      <div>
        <Label>Template Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="My Export Template" />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Template description" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Format</Label>
          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="xml">XML</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Type</Label>
          <Select value={templateType} onValueChange={setTemplateType}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="invoice">Invoice</SelectItem>
              <SelectItem value="receipt">Receipt</SelectItem>
              <SelectItem value="business_card">Business Card</SelectItem>
              <SelectItem value="form">Form</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-2">
          <Label>Field Mappings</Label>
          <Button size="sm" variant="outline" onClick={addField}><Plus className="h-4 w-4 mr-1" />Add Field</Button>
        </div>
        {fields.map((field, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <Input placeholder="Field name" value={field.name} onChange={(e) => updateField(i, 'name', e.target.value)} />
            <Select value={field.type} onValueChange={(v) => updateField(i, 'type', v)}>
              <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
              </SelectContent>
            </Select>
            <Button size="icon" variant="ghost" onClick={() => removeField(i)}><X className="h-4 w-4" /></Button>
          </div>
        ))}
      </div>
      <div className="flex gap-2 justify-end">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSave}>Save Template</Button>
      </div>
    </Card>
  );
}
