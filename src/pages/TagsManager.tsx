import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function TagsManager() {
  const [tags, setTags] = useState([
    { id: '1', name: 'Tax', count: 45, color: 'bg-blue-500' },
    { id: '2', name: 'Business', count: 128, color: 'bg-green-500' },
    { id: '3', name: 'Medical', count: 23, color: 'bg-red-500' },
    { id: '4', name: 'Travel', count: 67, color: 'bg-purple-500' }
  ]);
  const [newTag, setNewTag] = useState('');

  const handleCreate = () => {
    if (newTag.trim()) {
      setTags([...tags, { id: Date.now().toString(), name: newTag, count: 0, color: 'bg-gray-500' }]);
      setNewTag('');
    }
  };

  const handleDelete = (id: string) => {
    setTags(tags.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Tags Manager</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Create Tag</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Tag</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Tag name" value={newTag} onChange={(e) => setNewTag(e.target.value)} />
                <Button onClick={handleCreate} className="w-full">Create</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tags.map(tag => (
            <Card key={tag.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Badge className={tag.color}>{tag.name}</Badge>
                <span className="text-sm text-gray-500">{tag.count} items</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(tag.id)}>Delete</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
