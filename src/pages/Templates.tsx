import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Templates() {
  const [templates] = useState([
    { id: '1', name: 'Receipt', accuracy: '98%', uses: 1234, type: 'built-in' },
    { id: '2', name: 'Invoice', accuracy: '97%', uses: 890, type: 'built-in' },
    { id: '3', name: 'Business Card', accuracy: '95%', uses: 567, type: 'built-in' },
    { id: '4', name: 'Custom Form', accuracy: '92%', uses: 45, type: 'custom' }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Templates & Detection</h1>
          <Button>Create Template</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map(template => (
            <Card key={template.id} className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">{template.name}</h3>
                <Badge variant={template.type === 'built-in' ? 'default' : 'secondary'}>{template.type}</Badge>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Accuracy</span>
                  <span className="font-medium">{template.accuracy}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Uses</span>
                  <span className="font-medium">{template.uses}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                <Button variant="outline" size="sm" className="flex-1">Train</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
