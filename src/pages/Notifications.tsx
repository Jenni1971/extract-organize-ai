import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

export default function Notifications() {
  const [settings, setSettings] = useState({
    email: true,
    push: false,
    importComplete: true,
    duplicatesFound: true,
    exportReady: true,
    cloudSyncError: true,
    weeklyDigest: false
  });

  const toggle = (key: string) => {
    setSettings({ ...settings, [key]: !settings[key as keyof typeof settings] });
  };

  const handleSave = () => {
    alert('Notification preferences saved!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Notifications</h1>

        <Card className="p-6 mb-4">
          <h3 className="font-semibold mb-4">Notification Channels</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Email notifications</span>
              <Switch checked={settings.email} onCheckedChange={() => toggle('email')} />
            </div>
            <div className="flex items-center justify-between">
              <span>Push notifications</span>
              <Switch checked={settings.push} onCheckedChange={() => toggle('push')} />
            </div>
          </div>
        </Card>

        <Card className="p-6 mb-4">
          <h3 className="font-semibold mb-4">Event Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Import completed</span>
              <Switch checked={settings.importComplete} onCheckedChange={() => toggle('importComplete')} />
            </div>
            <div className="flex items-center justify-between">
              <span>Duplicates found</span>
              <Switch checked={settings.duplicatesFound} onCheckedChange={() => toggle('duplicatesFound')} />
            </div>
            <div className="flex items-center justify-between">
              <span>Export ready</span>
              <Switch checked={settings.exportReady} onCheckedChange={() => toggle('exportReady')} />
            </div>
            <div className="flex items-center justify-between">
              <span>Cloud sync errors</span>
              <Switch checked={settings.cloudSyncError} onCheckedChange={() => toggle('cloudSyncError')} />
            </div>
            <div className="flex items-center justify-between">
              <span>Weekly digest</span>
              <Switch checked={settings.weeklyDigest} onCheckedChange={() => toggle('weeklyDigest')} />
            </div>
          </div>
        </Card>

        <Button onClick={handleSave} className="w-full">Save Preferences</Button>
      </div>
    </div>
  );
}
