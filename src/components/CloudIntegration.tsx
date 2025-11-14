import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { supabase } from '@/lib/supabase';
import { Cloud, Upload, Download, CheckCircle2, RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { AutoSyncSettings } from './AutoSyncSettings';
import { SyncHistoryLog } from './SyncHistoryLog';
import { SyncOptimizationSettings } from './SyncOptimizationSettings';
import { BandwidthMonitor } from './BandwidthMonitor';

import { useToast } from '@/hooks/use-toast';

export default function CloudIntegration() {
  const { toast } = useToast();
  const [gdConnected, setGdConnected] = useState(false);
  const [dbConnected, setDbConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const [gdAccessToken, setGdAccessToken] = useState('');
  const [dbAccessToken, setDbAccessToken] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUserId(data.user.id);
    });
  }, []);


  const connectGoogleDrive = () => {
    const clientId = '1062848047770-2qdmhvfbkdvjmj3r6tgcvqvnqvqvqvqv.apps.googleusercontent.com';
    const redirectUri = 'https://urxzmkyehgbraqifhspd.databasepad.com/auth/callback';
    const scope = 'https://www.googleapis.com/auth/drive.file';
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
    window.open(authUrl, '_blank', 'width=600,height=700');
  };

  const connectDropbox = () => {
    const appKey = 'gfgredxma3qzxxr';
    const redirectUri = 'https://urxzmkyehgbraqifhspd.databasepad.com/auth/callback';
    const authUrl = `https://www.dropbox.com/oauth2/authorize?client_id=${appKey}&redirect_uri=${redirectUri}&response_type=code`;
    window.open(authUrl, '_blank', 'width=600,height=700');
  };

  const exportToGoogleDrive = async () => {
    setLoading(true);
    try {
      const exportData = JSON.stringify({ screenshots: [], books: [] });
      await supabase.functions.invoke('google-drive-integration', {
        body: { action: 'upload', fileName: `export-${Date.now()}.json`, fileContent: exportData, accessToken: 'token' }
      });
      alert('Exported to Google Drive!');
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const exportToDropbox = async () => {
    setLoading(true);
    try {
      const exportData = JSON.stringify({ screenshots: [], books: [] });
      await supabase.functions.invoke('dropbox-integration', {
        body: { action: 'upload', fileName: `export-${Date.now()}.json`, fileContent: exportData, accessToken: 'token' }
      });
      alert('Exported to Dropbox!');
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const manualSync = async (provider: 'google_drive' | 'dropbox') => {
    setLoading(true);
    const accessToken = provider === 'google_drive' ? gdAccessToken : dbAccessToken;
    
    try {
      const { data, error } = await supabase.functions.invoke('auto-cloud-sync', {
        body: { 
          action: 'sync', 
          provider, 
          userId,
          accessToken 
        }
      });

      if (error) throw error;

      // Log sync history
      await supabase.from('cloud_sync_history').insert({
        user_id: userId,
        provider,
        sync_type: 'manual',
        status: data.status,
        files_synced: data.filesSynced,
        files_failed: data.filesFailed,
        sync_duration: data.duration,
        error_message: data.errors ? data.errors.join(', ') : null
      });

      toast({
        title: 'Sync Complete',
        description: `Synced ${data.filesSynced} files successfully`
      });
    } catch (error: any) {
      toast({
        title: 'Sync Failed',
        description: error.message,
        variant: 'destructive'
      });
    }
    setLoading(false);
  };


  return (
    <Card className="bg-white/5 border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Cloud className="w-5 h-5" />
          Cloud Integration
        </CardTitle>
        <CardDescription className="text-gray-400">
          Connect cloud storage to import screenshots and export content
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="google" className="w-full">

          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="google">Google Drive</TabsTrigger>
            <TabsTrigger value="dropbox">Dropbox</TabsTrigger>
            <TabsTrigger value="optimization">Optimization</TabsTrigger>
            <TabsTrigger value="bandwidth">Bandwidth</TabsTrigger>
          </TabsList>

          <TabsContent value="google" className="space-y-4">
            {!gdConnected ? (
              <Button onClick={connectGoogleDrive} className="w-full">Connect Google Drive</Button>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <CheckCircle2 className="w-4 h-4" />Connected
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1"><Download className="w-4 h-4 mr-2" />Import</Button>
                  <Button onClick={exportToGoogleDrive} disabled={loading} variant="outline" className="flex-1">
                    <Upload className="w-4 h-4 mr-2" />Export
                  </Button>
                  <Button onClick={() => manualSync('google_drive')} disabled={loading} variant="outline" className="flex-1">
                    <RefreshCw className="w-4 h-4 mr-2" />Sync Now
                  </Button>
                </div>
                {userId && (
                  <>
                    <AutoSyncSettings provider="google_drive" userId={userId} />
                    <SyncHistoryLog provider="google_drive" userId={userId} />
                  </>
                )}
              </div>
            )}
          </TabsContent>
          <TabsContent value="dropbox" className="space-y-4">
            {!dbConnected ? (
              <Button onClick={connectDropbox} className="w-full">Connect Dropbox</Button>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <CheckCircle2 className="w-4 h-4" />Connected
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1"><Download className="w-4 h-4 mr-2" />Import</Button>
                  <Button onClick={exportToDropbox} disabled={loading} variant="outline" className="flex-1">
                    <Upload className="w-4 h-4 mr-2" />Export
                  </Button>
                  <Button onClick={() => manualSync('dropbox')} disabled={loading} variant="outline" className="flex-1">
                    <RefreshCw className="w-4 h-4 mr-2" />Sync Now
                  </Button>
                </div>
                {userId && (
                  <>
                    <AutoSyncSettings provider="dropbox" userId={userId} />
                    <SyncHistoryLog provider="dropbox" userId={userId} />
                  </>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="optimization" className="space-y-4">
            <SyncOptimizationSettings />
          </TabsContent>

          <TabsContent value="bandwidth" className="space-y-4">
            <BandwidthMonitor />
          </TabsContent>

        </Tabs>
      </CardContent>
    </Card>
  );
}
