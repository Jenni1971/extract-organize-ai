import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

export default function Export() {
  const [format, setFormat] = useState('pdf');
  const [includeImages, setIncludeImages] = useState(true);

  const handleExport = () => {
    alert(`Exporting as ${format.toUpperCase()}...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Export Center</h1>

        <Card className="p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Export Format</label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="markdown">Markdown</SelectItem>
                  <SelectItem value="json">JSON Data</SelectItem>
                  <SelectItem value="csv">CSV Spreadsheet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium">Options</label>
              <div className="flex items-center gap-2">
                <Checkbox checked={includeImages} onCheckedChange={(c) => setIncludeImages(c as boolean)} />
                <span>Include original images</span>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Export Templates</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">Receipt Template</Button>
                <Button variant="outline" size="sm">Invoice Template</Button>
                <Button variant="outline" size="sm">Business Card</Button>
                <Button variant="outline" size="sm">Custom Template</Button>
              </div>
            </div>

            <Button onClick={handleExport} size="lg" className="w-full">
              Export Now
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
