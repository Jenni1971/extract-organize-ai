import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function AuditLog() {
  const [search, setSearch] = useState('');
  const logs = [
    { id: '1', action: 'User login', user: 'john@example.com', time: '2024-01-20 14:30', status: 'success' },
    { id: '2', action: 'Screenshot uploaded', user: 'john@example.com', time: '2024-01-20 14:25', status: 'success' },
    { id: '3', action: 'API key generated', user: 'john@example.com', time: '2024-01-20 14:20', status: 'success' },
    { id: '4', action: 'Export created', user: 'john@example.com', time: '2024-01-20 14:15', status: 'success' },
    { id: '5', action: 'Failed login attempt', user: 'unknown@example.com', time: '2024-01-20 14:10', status: 'failed' }
  ];

  const filtered = logs.filter(log => 
    log.action.toLowerCase().includes(search.toLowerCase()) ||
    log.user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Audit Log</h1>

        <Card className="p-4 mb-4">
          <Input placeholder="Search logs..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </Card>

        <div className="space-y-2">
          {filtered.map(log => (
            <Card key={log.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-medium">{log.action}</span>
                    <Badge variant={log.status === 'success' ? 'default' : 'destructive'}>{log.status}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{log.user} • {log.time}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
