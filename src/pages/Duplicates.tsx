import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Duplicates() {
  const [selected, setSelected] = useState<string[]>([]);
  const [exactDupes] = useState([
    { id: '1', name: 'Receipt_001.jpg', date: '2024-01-15', size: '2.3 MB' },
    { id: '2', name: 'Receipt_001 copy.jpg', date: '2024-01-15', size: '2.3 MB' }
  ]);
  const [nearDupes] = useState([
    { id: '3', name: 'Invoice_A.jpg', date: '2024-01-10', similarity: '95%' },
    { id: '4', name: 'Invoice_A_edited.jpg', date: '2024-01-11', similarity: '95%' }
  ]);

  const handleDelete = () => {
    alert(`Deleting ${selected.length} items`);
    setSelected([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Duplicates Cleanup</h1>
        
        <Tabs defaultValue="exact" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="exact">Exact Duplicates ({exactDupes.length})</TabsTrigger>
            <TabsTrigger value="near">Near Duplicates ({nearDupes.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="exact">
            <Card className="p-6">
              {exactDupes.map(item => (
                <div key={item.id} className="flex items-center gap-4 p-4 border-b">
                  <Checkbox onCheckedChange={(checked) => {
                    if (checked) setSelected([...selected, item.id]);
                    else setSelected(selected.filter(id => id !== item.id));
                  }} />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.date} • {item.size}</p>
                  </div>
                </div>
              ))}
            </Card>
          </TabsContent>

          <TabsContent value="near">
            <Card className="p-6">
              {nearDupes.map(item => (
                <div key={item.id} className="flex items-center gap-4 p-4 border-b">
                  <Checkbox onCheckedChange={(checked) => {
                    if (checked) setSelected([...selected, item.id]);
                    else setSelected(selected.filter(id => id !== item.id));
                  }} />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.date} • {item.similarity} similar</p>
                  </div>
                </div>
              ))}
            </Card>
          </TabsContent>
        </Tabs>

        {selected.length > 0 && (
          <div className="mt-6 flex gap-4">
            <Button onClick={handleDelete} variant="destructive">Delete Selected ({selected.length})</Button>
            <Button onClick={() => setSelected([])} variant="outline">Clear Selection</Button>
          </div>
        )}
      </div>
    </div>
  );
}
