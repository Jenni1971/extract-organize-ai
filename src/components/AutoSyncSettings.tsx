import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Clock, Save } from 'lucide-react';

interface AutoSyncSettingsProps {
  provider: 'google_drive' | 'dropbox';
  userId: string;
}

export function AutoSyncSettings({ provider, userId }: AutoSyncSettingsProps) {
  const { toast } = useToast();
  const [enabled, setEnabled] = useState(false);
  const [interval, setInterval] = useState('3600');
  const [conflictResolution, setConflictResolution] = useState('keep_both');
  const [syncScreenshots, setSyncScreenshots] = useState(true);
  const [syncContent, setSyncContent] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSettings();
  }, [provider]);

  const loadSettings = async () => {
    const { data } = await supabase
      .from('cloud_sync_settings')
      .select('*')
      .eq('user_id', userId)
      .eq('provider', provider)
      .single();

    if (data) {
      setEnabled(data.enabled);
      setInterval(data.sync_interval.toString());
      setConflictResolution(data.conflict_resolution);
      setSyncScreenshots(data.auto_sync_screenshots);
      setSyncContent(data.auto_sync_content);
    }
  };

  const saveSettings = async () => {
    setLoading(true);
    const { error } = await supabase
      .from('cloud_sync_settings')
      .upsert({
        user_id: userId,
        provider,
        enabled,
        sync_interval: parseInt(interval),
        conflict_resolution: conflictResolution,
        auto_sync_screenshots: syncScreenshots,
        auto_sync_content: syncContent,
        updated_at: new Date().toISOString()
      });

    setLoading(false);
    if (error) {
      toast({ title: 'Error', description: 'Failed to save settings', variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Auto-sync settings saved' });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Auto-Sync Settings
        </CardTitle>
        <CardDescription>Configure automatic backup to {provider === 'google_drive' ? 'Google Drive' : 'Dropbox'}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Enable Auto-Sync</Label>
          <Switch checked={enabled} onCheckedChange={setEnabled} />
        </div>

        <div className="space-y-2">
          <Label>Sync Interval</Label>
          <Select value={interval} onValueChange={setInterval}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1800">Every 30 minutes</SelectItem>
              <SelectItem value="3600">Every hour</SelectItem>
              <SelectItem value="10800">Every 3 hours</SelectItem>
              <SelectItem value="21600">Every 6 hours</SelectItem>
              <SelectItem value="86400">Daily</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Conflict Resolution</Label>
          <Select value={conflictResolution} onValueChange={setConflictResolution}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="keep_both">Keep both versions</SelectItem>
              <SelectItem value="cloud_wins">Cloud version wins</SelectItem>
              <SelectItem value="local_wins">Local version wins</SelectItem>
              <SelectItem value="newest_wins">Newest version wins</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <Label>Sync Screenshots</Label>
          <Switch checked={syncScreenshots} onCheckedChange={setSyncScreenshots} />
        </div>

        <div className="flex items-center justify-between">
          <Label>Sync Extracted Content</Label>
          <Switch checked={syncContent} onCheckedChange={setSyncContent} />
        </div>

        <Button onClick={saveSettings} disabled={loading} className="w-full">
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </CardContent>
    </Card>
  );
}
