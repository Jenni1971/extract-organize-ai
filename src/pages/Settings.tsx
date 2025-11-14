import React from 'react';
import { AppProvider } from '@/contexts/AppContext';
import AppBar from '@/components/AppBar';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Settings: React.FC = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-[#0F1020]">
        <AppBar />
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Extraction Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-organize" className="text-white">Auto-organize content</Label>
                  <Switch id="auto-organize" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="delete-originals" className="text-white">Delete original images</Label>
                  <Switch id="delete-originals" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="background" className="text-white">Background processing</Label>
                  <Switch id="background" defaultChecked />
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Notifications</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notif" className="text-white">Email notifications</Label>
                  <Switch id="email-notif" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-notif" className="text-white">Push notifications</Label>
                  <Switch id="push-notif" />
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Export Defaults</h2>
              <div className="space-y-4">
                <div>
                  <Label className="text-white mb-2 block">Default format</Label>
                  <Select defaultValue="pdf">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="markdown">Markdown</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Button className="w-full">Save Changes</Button>
          </div>
        </div>
      </div>
    </AppProvider>
  );
};

export default Settings;
