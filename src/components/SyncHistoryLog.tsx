import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/lib/supabase';
import { History, CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';

interface SyncHistoryLogProps {
  provider: 'google_drive' | 'dropbox';
  userId: string;
}

export function SyncHistoryLog({ provider, userId }: SyncHistoryLogProps) {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    loadHistory();
    const subscription = supabase
      .channel('sync_history')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'cloud_sync_history',
        filter: `user_id=eq.${userId}`
      }, loadHistory)
      .subscribe();

    return () => { subscription.unsubscribe(); };
  }, [provider, userId]);

  const loadHistory = async () => {
    const { data } = await supabase
      .from('cloud_sync_history')
      .select('*')
      .eq('user_id', userId)
      .eq('provider', provider)
      .order('created_at', { ascending: false })
      .limit(20);

    if (data) setHistory(data);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'partial': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: any = {
      success: 'default',
      partial: 'secondary',
      failed: 'destructive'
    };
    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Sync History
        </CardTitle>
        <CardDescription>Recent backup operations</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {history.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No sync history yet</p>
            ) : (
              history.map((item) => (
                <div key={item.id} className="border rounded-lg p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.status)}
                      <span className="text-sm font-medium">
                        {new Date(item.created_at).toLocaleString()}
                      </span>
                    </div>
                    {getStatusBadge(item.status)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Type: {item.sync_type}</span>
                    <span>Synced: {item.files_synced}</span>
                    {item.files_failed > 0 && <span className="text-red-500">Failed: {item.files_failed}</span>}
                    {item.sync_duration && <span>Duration: {(item.sync_duration / 1000).toFixed(1)}s</span>}
                  </div>
                  {item.error_message && (
                    <p className="text-xs text-red-500 mt-1">{item.error_message}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
