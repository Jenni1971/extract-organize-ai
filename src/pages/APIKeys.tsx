import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function APIKeys() {
  const [keys, setKeys] = useState([
    { id: '1', name: 'Production API', key: 'sk_live_abc123...', created: '2024-01-15', status: 'active' },
    { id: '2', name: 'Development', key: 'sk_test_xyz789...', created: '2024-01-10', status: 'active' }
  ]);
  const [newKeyName, setNewKeyName] = useState('');

  const handleGenerate = () => {
    if (newKeyName.trim()) {
      const newKey = {
        id: Date.now().toString(),
        name: newKeyName,
        key: `sk_${Math.random().toString(36).substr(2, 9)}...`,
        created: new Date().toISOString().split('T')[0],
        status: 'active'
      };
      setKeys([...keys, newKey]);
      setNewKeyName('');
    }
  };

  const handleRevoke = (id: string) => {
    setKeys(keys.filter(k => k.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">API Keys</h1>

        <Card className="p-6 mb-6">
          <h3 className="font-semibold mb-4">Generate New API Key</h3>
          <div className="flex gap-2">
            <Input placeholder="Key name" value={newKeyName} onChange={(e) => setNewKeyName(e.target.value)} />
            <Button onClick={handleGenerate}>Generate</Button>
          </div>
        </Card>

        <div className="space-y-4">
          {keys.map(key => (
            <Card key={key.id} className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">{key.name}</h3>
                <Badge>{key.status}</Badge>
              </div>
              <p className="text-sm font-mono bg-gray-100 p-2 rounded mb-3">{key.key}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Created: {key.created}</span>
                <Button variant="destructive" size="sm" onClick={() => handleRevoke(key.id)}>Revoke</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
