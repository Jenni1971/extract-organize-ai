import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

export default function CloudSync() {
  const [connections, setConnections] = useState([
    { id: 'gdrive', name: 'Google Drive', connected: true, autoSync: true },
    { id: 'dropbox', name: 'Dropbox', connected: false, autoSync: false },
    { id: 'onedrive', name: 'OneDrive', connected: false, autoSync: false }
  ]);

  const toggleConnection = (id: string) => {
    setConnections(connections.map(c => 
      c.id === id ? { ...c, connected: !c.connected } : c
    ));
  };

  const toggleAutoSync = (id: string) => {
    setConnections(connections.map(c => 
      c.id === id ? { ...c, autoSync: !c.autoSync } : c
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Cloud Sync</h1>

        <div className="space-y-4">
          {connections.map(conn => (
            <Card key={conn.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-semibold">{conn.name}</h3>
                  <Badge variant={conn.connected ? 'default' : 'secondary'}>
                    {conn.connected ? 'Connected' : 'Not Connected'}
                  </Badge>
                </div>
                <Button onClick={() => toggleConnection(conn.id)} variant={conn.connected ? 'destructive' : 'default'}>
                  {conn.connected ? 'Disconnect' : 'Connect'}
                </Button>
              </div>

              {conn.connected && (
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm">Auto-sync enabled</span>
                  <Switch checked={conn.autoSync} onCheckedChange={() => toggleAutoSync(conn.id)} />
                </div>
              )}
            </Card>
          ))}
        </div>

        <Card className="p-6 mt-6">
          <h3 className="font-semibold mb-4">Sync Settings</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Sync frequency</span>
              <span className="text-sm text-gray-600">Every 1 hour</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Last sync</span>
              <span className="text-sm text-gray-600">5 minutes ago</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
