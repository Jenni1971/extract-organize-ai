import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export function SyncOptimizationSettings() {
  const [settings, setSettings] = useState({
    max_upload_speed: 1000,
    compression_enabled: true,
    compression_quality: 80,
    off_peak_sync_enabled: false,
    off_peak_start_hour: 22,
    off_peak_end_hour: 6
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('cloud_sync_settings')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (data) setSettings(data);
  };

  const saveSettings = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('cloud_sync_settings')
      .upsert({ ...settings, user_id: user.id });

    if (error) {
      toast.error('Failed to save settings');
    } else {
      toast.success('Settings saved');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sync Optimization</CardTitle>
        <CardDescription>Configure bandwidth and scheduling options</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Max Upload Speed (KB/s)</Label>
          <Input
            type="number"
            value={settings.max_upload_speed}
            onChange={(e) => setSettings({ ...settings, max_upload_speed: parseInt(e.target.value) })}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label>Enable Compression</Label>
          <Switch
            checked={settings.compression_enabled}
            onCheckedChange={(checked) => setSettings({ ...settings, compression_enabled: checked })}
          />
        </div>

        {settings.compression_enabled && (
          <div className="space-y-2">
            <Label>Compression Quality (%)</Label>
            <Input
              type="number"
              min="1"
              max="100"
              value={settings.compression_quality}
              onChange={(e) => setSettings({ ...settings, compression_quality: parseInt(e.target.value) })}
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <Label>Off-Peak Sync</Label>
          <Switch
            checked={settings.off_peak_sync_enabled}
            onCheckedChange={(checked) => setSettings({ ...settings, off_peak_sync_enabled: checked })}
          />
        </div>

        {settings.off_peak_sync_enabled && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Hour</Label>
              <Input
                type="number"
                min="0"
                max="23"
                value={settings.off_peak_start_hour}
                onChange={(e) => setSettings({ ...settings, off_peak_start_hour: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label>End Hour</Label>
              <Input
                type="number"
                min="0"
                max="23"
                value={settings.off_peak_end_hour}
                onChange={(e) => setSettings({ ...settings, off_peak_end_hour: parseInt(e.target.value) })}
              />
            </div>
          </div>
        )}

        <Button onClick={saveSettings} className="w-full">Save Settings</Button>
      </CardContent>
    </Card>
  );
}
