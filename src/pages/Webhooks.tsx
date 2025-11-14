import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

export default function Webhooks() {
  const [webhooks, setWebhooks] = useState([
    { id: '1', url: 'https://api.example.com/webhook', events: ['extraction.complete'], status: 'active' }
  ]);
  const [newUrl, setNewUrl] = useState('');

  const handleCreate = () => {
    if (newUrl.trim()) {
      setWebhooks([...webhooks, { id: Date.now().toString(), url: newUrl, events: [], status: 'active' }]);
      setNewUrl('');
    }
  };

  const handleDelete = (id: string) => {
    setWebhooks(webhooks.filter(w => w.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Webhooks</h1>

        <Card className="p-6 mb-6">
          <h3 className="font-semibold mb-4">Create Webhook</h3>
          <div className="space-y-4">
            <Input placeholder="Webhook URL" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} />
            <div className="space-y-2">
              <p className="text-sm font-medium">Events</p>
              <div className="flex items-center gap-2">
                <Checkbox />
                <span className="text-sm">extraction.complete</span>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox />
                <span className="text-sm">import.complete</span>
              </div>
            </div>
            <Button onClick={handleCreate} className="w-full">Create Webhook</Button>
          </div>
        </Card>

        <div className="space-y-4">
          {webhooks.map(webhook => (
            <Card key={webhook.id} className="p-6">
              <div className="flex items-center justify-between mb-3">
                <Badge>{webhook.status}</Badge>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(webhook.id)}>Delete</Button>
              </div>
              <p className="text-sm font-mono bg-gray-100 p-2 rounded mb-2">{webhook.url}</p>
              <p className="text-sm text-gray-600">Events: {webhook.events.join(', ')}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
